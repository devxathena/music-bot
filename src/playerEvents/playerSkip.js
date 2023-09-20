module.exports = {
  name: "playerSkip",
  async execute(client, player, queue, track) {
    queue.metadata.channel.send(`Skipping **${track.title}** due to an issue!`);
  },
};