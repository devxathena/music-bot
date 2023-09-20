module.exports = {
    name: "audioTrackRemove",
    async execute(client, player, queue, track) {
        queue.metadata.channel.send(`Track **${track.title}** removed from queue.`);
    },
};