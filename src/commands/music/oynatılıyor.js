const { MessageEmbed, GuildMember } = require("discord.js");

module.exports =  {
    name: "oynatılıyor",
    description: "Oynatılan müziğin bilgilerini gösterir. 🔊",
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
        } else {
            const progress = queue.createProgressBar();
            const perc = queue.getPlayerTimestamp();
            const embed9 = new MessageEmbed()
                .setAuthor({ name: `Müzik Bildirim` })
                .setTitle(`Şimdi çalıyor`)
                .setDescription(`🎶 | **[${queue.current.title}](${queue.current.url})**! (\`${perc.progress}%\`)`)
                .setThumbnail(queue.current.thumbnail)
                .addFields({
                    name: "\u200b", value: progress,
                })
                .setColor("#4007eb")
                .setTimestamp()
                .setFooter({ text: `${queue.current.requestedBy.tag} tarafından istendi.`, iconURL: queue.current.requestedBy.avatarURL({ dynamic: true, size: 1024 }) })

            interaction.reply({ embeds: [embed9], })
        };
    },
}