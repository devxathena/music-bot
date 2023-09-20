module.exports = {
    name: "emptyQueue",
    async execute(client, player, queue) {
        queue.metadata.channel.send("Queue finished!").then(m => m.delete(1000))
    },
};