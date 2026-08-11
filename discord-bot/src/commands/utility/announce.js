import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Post an announcement embed to a channel')
    .addChannelOption((o) =>
      o.setName('channel').setDescription('Target channel').addChannelTypes(ChannelType.GuildText).setRequired(true),
    )
    .addStringOption((o) => o.setName('title').setDescription('Title').setRequired(true))
    .addStringOption((o) => o.setName('message').setDescription('Message body').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const message = interaction.options.getString('message');

    const embed = new EmbedBuilder()
      .setColor(0x059669)
      .setTitle(title)
      .setDescription(message)
      .setFooter({ text: `Announced by ${interaction.user.tag}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: `✅ Announcement posted in ${channel}.`, ephemeral: true });
  },
};
