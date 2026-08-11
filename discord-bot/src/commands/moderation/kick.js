import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption((o) => o.setName('target').setDescription('Member to kick').setRequired(true))
    .addStringOption((o) => o.setName('reason').setDescription('Reason for the kick'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    const member = await interaction.guild.members.fetch(target.id).catch(() => null);

    if (!member) {
      return interaction.reply({ content: 'That member is not in this server.', ephemeral: true });
    }
    if (!member.kickable) {
      return interaction.reply({ content: "I can't kick that member (role hierarchy or missing permission).", ephemeral: true });
    }

    await member.kick(reason);
    await interaction.reply(`👢 **${target.tag}** was kicked. Reason: ${reason}`);
  },
};
