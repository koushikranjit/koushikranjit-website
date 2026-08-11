import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { readStore, writeStore } from '../../utils/db.js';
import { buildPriceEmbed } from '../../utils/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('price')
    .setDescription('View or update the current P2P buy/sell price')
    .addSubcommand((sub) =>
      sub
        .setName('set')
        .setDescription('Update the current buy/sell price and post it (admin only)')
        .addNumberOption((o) => o.setName('buy').setDescription('Buy price').setRequired(true))
        .addNumberOption((o) => o.setName('sell').setDescription('Sell price').setRequired(true))
        .addBooleanOption((o) => o.setName('announce').setDescription('Post the update to the price channel (default: true)')),
    )
    .addSubcommand((sub) => sub.setName('show').setDescription('Show the current buy/sell price')),
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const store = readStore();

    if (sub === 'set') {
      if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
        return interaction.reply({ content: "You don't have permission to update the price.", ephemeral: true });
      }

      const buy = interaction.options.getNumber('buy');
      const sell = interaction.options.getNumber('sell');
      const announce = interaction.options.getBoolean('announce') ?? true;

      store.price = { buy, sell, updatedAt: new Date().toISOString(), updatedBy: interaction.user.id };
      writeStore(store);

      const embed = buildPriceEmbed(store.price, interaction.guild);
      await interaction.reply({ embeds: [embed] });

      const priceChannelId = process.env.PRICE_CHANNEL_ID;
      if (announce && priceChannelId && priceChannelId !== interaction.channelId) {
        const channel = await interaction.guild.channels.fetch(priceChannelId).catch(() => null);
        if (channel) {
          const pingEveryone = process.env.PING_EVERYONE_ON_PRICE_UPDATE === 'true';
          await channel.send({ content: pingEveryone ? '@everyone' : undefined, embeds: [embed] }).catch(() => {});
        }
      }
      return;
    }

    if (!store.price.buy) {
      return interaction.reply({ content: 'No price has been set yet. Use `/price set` first.', ephemeral: true });
    }
    return interaction.reply({ embeds: [buildPriceEmbed(store.price, interaction.guild)] });
  },
};
