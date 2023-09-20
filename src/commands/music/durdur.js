const { MessageEmbed } = require("discord.js");
const { GuildMember } = require("discord.js");

module.exports = {
    name: "durdur",
    description: "Oynatılan müziği durdurur. 🔊",
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

        const embed4 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Ses kanalında değilsin!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed5 = new MessageEmbed()
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
            return interaction.reply({ embeds: [embed4], ephemeral: true });
        }
        else if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ embeds: [embed5], ephemeral: true });
        }
        else if (!queue || !queue?.playing || !queue.current) {
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        else if (queue?.setPaused === true) {
            const embed2 = new MessageEmbed()
                .setTitle(`**Müzik Bildirim**`)
                .setDescription(`✅ | Müzik zaten durdurulmuş!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("#4007eb")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });

            interaction.reply({ embeds: [embed2] });

        }
        else {
            queue.setPaused(true);
            const embed3 = new MessageEmbed()
                .setTitle(`**Müzik Bildirim**`)
                .setDescription(`✅ | Müzik durduruldu!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("#4007eb")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });

            interaction.reply({ embeds: [embed3] });
        }
    },
};
