const { GuildMember, MessageEmbed} = require("discord.js");
let maxVolume = 100;

module.exports = {
    name: "ses",
    description: "Ses seviyesini düzenlersiniz. 🔊",
    options: [
        {
            name: 'seviye',
            description: 'Lütfen 1-100 arası bir değer girin. 🔊',
            type: 4,
            required: false,
        },
    ],
    run: async (client, interaction, player) => {

        const queue = player.getQueue(interaction.guildId);
        const seviye = interaction.options.getInteger("seviye");

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
        } if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        } if (!queue || !queue.playing) {

            return interaction.reply({ embeds: [embed2], ephemeral: true });

        }
            if (queue.volume === seviye) {
            const embed4 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Girdiğin değer şu anki ses seviyesi ile aynı.\n*↳ Lütfen başka bir değer girin.*`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
            return interaction.reply({ embeds: [embed4], ephemeral: true });
        } else if (seviye === 0) {
            const embed98 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Belirttiğin değer geçerli değil.\n*↳ Lütfen **1** ile **${maxVolume}** arasında bir değer girin.*`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
            return interaction.reply({ embeds: [embed98], ephemeral: true });
        } else if (seviye > 100){
            const embed100 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Belirttiğin değer geçerli değil.\n*↳ Lütfen **1** ile **${maxVolume}** arasında bir değer girin.*`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
            return interaction.reply({ embeds: [embed100], ephemeral: true });

        }
        else if (seviye < 0) {
 const embed99 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Belirttiğin değer geçerli değil.\n*↳ Lütfen **1** ile **${maxVolume}** arasında bir değer girin.*`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
            return interaction.reply({ embeds: [embed99], ephemeral: true });
        } else if (!seviye) {

                    const embed3 = new MessageEmbed()
                        .setTitle(`**Müzik Bildirim**`)
                        .setDescription(`✅ | Ses seviyesi şu anda 🔊 ${queue.volume}.\n*↳ Değiştirmek için **1** ile **${maxVolume}** arasında bir değer girin.*`)
                        .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                        .setColor("#4007eb")
                        .setTimestamp()
                        .setFooter({
                            text: `${interaction.member.user.username} tarafından istendi.`,
                            iconURL: interaction.member.user.avatarURL({dynamic: true, size: 1024})
                        });
                    return interaction.reply({embeds: [embed3], ephemeral: true});

            }
        else {
        const success = queue.setVolume(seviye);
        const embed6 = new MessageEmbed()
            .setTitle(`**Müzik Bildirim**`)
            .setDescription(`✅ | Ses seviyesi ${seviye} olarak ayarlandı.`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("#4007eb")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });
        if (success) {
            interaction.reply({ embeds: [embed6] });
        };
    }}
};