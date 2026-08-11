import { EmbedBuilder } from 'discord.js';

export default {
  name: 'guildMemberAdd',
  async execute(member) {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const autoRoleId = process.env.AUTO_ROLE_ID;

    if (autoRoleId) {
      await member.roles.add(autoRoleId).catch((err) => console.error('Auto-role failed:', err.message));
    }

    if (!welcomeChannelId) return;
    const channel = await member.guild.channels.fetch(welcomeChannelId).catch(() => null);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x059669)
      .setTitle('👋 Welcome!')
      .setDescription(`${member} just joined **${member.guild.name}**. Check the rules and say hi!`)
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setFooter({ text: `Member #${member.guild.memberCount}` });

    await channel.send({ embeds: [embed] }).catch(() => {});
  },
};
