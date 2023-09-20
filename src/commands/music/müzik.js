const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "müzik",
    description: "Müzik komutlarını gösterir. 🔊",
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
            .setTitle(`**Müzik Komutları**`)
            .setDescription("[Aşağıda gördüğün komutlar ile beni yönetebilirsin.](https://discord.gg/waves)")
            .addField(`\`/oynat\``, `İsim veya bir link ile ses oynatır.`, true)
            .addField(`\`/oynatılıyor\``, `Oynatılan müziğinn bilgilerini gösterir.`, true)
            .addField(`\`/durdur\``, `Oynatılan müziği durdurur.`, true)
            .addField(`\`/devam\``, `Durdurulmuş müziği devam ettirir.`, true)
            .addField(`\`/döngü\``, `Müziği döngüye alır.`, true)
            .addField(`\`/8d\``, `8D efektini aktifleştirir.`, true)
            .addField(`\`/kuyruk yerleştir\``, `Seçtiğin müziği bir sonraki sıraya alır.`, true)
            .addField(`\`/kuyruk değiş\``, `Seçtiğin müziğin kuyruktaki yerini değiştirir.`, true)
            .addField(`\`/kuyruk sil\``, `Seçtiğin müziği kuyruktan siler.`, true)
            .addField(`\`/karıştır\``, `Kuyruktaki müzikleri karışık bir biçimde çalar.`, true)
            .addField(`\`/ses\``, `Ses seviyesini düzenlersiniz.`, true)
            .addField(`\`/bitir\``, `Oynatılan müziği bitirir.`, true)
            .addField(`\`/geç\``, `Oynatılan müziği geçer.`, true)
            .addField(`\`/geri\``, `Bir önceki müziğe geri döner.`, true)
            .addField(`\`/liste\``, `Kuyruktaki müzikleri gösterir.`, true)
            .addField(`\`/şarkı-sözleri\``, `Şarkının sözlerini gösterir.`, true)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 1024 }))
            .setColor("#4007eb")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi. | Wave Müzik 2022`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        const altbuton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setEmoji("🇸")
                    .setLabel('discord.gg/waves')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/waves'),
                new MessageButton()
                    .setEmoji("🇧")
                    .setLabel('burak.sh')
                    .setStyle('LINK')
                    .setURL('https://burak.sh'),
                new MessageButton()
                    .setEmoji("🇽")
                    .setLabel('XATHENA_')
                    .setStyle('LINK')
                    .setURL("https://twitch.tv/xathena_"),
            );
        await interaction.reply({ embeds: [embed], components: [altbuton], ephemeral: true });
    }
};