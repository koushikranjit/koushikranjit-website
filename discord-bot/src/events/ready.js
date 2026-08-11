import { ActivityType } from 'discord.js';
import { readStore } from '../utils/db.js';
import { buildPriceEmbed } from '../utils/embeds.js';
import { scheduleDaily } from '../utils/scheduler.js';

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setActivity('the P2P market', { type: ActivityType.Watching });

    const channelId = process.env.PRICE_CHANNEL_ID;
    if (!channelId) {
      console.warn('PRICE_CHANNEL_ID not set — skipping daily price scheduler.');
      return;
    }

    const hour = parseInt(process.env.DAILY_PRICE_HOUR ?? '9', 10);
    const timezone = process.env.DAILY_PRICE_TIMEZONE || 'Asia/Kolkata';
    const pingEveryone = process.env.PING_EVERYONE_ON_PRICE_UPDATE === 'true';

    scheduleDaily({
      hour,
      timezone,
      onTick: async () => {
        const store = readStore();
        if (!store.price?.buy) return;

        const channel = await client.channels.fetch(channelId).catch(() => null);
        if (!channel) return;

        await channel
          .send({ content: pingEveryone ? '@everyone' : undefined, embeds: [buildPriceEmbed(store.price, channel.guild)] })
          .catch((err) => console.error('Failed to post daily price:', err.message));
      },
    });

    console.log(`⏰ Daily price update scheduled for ${hour}:00 (${timezone})`);
  },
};
