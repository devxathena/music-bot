const { MessageEmbed, GuildMember } = require("discord.js");

module.exports = {
    name: "liste",
    description: "Kuyruktaki müzikleri gösterir. 🔊",
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
        } if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        } if (!queue || !queue.playing) {

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

        } else {

            const currentTrack = queue.current;
            const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag
                    }`;
            });

            return interaction.reply({
                embeds: [
                    {
                        title: "Şarkı kuyruğu",
                        description: `${tracks.join("\n")}${queue.tracks.length > tracks.length
                            ? `\n...${queue.tracks.length - tracks.length === 1
                                ? `${queue.tracks.length - tracks.length
                                } daha fazla...`
                                : `${queue.tracks.length - tracks.length
                                } daha fazla...`
                            }`
                            : ""
                            }`,
                        color: "#4007eb",
                        fields: [
                            {
                                name: "Şuanda oynatılan",
                                value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
                            },
                        ],
                    },
                ]
            })
        };
    }
};
