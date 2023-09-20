const { GuildMember } = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "geri",
    description: "Bir önceki müziğe geri döner. 🔊",
    options: [],
    run: async (client, interaction, player) => {
        const queue = player.getQueue(interaction.guildId);
        const embed2 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Lütfen önce bir sesli kanalda ol veya benle aynı kanala geç!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });



        if (!interaction.member.voice.channel || interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        } else if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        } else if (!queue || !queue.playing) {

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

            return interaction.reply({ embeds: [embed], ephemeral: true });

        }
        else if (!queue?.previousTracks) {

            const embedonceki = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Önceden oynatılmış bir müzik yok!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
            return interaction.reply({ embeds: [embedonceki], ephemeral: true })
        } else {
            queue.back();

            const embed3 = new MessageEmbed()
                .setTitle(`**Müzik Bildirim**`)
                .setDescription(`⏮ | Önceki müziğe geçildi!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("#4007eb")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });

            interaction.reply({ embeds: [embed3] });
        }
    }
}