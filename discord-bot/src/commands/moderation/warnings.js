import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { readStore } from '../../utils/db.js';

export default {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View warnings for a member')
    .addUserOption((o) => o.setName('target').setDescription('Member to check').setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const store = readStore();
    const list = store.warnings[interaction.guild.id]?.[target.id] ?? [];

    if (list.length === 0) {
      return interaction.reply({ content: `${target.tag} has no warnings.`, ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(0xf59e0b)
      .setTitle(`Warnings for ${target.tag}`)
      .setDescription(
        list
          .map((w, i) => `**${i + 1}.** ${w.reason} — <t:${Math.floor(new Date(w.at).getTime() / 1000)}:R> (by <@${w.moderator}>)`)
          .join('\n'),
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
