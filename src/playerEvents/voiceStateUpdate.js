module.exports = {
    name: 'voiceStateUpdate',
    async execute(client, player, queue, oldState, newState) {

        try {
                // if (oldState.channelId === queue.metadata.requestedBy.voice.channelId && !newState.channelId) {
                //     return queue.delete();
                // } else if (!newState.channelId) {
                //     return queue.delete();
                // } else if (newState.channelId !== queue.metadata.requestedBy.voice.channelId) {
                //     queue.node.setPaused(!queue.node.isPaused());
                //     return queue.node.resume();

    }catch (e) {
            console.log(e);
        }
    }
};