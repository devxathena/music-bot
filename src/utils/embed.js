const {EmbedBuilder} = require("discord.js");

/**
 * Embed yazdırmaya yarar.
 * @param x Embed ismi.
 * @param { string } title Embed başlığını gösterir.
 * @param { string  } description Embed açıklamasını gösterir.
 * @param { footerTxt } footerTxt Footer açıklamasını gösterir.
 * @param { footerImg } footerImg Footer resmini gösterir.
 * @param { thumbnail } thumbnail Embed fotoğrafı. Bot avatarURL'i veya bir link.
 * @param { color } color Embed rengini belirler. Red Green Blue etc.
 *
 */

function embed(title, description, footerTxt, footerImg, thumbnail, color) {
    return new EmbedBuilder()
        .setTitle(title || null)
        .setDescription(description || null)
        .setFooter({text: footerTxt || null , iconURL: footerImg || null } || null)
        .setThumbnail(thumbnail || null)
        .setColor(color || null)
        .setTimestamp();
}

/**
 * Embed yazdırmaya yarar.
 * @param client
 * @param { string } title Embed başlığını gösterir.
 * @param { string } description Embed açıklamasını gösterir.
 */

function errorEmbed(client, title, description) {

   return new EmbedBuilder()
        .setTitle(title)
        .setDescription(`⛔ | ${description}`)
        .setFooter({
            text: `${client.user.username} 2023`,
            iconURL: client.user.avatarURL({dynamic: true, size: 512})
        })
        .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
        .setColor("Red")
        .setTimestamp()
}

/**
 * Embed yazdırmaya yarar.
 * @param { string } title Embed başlığını gösterir.
 * @param { string } description Embed açıklamasını gösterir.
 */

function succesEmbed(client, title, description) {

   return new EmbedBuilder()
        .setTitle(title)
        .setDescription("✅ | " + description)
        .setFooter({
            text: `${client.user.username} 2023`,
            iconURL: client.user.avatarURL({dynamic: true, size: 512})
        })
        .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
        .setColor("Green")
        .setTimestamp()
}

function readyEmbed(client) {
    const readyChannel = process.env.READY_CHANNEL;
    const readyEmbedMessage = new EmbedBuilder()
        .setTitle(client.user.username + " Aktif!")
        .setDescription(
            `[Created by XATHENA.\nKomutları görmek için /müzik yazın.](https://twitch.tv/xathena_)`
        )
        .addFields(
            {
                name: "``Şu anda:``",
                value: `${client.channels.cache.size} adet kanala,\n ${client.guilds.cache.size} adet sunucuya,\n ${client.users.cache.size} adet kullanıcıya hizmet veriyor.`,
                inline: true,
            },
            {
                name: "``Sunucu listesi:``",
                value: `❯ ${client.guilds.cache.map((m) => m.name).join(` \n❯  `)}`,
                inline: false,
                split: true,
            }
        )
        .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
        .setFooter({
            text: `${client.user.username} 2023`,
            iconURL: client.user.avatarURL({dynamic: true, size: 512})
        })
        .setColor("Green")
        .setTimestamp()


    client.channels.cache.get(readyChannel).send({embeds: [readyEmbedMessage]});
}

module.exports = {
    readyEmbed,
    errorEmbed,
    succesEmbed,
    embed
}

