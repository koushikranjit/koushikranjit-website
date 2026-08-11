import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Show a member's avatar")
    .addUserOption((o) => o.setName('target').setDescription('Member to look up')),
  async execute(interaction) {
    const user = interaction.options.getUser('target') ?? interaction.user;
    const embed = new EmbedBuilder()
      .setColor(0x059669)
      .setTitle(`${user.tag}'s avatar`)
      .setImage(user.displayAvatarURL({ size: 1024 }));

    await interaction.reply({ embeds: [embed] });
  },
};
