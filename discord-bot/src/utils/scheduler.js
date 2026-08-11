/**
 * Fires `onTick` once a day at `hour`:00 in `timezone`. Checked every minute
 * rather than a cron dependency, since this is the only schedule the bot needs.
 */
export function scheduleDaily({ hour, timezone, onTick }) {
  let lastFiredDateKey = null;

  setInterval(() => {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
        .formatToParts(new Date())
        .map((p) => [p.type, p.value]),
    );

    const dateKey = `${parts.year}-${parts.month}-${parts.day}`;
    const currentHour = parseInt(parts.hour, 10);
    const currentMinute = parseInt(parts.minute, 10);

    if (currentHour === hour && currentMinute === 0 && lastFiredDateKey !== dateKey) {
      lastFiredDateKey = dateKey;
      onTick();
    }
  }, 60 * 1000);
}
