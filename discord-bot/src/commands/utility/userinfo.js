import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Show information about a member')
    .addUserOption((o) => o.setName('target').setDescription('Member to look up')),
  async execute(interaction) {
    const user = interaction.options.getUser('target') ?? interaction.user;
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    const embed = new EmbedBuilder()
      .setColor(0x059669)
      .setTitle(user.tag)
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: 'ID', value: user.id, inline: true },
        { name: 'Joined server', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : 'N/A', inline: true },
        { name: 'Account created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        {
          name: 'Roles',
          value: member
            ? member.roles.cache.filter((r) => r.id !== interaction.guild.id).map((r) => r.toString()).join(' ') || 'None'
            : 'N/A',
        },
      );

    await interaction.reply({ embeds: [embed] });
  },
};
