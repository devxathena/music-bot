const {embed} = require("../utils/embed");
module.exports = {
    name: "audioTracksAdd",
    async execute(client, player, queue, track) {
        const playlistEmbed = embed(
            `${res.playlist.title}`,
            `**${res.tracks.length} tracks** from the ${res.playlist.type} **[${res.playlist.title}](${res.playlist.url})** have been loaded into the server queue.`,
            `${res.requestedBy.username} tarafından istendi.`,
            `${res.requestedBy.avatarURL({size: 512, dynamic: true})}`,
            `${res.playlist.thumbnail}`,
            `Green`)
       queue.metadata.channel.send({embeds: [playlistEmbed]});
    },
};