import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField,
  PermissionFlagsBits,
} from 'discord.js';
import { readStore, writeStore } from '../utils/db.js';
import { buildTradeCompletedEmbed } from '../utils/embeds.js';

export default {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(`Error running /${interaction.commandName}:`, error);
        const payload = { content: '⚠️ Something went wrong running that command.', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(payload).catch(() => {});
        } else {
          await interaction.reply(payload).catch(() => {});
        }
      }
      return;
    }

    if (interaction.isButton()) {
      const { customId } = interaction;

      if (customId === 'ticket_open') return openTicket(interaction);
      if (customId.startsWith('ticket_close_')) return closeTicket(interaction, customId.replace('ticket_close_', ''));
      if (customId.startsWith('deal_complete_')) return completeDeal(interaction, customId.replace('deal_complete_', ''));
      if (customId.startsWith('deal_cancel_')) return cancelDeal(interaction, customId.replace('deal_cancel_', ''));
    }
  },
};

async function openTicket(interaction) {
  const store = readStore();
  const existing = Object.entries(store.tickets).find(
    ([, t]) => t.kind === 'support' && t.opener === interaction.user.id && t.status === 'open',
  );
  if (existing) {
    return interaction.reply({ content: `You already have an open ticket: <#${existing[0]}>`, ephemeral: true });
  }

  const categoryId = process.env.TICKET_CATEGORY_ID || undefined;
  const supportRoleId = process.env.SUPPORT_ROLE_ID;

  const overwrites = [
    { id: interaction.guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
    {
      id: interaction.user.id,
      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
    },
  ];
  if (supportRoleId) {
    overwrites.push({
      id: supportRoleId,
      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
    });
  }

  const channel = await interaction.guild.channels.create({
    name: `ticket-${interaction.user.username}`.slice(0, 90),
    type: ChannelType.GuildText,
    parent: categoryId,
    permissionOverwrites: overwrites,
  });

  const store2 = readStore();
  store2.tickets[channel.id] = { kind: 'support', opener: interaction.user.id, status: 'open', createdAt: new Date().toISOString() };
  writeStore(store2);

  const embed = new EmbedBuilder()
    .setColor(0x059669)
    .setTitle('🎫 Support Ticket')
    .setDescription(`${interaction.user}, describe your issue and a staff member will assist you shortly.`);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`ticket_close_${channel.id}`).setLabel('Close Ticket').setStyle(ButtonStyle.Danger).setEmoji('🔒'),
  );

  await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [row] });
  await interaction.reply({ content: `✅ Ticket created: ${channel}`, ephemeral: true });
}

async function closeTicket(interaction, channelId) {
  const store = readStore();
  const ticket = store.tickets[channelId];
  const isStaff = interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild);
  const isOpener = ticket?.opener === interaction.user.id;

  if (!isStaff && !isOpener) {
    return interaction.reply({ content: "You can't close this ticket.", ephemeral: true });
  }

  if (ticket) {
    ticket.status = 'closed';
    ticket.closedAt = new Date().toISOString();
    writeStore(store);
  }

  await interaction.reply('🔒 Closing this ticket in 5 seconds...');
  setTimeout(() => interaction.channel.delete().catch(() => {}), 5000);
}

async function completeDeal(interaction, channelId) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({ content: 'Only staff can mark a deal complete.', ephemeral: true });
  }

  const store = readStore();
  const deal = store.tickets[channelId];
  if (!deal) return interaction.reply({ content: 'Deal record not found.', ephemeral: true });

  deal.status = 'completed';
  deal.completedAt = new Date().toISOString();
  deal.completedBy = interaction.user.id;
  writeStore(store);

  // Internal confirmation inside the private deal room — shows full details.
  const internalEmbed = new EmbedBuilder()
    .setColor(0x22c55e)
    .setTitle(`✅ Deal #${deal.dealId} Completed`)
    .addFields(
      { name: 'Buyer', value: `<@${deal.buyer}>`, inline: true },
      { name: 'Seller', value: `<@${deal.seller}>`, inline: true },
      { name: 'Amount', value: deal.amount, inline: true },
      { name: 'Rate', value: deal.rate, inline: true },
      { name: 'Confirmed by', value: `${interaction.user}`, inline: true },
    )
    .setTimestamp();

  await interaction.reply({ embeds: [internalEmbed] });

  // Public log — matches the "Secure Trade Completed" card style, no identities shown.
  const logChannelId = process.env.DEAL_LOG_CHANNEL_ID;
  if (logChannelId) {
    const logChannel = await interaction.guild.channels.fetch(logChannelId).catch(() => null);
    if (logChannel) {
      const publicEmbed = buildTradeCompletedEmbed({ type: deal.type, volume: deal.amount }, interaction.guild);
      await logChannel.send({ embeds: [publicEmbed] }).catch(() => {});
    }
  }

  setTimeout(() => interaction.channel.delete().catch(() => {}), 15000);
}

async function cancelDeal(interaction, channelId) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({ content: 'Only staff can cancel a deal.', ephemeral: true });
  }

  const store = readStore();
  const deal = store.tickets[channelId];
  if (deal) {
    deal.status = 'cancelled';
    deal.cancelledAt = new Date().toISOString();
    writeStore(store);
  }

  await interaction.reply('❌ Deal cancelled. Closing this room in 5 seconds...');
  setTimeout(() => interaction.channel.delete().catch(() => {}), 5000);
}
