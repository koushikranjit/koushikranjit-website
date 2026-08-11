import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} from 'discord.js';
import { readStore, writeStore } from '../../utils/db.js';

export default {
  data: new SlashCommandBuilder()
    .setName('deal')
    .setDescription('Open a private deal room between a buyer and seller (staff only)')
    .addSubcommand((sub) =>
      sub
        .setName('start')
        .setDescription('Open a private deal room')
        .addStringOption((o) =>
          o
            .setName('type')
            .setDescription('Trade type')
            .setRequired(true)
            .addChoices({ name: 'Buy', value: 'Buy' }, { name: 'Sell', value: 'Sell' }),
        )
        .addUserOption((o) => o.setName('buyer').setDescription('Buyer').setRequired(true))
        .addUserOption((o) => o.setName('seller').setDescription('Seller').setRequired(true))
        .addStringOption((o) => o.setName('amount').setDescription('Amount / volume').setRequired(true))
        .addStringOption((o) => o.setName('rate').setDescription('Agreed rate').setRequired(true)),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    if (sub === 'start') await startDeal(interaction);
  },
};

async function startDeal(interaction) {
  const type = interaction.options.getString('type');
  const buyer = interaction.options.getUser('buyer');
  const seller = interaction.options.getUser('seller');
  const amount = interaction.options.getString('amount');
  const rate = interaction.options.getString('rate');

  const store = readStore();
  const dealId = ++store.dealCounter;

  const categoryId = process.env.TICKET_CATEGORY_ID || undefined;
  const supportRoleId = process.env.SUPPORT_ROLE_ID;

  const overwrites = [
    { id: interaction.guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
    {
      id: buyer.id,
      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
    },
    {
      id: seller.id,
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
    name: `deal-${dealId}`,
    type: ChannelType.GuildText,
    parent: categoryId,
    permissionOverwrites: overwrites,
  });

  store.tickets[channel.id] = {
    kind: 'deal',
    dealId,
    type,
    buyer: buyer.id,
    seller: seller.id,
    amount,
    rate,
    status: 'open',
    createdAt: new Date().toISOString(),
  };
  writeStore(store);

  const embed = new EmbedBuilder()
    .setColor(0x059669)
    .setTitle(`🤝 Deal #${dealId} — ${type}`)
    .addFields(
      { name: 'Buyer', value: `${buyer}`, inline: true },
      { name: 'Seller', value: `${seller}`, inline: true },
      { name: 'Amount', value: amount, inline: true },
      { name: 'Rate', value: rate, inline: true },
    )
    .setFooter({ text: 'Only staff can mark this deal complete or cancel it.' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`deal_complete_${channel.id}`).setLabel('Mark Complete').setStyle(ButtonStyle.Success).setEmoji('✅'),
    new ButtonBuilder().setCustomId(`deal_cancel_${channel.id}`).setLabel('Cancel Deal').setStyle(ButtonStyle.Danger).setEmoji('❌'),
  );

  await channel.send({ content: `${buyer} ${seller}`, embeds: [embed], components: [row] });
  await interaction.reply({ content: `✅ Deal room created: ${channel}`, ephemeral: true });
}
