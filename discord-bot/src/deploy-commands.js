import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { loadCommands } from './handlers/loadCommands.js';

async function main() {
  const commands = await loadCommands();
  const body = [...commands.values()].map((c) => c.data.toJSON());

  const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;
  if (!DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is missing in .env');
  if (!CLIENT_ID) throw new Error('CLIENT_ID is missing in .env');

  const rest = new REST().setToken(DISCORD_TOKEN);
  const route = GUILD_ID ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID) : Routes.applicationCommands(CLIENT_ID);

  console.log(`Deploying ${body.length} command(s) ${GUILD_ID ? `to guild ${GUILD_ID}` : 'globally'}...`);
  await rest.put(route, { body });
  console.log('✅ Commands deployed.');
}

main().catch((err) => {
  console.error('Failed to deploy commands:', err);
  process.exit(1);
});
