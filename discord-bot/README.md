# Koushik Ranjit — P2P Discord Bot

Custom Discord bot for the P2P trading server: daily buy/sell rate posts, staff-run deal rooms with an auto "Secure Trade Completed" log, a support ticket system, and general moderation/utility commands.

This runs as an **always-on Node process** (it holds a live gateway connection to Discord), which is different from the Next.js site in the rest of this repo — it needs its own host, not Vercel.

## 1. Create the bot in Discord

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) → **New Application**.
2. **Bot** tab → **Reset Token** → copy it → this is `DISCORD_TOKEN`. Turn on **Server Members Intent** and **Message Content Intent** here (required for welcome messages / ticket handling).
3. **OAuth2 → General** → copy **Client ID** → this is `CLIENT_ID`.
4. **OAuth2 → URL Generator** → scopes: `bot`, `applications.commands`. Permissions: Manage Roles, Manage Channels, Kick Members, Ban Members, Moderate Members, Manage Messages, Send Messages, Embed Links, Read Message History, Add Reactions. Open the generated URL and invite the bot to your server.

## 2. Configure

```
cp .env.example .env
```

Fill in `DISCORD_TOKEN`, `CLIENT_ID`, and (recommended while testing) `GUILD_ID` — with `GUILD_ID` set, slash commands register instantly to that one server instead of taking up to an hour globally.

Fill in the channel/role IDs for the features you want active (`PRICE_CHANNEL_ID`, `DEAL_LOG_CHANNEL_ID`, `WELCOME_CHANNEL_ID`, `SUPPORT_ROLE_ID`, `AUTO_ROLE_ID`, `TICKET_CATEGORY_ID`) — each feature that needs one silently skips itself if it's left blank, so you can turn things on incrementally. Set `BRAND_NAME` to match how you want the bot to sign its embeds (e.g. your server's name).

## 3. Install and run locally

```
npm install
npm run deploy-commands   # registers the / commands with Discord
npm start
```

## 4. Deploy somewhere always-on

Pick one:

- **Railway / Render** — connect this `discord-bot/` folder (or point the build at this subdirectory), it'll pick up the `Dockerfile` automatically. Add all the `.env` values as environment variables in the dashboard. **Attach a persistent volume mounted at `/app/src/data`** — that's where price/warning/ticket state (`store.json`) lives; without a volume it resets on every redeploy.
- **A VPS** — `git clone`, `npm install`, run `npm run deploy-commands` once, then run `node src/index.js` under `pm2` or a `systemd` service so it survives reboots.

Either way, run `npm run deploy-commands` again any time you add/change a slash command.

## Commands

| Command | Who | What |
|---|---|---|
| `/price show` | everyone | Shows the current buy/sell rate |
| `/price set buy sell [announce]` | Manage Server | Updates the rate, posts it (matches the "Market Price Update" card) |
| `/offer type amount rate [note]` | everyone | Posts a buy/sell offer for staff to act on |
| `/deal start type buyer seller amount rate` | Manage Server | Opens a private deal room with **Mark Complete** / **Cancel Deal** buttons |
| `/ticket-panel` | Manage Server | Posts an "Open Ticket" button in the current channel |
| `/kick` `/ban` `/timeout` `/warn` `/warnings` `/clear` | Moderation perms | Standard moderation |
| `/ping` `/userinfo` `/serverinfo` `/avatar` `/poll` `/announce` | everyone / Manage Server for `announce` | Utility |
| `/help` | everyone | Lists all commands |

## How the deal flow works

1. A member posts `/offer` (buy or sell) in a public channel.
2. Staff runs `/deal start` with the two matched users — this creates a private `#deal-N` channel visible only to the buyer, seller, and the support role.
3. Once funds/goods have changed hands, staff clicks **Mark Complete**:
   - The private deal channel gets a full-detail confirmation (buyer, seller, amount, rate), then auto-deletes after 15s.
   - If `DEAL_LOG_CHANNEL_ID` is set, a **"Secure Trade Completed"** card (trade type + volume only — no names, matching a public trade-proof log) is posted there.
4. **Cancel Deal** closes the room without logging a completion.

## Daily price update

If `PRICE_CHANNEL_ID` is set, a cron job posts the current rate to that channel every day at `DAILY_PRICE_HOUR` (`DAILY_PRICE_TIMEZONE`, default `Asia/Kolkata`). Set `PING_EVERYONE_ON_PRICE_UPDATE=true` to have it `@everyone`.

## Storage

State (current price, warnings, open tickets/deals) lives in `src/data/store.json`, a flat JSON file — fine for a single-server bot at this scale. It's gitignored; back it up or swap in a real database later if you outgrow it.
