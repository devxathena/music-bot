const {MessageEmbed} = require("discord.js");

module.exports = {
    data: {
        name: "8d",
        description: "Müziğe 8D efektini ekler. 🔊",
        options: [{
            name: "seçenek",
            description: "Açık veya kapalı seçeneklerinden birini seçin. 🔊",
            type: 3,
            required: true,
            choices: [{name: "8D'yi aç", value: "1", description: "8D efektini açar. 🔊"}, {
                name: "8D'yi kapat",
                value: "2",
                description: "8D efektini kapatır. 🔇"
            }]
        },],
        run: async (client, interaction, player) => {
            const queue = player.getQueue(interaction.guildId);

            const embed = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Kuyrukta çalınacak şarkı yok!`)
                .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({dynamic: true, size: 1024})
                });

            const embed2 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ |  Bunu yapabilmek için bir sesli kanalda olman gerekli!`)
                .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({dynamic: true, size: 1024})
                });

            const embed3 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Benimle aynı sesli kanalda olman gerekli!`)
                .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({dynamic: true, size: 1024})
                });

            const embed4 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | 8D uygulanamadı!`)
                .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({dynamic: true, size: 1024})
                });

            const embed5 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | 8D efektini kapatamadım!`)
                .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({dynamic: true, size: 1024})
                });

            const embed6 = new MessageEmbed()
                .setTitle(`**Müzik Bildirim**`)
                .setDescription(`🎧 | 8D aktif edildi!`)
                .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                .setColor("#4007eb")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({dynamic: true, size: 1024})
                });

            const embed7 = new MessageEmbed()
                .setTitle(`**Müzik Bildirim**`)
                .setDescription(`🎧 | 8D kapatıldı!`)
                .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                .setColor("#4007eb")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({dynamic: true, size: 1024})
                });
            if (!interaction.member.voice.channel) {
                return interaction.editReply({embeds: [embed2], ephemeral: true,});
            }

            if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) {
                return interaction.editReply({embeds: [embed3], ephemeral: true,});
            }
            if (!queue || !queue?.playing) {
                return interaction.reply({embeds: [embed], ephemeral: true,});
            }

            const deger = interaction.options.get("seçenek");

            if (deger.value === "1") {
                try {
                    await queue.setFilters({"8D": true, normalizer2: true,});

                    await interaction.reply({embeds: [embed6]});
                } catch (error) {
                    log(error.message);
                    await interaction.reply({embeds: [embed4], ephemeral: true});
                }
            } else if (deger.value === "2") {
                try {
                    await queue.setFilters({"8D": false, normalizer2: false});
                    await interaction.reply({embeds: [embed7]});
                } catch (error) {
                    console.log(error.message);
                    await interaction.reply({embeds: [embed5], ephemeral: true});
                }
            } else {
                return
            }
        }
    }
}


