module.exports = {
    name: "disconnect",
    async execute(client, player, queue) {
        queue.metadata.channel.send("Looks like my job here is done, leaving now!");
    },
};