const {GuildMember, EmbedBuilder} = require("discord.js");
const {errorEmbed, succesEmbed} = require("../../utils/embed");
const {useQueue} = require("discord-player");
module.exports = {
    data: {
        name: "play",
        description: "Plays a song",
        options: [
            {
                name: "query",
                description: "Müzik linki veya ismi belirtin. 🔊",
                type: 3,
                required: true,
            },
        ],
        permissions: [],
    },
    async execute(client, interaction) {

        interaction.deferReply();
        await interaction.deleteReply();
        const vcEmbed = errorEmbed(client, "**Hata!**", "Lütfen önce bir sesli kanalda ol veya benle aynı kanala geç!")
        const joinErr = errorEmbed(client, "**Hata!**", "Ses kanalına giremedim.")
        const resultErrEmbed = errorEmbed(client, "**Hata!**", `Açmak istediğin müziği bulamadım \nDoğru bir link girdiğine emin misin?`)

        const embed = new EmbedBuilder();
        embed.setColor("Blue");

        const channel = interaction.member.voice.channel;

        if (!channel || !(interaction.member instanceof GuildMember)) return await interaction.editReply({
            embeds: [vcEmbed],
            ephemeral: true
        });

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({embeds: [vcEmbed], ephemeral: true})
        }

        const query = interaction.options.getString("query", true);

        let queue = player.nodes.get(interaction.guild.id);

        if (!queue) {
            player.nodes.create(interaction.guild.id, {
                metadata: {
                    channel: interaction.channel,
                    client: interaction.guild.members.me,
                    requestedBy: interaction.member,
                },
                selfDeaf: true,
                volume: 100,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 30000,
                leaveOnEnd: true,
                leaveOnEndCooldown: 30000,
                leaveOnStop: true,
                leaveOnStopCooldown: 1800000
            });
        }

        queue = player.nodes.get(interaction.guild.id);

        try {
            const res = await player.search(query, {
                requestedBy: interaction.member,
            });

            global.res = res;

            if (!res || !res.tracks || res.tracks.length === 0 || !res.hasTracks()) {
                if (queue) queue.delete();
                return await interaction.editReply({embeds: [resultErrEmbed], ephemeral: true});
            }

            try {
                if (!queue.connection)
                    await queue.connect(interaction.member.voice.channel);
            } catch (error) {
                console.log(error);
                if (!queue?.deleted) queue?.delete();
                return interaction.reply({embeds: [joinErr]});
            }
            try {
                res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);
                if (!queue.isPlaying()) await queue.node.play(queue.tracks[0]);
            } catch (err) {
                console.error("An error occurred whilst attempting to play this media:");
                console.error(err);
                await queue.delete();
                return await interaction.followUp({embeds: [resultErrEmbed]});
            }

        } catch (err) {
            console.log(err);
        }

        //      TEST XATHENA
        //      const queue = useQueue();
        //
        //

    }
};