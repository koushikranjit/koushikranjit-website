import { SlashCommandBuilder } from 'discord.js';

const NUMBER_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

export default {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Start a quick reaction poll')
    .addStringOption((o) => o.setName('question').setDescription('Poll question').setRequired(true))
    .addStringOption((o) => o.setName('options').setDescription('Comma-separated options (max 10, default Yes/No)')),
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const raw = interaction.options.getString('options');
    const options = raw ? raw.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 10) : ['Yes', 'No'];

    const emojis = raw ? NUMBER_EMOJIS.slice(0, options.length) : ['👍', '👎'];
    const description = options.map((opt, i) => `${emojis[i]}  ${opt}`).join('\n');

    const message = await interaction.reply({
      content: `📊 **${question}**\n\n${description}`,
      fetchReply: true,
    });

    for (const emoji of emojis) {
      await message.react(emoji);
    }
  },
};
