import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Collection } from 'discord.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadCommands() {
  const commands = new Collection();
  const commandsPath = join(__dirname, '..', 'commands');
  const categories = readdirSync(commandsPath, { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const category of categories) {
    const categoryPath = join(commandsPath, category.name);
    const files = readdirSync(categoryPath).filter((f) => f.endsWith('.js'));
    for (const file of files) {
      const { default: command } = await import(`file://${join(categoryPath, file)}`);
      if (command?.data && command?.execute) {
        commands.set(command.data.name, command);
      }
    }
  }
  return commands;
}
