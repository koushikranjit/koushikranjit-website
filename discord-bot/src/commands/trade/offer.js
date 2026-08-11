import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('offer')
    .setDescription('Post a buy or sell offer')
    .addStringOption((o) =>
      o
        .setName('type')
        .setDescription('Offer type')
        .setRequired(true)
        .addChoices({ name: 'Buy', value: 'Buy' }, { name: 'Sell', value: 'Sell' }),
    )
    .addStringOption((o) => o.setName('amount').setDescription('Amount / quantity').setRequired(true))
    .addStringOption((o) => o.setName('rate').setDescription('Your rate').setRequired(true))
    .addStringOption((o) => o.setName('note').setDescription('Extra details (payment method, etc.)')),
  async execute(interaction) {
    const type = interaction.options.getString('type');
    const amount = interaction.options.getString('amount');
    const rate = interaction.options.getString('rate');
    const note = interaction.options.getString('note');

    const embed = new EmbedBuilder()
      .setColor(type === 'Buy' ? 0x22c55e : 0xef4444)
      .setTitle(`${type === 'Buy' ? '🟢 BUY' : '🔴 SELL'} Offer`)
      .addFields(
        { name: 'Amount', value: amount, inline: true },
        { name: 'Rate', value: rate, inline: true },
        { name: 'Posted by', value: `${interaction.user}`, inline: true },
      )
      .setFooter({ text: 'Staff: use /deal start to open a private deal room for this offer.' })
      .setTimestamp();

    if (note) embed.addFields({ name: 'Note', value: note });

    await interaction.reply({ embeds: [embed] });
  },
};
