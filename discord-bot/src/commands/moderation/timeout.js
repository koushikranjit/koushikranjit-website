import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout (mute) a member')
    .addUserOption((o) => o.setName('target').setDescription('Member to timeout').setRequired(true))
    .addIntegerOption((o) =>
      o.setName('minutes').setDescription('Duration in minutes').setRequired(true).setMinValue(1).setMaxValue(40320),
    )
    .addStringOption((o) => o.setName('reason').setDescription('Reason'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    const member = await interaction.guild.members.fetch(target.id).catch(() => null);

    if (!member) return interaction.reply({ content: 'That member is not in this server.', ephemeral: true });
    if (!member.moderatable) return interaction.reply({ content: "I can't timeout that member.", ephemeral: true });

    await member.timeout(minutes * 60 * 1000, reason);
    await interaction.reply(`🔇 **${target.tag}** was timed out for ${minutes} minute(s). Reason: ${reason}`);
  },
};
