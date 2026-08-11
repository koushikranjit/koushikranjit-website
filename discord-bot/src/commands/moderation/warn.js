import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { readStore, writeStore } from '../../utils/db.js';

export default {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .addUserOption((o) => o.setName('target').setDescription('Member to warn').setRequired(true))
    .addStringOption((o) => o.setName('reason').setDescription('Reason').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason');

    const store = readStore();
    const guildWarnings = store.warnings[interaction.guild.id] ?? {};
    const userWarnings = guildWarnings[target.id] ?? [];
    userWarnings.push({ reason, moderator: interaction.user.id, at: new Date().toISOString() });
    guildWarnings[target.id] = userWarnings;
    store.warnings[interaction.guild.id] = guildWarnings;
    writeStore(store);

    const embed = new EmbedBuilder()
      .setColor(0xf59e0b)
      .setTitle('⚠️ Member Warned')
      .addFields(
        { name: 'Member', value: `${target}`, inline: true },
        { name: 'Total warnings', value: `${userWarnings.length}`, inline: true },
        { name: 'Reason', value: reason },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
