module.exports = {
    name: "audioTracksRemove",
    async execute(client, player, queue, track) {
        queue.metadata.channel.send(`Multiple tracks removed from queue.`);
    },
};