const axios = require("axios");
const { MessageEmbed } = require("discord.js");

const getLyrics = (title) =>
    new Promise(async (ful, rej) => {
        const url = new URL("https://some-random-api.ml/lyrics");
        url.searchParams.append("title", title);

        try {
            const { data } = await axios.get(url.href);
            ful(data);
        } catch (error) {
            rej(error);
        }
    });

const substring = (length, value) => {
    const replaced = value.replace(/\n/g, "--");
    const regex = `.{1,${length}}`;
    const lines = replaced
        .match(new RegExp(regex, "g"))
        .map((line) => line.replace(/--/g, "\n"));

    return lines;
};

const createResponse = async (title) => {
    try {
        const data = await getLyrics(title);

        const embeds = substring(4096, data.lyrics).map((value, index) => {
            const isFirst = index === 0;

            return new MessageEmbed({
                title: isFirst ? `${data.title} - ${data.author}` : null,
                thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
                description: value
            });
        });

        return { embeds };
    } catch (error) {
        const embed31 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Bu müziğin sözlerini bulamıyorum!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });

        return interaction.reply({ embeds: [embed31], ephemeral: true })
    }
};

module.exports = {
    name: "şarkı-sözleri",
    description: "Şarkının sözlerini gösterir.",
    options: [
        {
            name: "şarkı-adı",
            description: "sözleri gösterilicek şarkının adı",
            type: 3,
            required: false
        }
    ],
    run: async (client, interaction, player) => {
        const embed3 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Hata bulundu!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });
        const title = interaction.options.getString("şarkı-adı");
        const sendLyrics = (songTitle) => {
            return createResponse(songTitle)
                .then((res) => {
                    interaction.reply(res);
                })
                .catch((err) => interaction.reply({ embeds: [embed3], ephemeral: true }));
        };

        if (title) return sendLyrics(title);
        const embed4 = new MessageEmbed()
            .setTitle(`**Hata!**`)
            .setDescription(`❌ | Hata bulundu!`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .setColor("RED")
            .setTimestamp()
            .setFooter({
                text: `${interaction.member.user.username} tarafından istendi.`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 1024 })
            });
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.reply({ embeds: [embed4], ephemeral: true });

        return sendLyrics(queue.current.title);
    }
};
