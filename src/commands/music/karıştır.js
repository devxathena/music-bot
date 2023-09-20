const { GuildMember } = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'karıştır',
    description: 'Kuyruktaki müzikleri karışık bir biçimde çalar. 🔊',
    run: async (client, interaction, player) => {
        const queue = player.getQueue(interaction.guildId);

        const hataembed1 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Ses kanalında değilsin!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const hataembed2 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Benle aynı ses kanalında değilsin!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const hataembed3 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Kuyrukta karıştırabileceğim başka şarkı yok.`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const hataembed4 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Şu anda herhangi bir müzik çalmıyor!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const hataembed5 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Bir hata alındı!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.reply({ embeds: [hataembed1], ephemeral: true });
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ embeds: [hataembed2], ephemeral: true });
        }
        if (!queue || !queue.playing) { interaction.reply({ embeds: [hataembed4], ephemeral: true }) }

        if (!queue.tracks[1]) {
            return interaction.reply({ embeds: [hataembed3], ephemeral: true });
        }
        try {
            queue.shuffle();
            trimString = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

            const embed = new MessageEmbed()
                .setTitle(`**Müzik Bildirim**`)
                .setDescription(`🎶 | Liste başarıyla karıştırıldı!\nKuyruğu görmek için /liste yazın.`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("#4007eb")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            log(error);
            return interaction.reply({ embeds: [hataembed5], ephemeral: true });
        }
    },
};