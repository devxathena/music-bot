const { MessageEmbed } = require("discord.js");
const { GuildMember } = require("discord.js");

module.exports = {
    name: "geç",
    description: "Oynatılan müziği geçer. 🔊",
    options: [],
    run: async (client, interaction, player) => {
        const queue = player.getQueue(interaction.guildId);
        const embed = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Oynatılan herhangi bir müzik yok!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed2 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Ses kanalında değilsin!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed3 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Benle aynı ses kanalında değilsin!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        }
        else if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ embeds: [embed3], ephemeral: true });
        }
        else if (!queue || !queue.playing || !queue.current.title) {
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        else if (!queue.tracks[0]) {
            interaction.deferReply();
            await interaction.deleteReply();
            queue.stop({ disconnect: true });
        } else {
            queue.skip();
            const currentTrack = queue.current.title;
            const embed4 = new MessageEmbed()
                .setTitle(`**Müzik Bildirim**`)
                .setDescription(`✅ | Müzik Atlandı: **[${currentTrack}](${queue.current.url})**`)
                .setThumbnail(queue.current.thumbnail)
                .setColor("#4007eb")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
            interaction.reply({ embeds: [embed4] });
        }
    }
};
