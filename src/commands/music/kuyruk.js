const { MessageEmbed } = require("discord.js");
const { GuildMember } = require('discord.js');

module.exports = {
    name: "kuyruk",
    description: "Kuyruktaki müziğin yerini değiştirir. 🔊",
    options: [
        {
            name: "değiş", description: "Kuyruktaki müziğin yerini değiştirir. 🔊", type: 1, options: [
                { description: 'Yeri değiştirilecek müziğin kuyruktaki sırasını belirtin. 🔊', name: 'sıra', required: true, type: 4 },
                { description: 'Kuyruktaki yeni sırasını belirtin. 🔊', name: 'yeni-sıra', required: true, type: 4 }
            ]
        },
        {
            name: "sil", description: "Kuyruktan seçilen müziği siler. 🔊", type: 1, options: [
                { description: 'Silinecek müziğin sıradaki numarasını belirtin. 🔊', name: 'numara', required: true, type: 4 }
            ]
        },
        {
            name: "yerleştir", description: "Seçtiğin müziği bir sonraki sıraya alır. 🔊", type: 1, options: [
                { description: 'Müzik adı veya link belirtin. 🔊', name: 'şarkı-adı', required: true, type: 3 }
            ]
        }
    ],
    run: async (client, interaction, player) => {
        const degis = interaction.options.getSubcommand("değiş");
        const sil = interaction.options.getSubcommand("sil");
        const yerlestir = interaction.options.getSubcommand("yerleştir");
        const sarkiAdi = interaction.options.getString("şarkı-adı");
        const degisSira = interaction.options.getInteger("sıra");
        const degisYeniSira = interaction.options.getInteger("yeni-sıra");
        const silSira = interaction.options.getInteger("numara");
        const queue = player.getQueue(interaction.guildId);

        if (degis) {
            const trackIndex = degisSira - 1;

            const embed = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Ya kuyruk boş ya da bir sıra belirtmedin!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });

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
            }

            else if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
                return interaction.reply({ embeds: [embed2], ephemeral: true });
            }
            else if (!queue || !queue?.playing || !degisSira || !degisYeniSira) { interaction.reply({ embeds: [embed], ephemeral: true }) }
            else if (!queue.tracks[trackIndex]) { return }
            else {
                const trackName = queue.tracks[trackIndex].title;
                const trackUrl = queue.tracks[trackIndex].url;
                const track = queue.remove(trackIndex);

                const embed3 = new MessageEmbed()
                    .setTitle(`**Müzik Bildirim**`)
                    .setDescription(`✅ | [${trackName}](${trackUrl}) yeri **${degisYeniSira}** olarak değiştirildi!`)
                    .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                    .setColor("#4007eb")
                    .setTimestamp()
                    .setFooter({
                        text: `${interaction.member.user.username} tarafından istendi.`,
                        iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                    });

                queue.insert(track, degisYeniSira - 1);
                interaction.reply({ embeds: [embed3] })
            }

        } else if (sil) {
            const trackIndex2 = silSira - 1;
            const embed4 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Ya kuyruk boş ya da bir sıra belirtmedin!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });

            const embed5 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Kuyrukta şarkı yok!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });

            const embed6 = new MessageEmbed()
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
                return interaction.reply({ embeds: [embed6], ephemeral: true });
            }
            else if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
                return interaction.reply({ embeds: [embed6], ephemeral: true });
            }
            else if (!queue || !silSira) { return interaction.reply({ embeds: [embed4], ephemeral: true }) }
            else if (!queue.tracks[trackIndex2]) { return interaction.reply({ embeds: [embed5], ephemeral: true }) }
            else {
                const trackName2 = queue.tracks[trackIndex2].title;
                const trackUrl2 = queue.tracks[trackIndex2].url;

                const embed7 = new MessageEmbed()
                    .setTitle(`**Müzik Bildirim**`)
                    .setDescription(`✅ | [${trackName2}](${trackUrl2}) kuyruktan silindi!`)
                    .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                    .setColor("#4007eb")
                    .setTimestamp()
                    .setFooter({
                        text: `${interaction.member.user.username} tarafından istendi.`,
                        iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                    });

                queue.remove(trackIndex2);

                interaction.reply({
                    embeds: [embed7]
                });
            }

        } else if (yerlestir) {

            const embed99 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Sesli kanalda değilsin!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
    
            const embed98 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Benim sesli kanalımda değilsin!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
    
            const embed97 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Ya müzik çalmıyor ya da bir seçenek belirtmedin!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
    
            const embed96 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Sonuç bulunamadı!`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
    
            const embed94 = new MessageEmbed()
                .setTitle(`**Hata!**`)
                .setDescription(`❌ | Bu komut playlist'leri kapsamıyor.\nBunun yerine /oynat {playlist-link} kullanın.`)
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: `${interaction.member.user.username} tarafından istendi.`,
                    iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                });
    
            if (!interaction.member.voice.channelId) {
                return interaction.reply({ embeds: [embed99], ephemeral: true });
            }
    
            if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
                return interaction.reply({ embeds: [embed98], ephemeral: true });
            }
            if (!queue || !sarkiAdi) return interaction.reply({ embeds: [embed97], ephemeral: true });
    
            const searchResult = await player.search(sarkiAdi, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });
            if (!searchResult || !searchResult.tracks.length) {
                interaction.reply({ embeds: [embed96], ephemeral: true });
            }
            else if (searchResult.playlist) {
                interaction.reply({ embeds: [embed94], ephemeral: true });
            }
            else {
                queue.insert(searchResult.tracks[0], 0);
                    const embed95 = new MessageEmbed()
                        .setTitle(`**Müzik Bildirim**`)
                        .setDescription(`✅ |  **[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})** kuyruğa **1.** sıraya eklendi.`)
                        .setThumbnail(searchResult.tracks[0].thumbnail)
                        .setColor("#4007eb")
                        .setTimestamp()
                        .setFooter({
                            text: `${interaction.member.user.username} tarafından istendi.`,
                            iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
                        });
    
                    interaction.reply({ embeds: [embed95] });
            }
        } else {
            return;
        }
    }
}