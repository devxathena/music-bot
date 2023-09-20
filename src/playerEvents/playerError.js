module.exports = {
    name: "playerError",
    async execute(client, player, queue, error, track) {
        console.log(`Player error event: ${error.message}`);
        console.log(error);
    },
};