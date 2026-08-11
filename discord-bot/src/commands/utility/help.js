import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('help').setDescription('List everything the bot can do'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x059669)
      .setTitle('Bot Commands')
      .addFields(
        { name: '💱 Price', value: '`/price show` `/price set`' },
        { name: '📢 Offers', value: '`/offer` — post a buy or sell offer' },
        { name: '🤝 Deals (staff)', value: '`/deal start` — opens a private deal room with Complete/Cancel buttons' },
        { name: '🎫 Tickets (staff)', value: '`/ticket-panel` — posts an Open Ticket button' },
        { name: '🛡️ Moderation', value: '`/kick` `/ban` `/timeout` `/warn` `/warnings` `/clear`' },
        { name: '🔧 Utility', value: '`/ping` `/userinfo` `/serverinfo` `/avatar` `/poll` `/announce`' },
      );
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
