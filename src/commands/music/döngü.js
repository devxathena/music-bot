const { MessageEmbed } = require("discord.js");
const { QueueRepeatMode } = require('discord-player');
const { GuildMember } = require("discord.js");

module.exports = {
    name: "döngü",
    description: "Müziği döngüye alır. 🔊",
    options: [
        {
            name: "döngü-modu", description: "Döngü modunu seçin 🔊", type: 3, choices: [
                { name: "kapalı", value: "1", description: "🔊" }, 
                { name: "müzik", value: "2" , description: "🔊"},
                { name: "kuyruk", value: "3" , description: "🔊"},
                { name: "otomatik", value: "4", description: "🔊" }]
        }

    ],
    run: async (client, interaction, player) => {
        const queue = player.getQueue(interaction.guildId);
        const dongumodu = interaction.options.get("döngü-modu");
        const embed2 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Şu anda herhangi bir şarkı çalmıyor!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed3 = new MessageEmbed()
            .setTitle(`**Müzik Bildirim**`)
            .setDescription(`🔄 | **Kuyruk** döngüye alındı.`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("#4007eb")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed4 = new MessageEmbed()
            .setTitle(`**Müzik Bildirim**`)
            .setDescription(`🔂 | **Müzik** döngüye alındı.`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("#4007eb")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed5 = new MessageEmbed()
            .setTitle(`**Müzik Bildirim**`)
            .setDescription(`✅ | Döngü **kapatıldı**.`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("#4007eb")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed6 = new MessageEmbed()
            .setTitle(`**Müzik Bildirim**`)
            .setDescription(`▶ | Oto-oynatma aktif edildi.`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("#4007eb")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed8 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Ses kanalında değilsin!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const embed9 = new MessageEmbed()
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
            return interaction.reply({ embeds: [embed8], ephemeral: true });
        }
        ;
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ embeds: [embed9], ephemeral: true });
        }
        ;
        if (!queue || !queue.playing) {
            return interaction.reply({ embeds: [embed2], ephemeral: true })
        }
        ;
        if (!dongumodu) {
            if (await queue.repeatMode === QueueRepeatMode.OFF || await queue.repeatMode === QueueRepeatMode.AUTOPLAY) {
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                interaction.reply({ embeds: [embed3] });
            } else if (await queue.repeatMode === QueueRepeatMode.QUEUE) {
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                interaction.reply({ embeds: [embed4] });
            } else if (await queue.repeatMode === QueueRepeatMode.TRACK) {
                queue.setRepeatMode(QueueRepeatMode.OFF);
                interaction.reply({ embeds: [embed5] });
            }
        }
        else if (dongumodu.value === "1") {
            queue.setRepeatMode(QueueRepeatMode.OFF);
            interaction.reply({ embeds: [embed5] });
        } else if (dongumodu.value === "2") {
            queue.setRepeatMode(QueueRepeatMode.TRACK);
            interaction.reply({ embeds: [embed4] });
        } else if (dongumodu.value === "3") {
            queue.setRepeatMode(QueueRepeatMode.QUEUE);
            interaction.reply({ embeds: [embed3] });
        } else if (dongumodu.value === "4") {
            queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
            interaction.reply({ embeds: [embed6] });
        } else {
            const embed7 = new MessageEmbed()
            embed7.setTitle(`**Hata!**`)
            embed7.setDescription(`❌ | Girilen değer geçersizdir.\nSeçenekler kısmından bir döngü modu seçin.`);
            embed7.setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            embed7.setTimestamp()
            embed7.setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });
            embed7.setColor('RED')
            let mode;
            if (await queue.repeatMode === QueueRepeatMode.OFF) mode = "`Kapalı`"
            else if (await queue.repeatMode === QueueRepeatMode.TRACK) mode = "`Müzik`"
            else if (await queue.repeatMode === QueueRepeatMode.QUEUE) mode = "`Kuyruk`"
            else if (await queue.repeatMode === QueueRepeatMode.AUTOPLAY) mode = "`Otomatik`"
            embed7.addFields({
                name: `Şu anki döngü modu: ${mode}`,
                value: `Seçenekler: kapalı (0), müzik (1), kuyruk (2) , otomatik (3)`
            });
            interaction.reply({ embeds: [embed7], ephemeral: true });
        }
    }
};

