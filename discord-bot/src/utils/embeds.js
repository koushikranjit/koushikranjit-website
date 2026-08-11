import { EmbedBuilder } from 'discord.js';

const BRAND_COLOR = 0x059669;

function brandName(guild) {
  return process.env.BRAND_NAME || guild?.name || 'P2P Terminal';
}

function currencySymbol() {
  return process.env.CURRENCY_SYMBOL ?? '₹';
}

/** Matches the "USDT Market Price Update" card style — bold BUY/SELL boxes. */
export function buildPriceEmbed(price, guild) {
  const symbol = currencySymbol();
  const label = process.env.CURRENCY_LABEL || 'USDT';
  const brand = brandName(guild);

  return new EmbedBuilder()
    .setColor(BRAND_COLOR)
    .setTitle(`📈 ${label} Market Price Update`)
    .setDescription(`**${brand}** has updated the real-time P2P exchange rates.`)
    .addFields(
      { name: '🟢 BUY PRICE', value: `\`${symbol} ${price.buy}\``, inline: true },
      { name: '🔴 SELL PRICE', value: `\`${symbol} ${price.sell}\``, inline: true },
    )
    .setFooter({
      text: `${brand} - Market Sync`,
      iconURL: guild?.iconURL({ size: 64 }) ?? undefined,
    })
    .setTimestamp(price.updatedAt ? new Date(price.updatedAt) : new Date());
}

/**
 * Matches the "Secure Trade Completed" card style for a public completed-transactions
 * log — intentionally omits buyer/seller identities, only trade type + volume.
 */
export function buildTradeCompletedEmbed({ type, volume }, guild) {
  const brand = brandName(guild);

  return new EmbedBuilder()
    .setColor(0x22c55e)
    .setTitle('✅ Secure Trade Completed')
    .setDescription(
      [
        `Another successful transaction has been processed through **${brand}**.`,
        '',
        `🏦`,
        `**Trade:** ${type}`,
        `💰 **Volume:** ${volume}`,
        '',
        '⚠️ Users are responsible for their own tax compliance.',
      ].join('\n'),
    )
    .setFooter({
      text: `${brand} • Trusted P2P Terminal`,
      iconURL: guild?.iconURL({ size: 64 }) ?? undefined,
    })
    .setTimestamp();
}
