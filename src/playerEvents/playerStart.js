const {embed} = require("../utils/embed");
module.exports = {
    name: 'playerStart',
    async execute(client, player, queue, track) {
        const startEmbed = embed(
            `${track.title}`,
            `Started playing: **[${track.title}](${track.url})**`,
            track.requestedBy.username + ` tarafından istendi.`,
            track.requestedBy.avatarURL({dynamic:true ,size: 512}),
            track.thumbnail,
            `Green`,
        )

        queue.metadata.channel.send({ embeds: [startEmbed]});
    }
};