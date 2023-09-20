const {embed} = require("../utils/embed");
module.exports = {
    name: "audioTrackAdd",
    async execute(client, player, queue, track) {
        const trackResult = embed(res.tracks[0].title,
            `Loaded **[${res.tracks[0].title}](${res.tracks[0].url})** by **${res.tracks[0].author}** into the server queue.`,
            `${res.requestedBy.username} tarafından istendi.`,
            res.requestedBy.avatarURL({dynamic:true, size:512}),
            res.tracks[0].thumbnail,
            `Green`)

        queue.metadata.channel.send({embeds: [trackResult]});

    }
};