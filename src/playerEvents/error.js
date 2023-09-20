module.exports = {
    name: "error",
    async execute(client, player, queue, error) {
        console.log(`General player error event: ${error.message}`);
        console.log(error);
    },
};
