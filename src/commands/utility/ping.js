const {embed} = require("../../utils/embed");

module.exports = {
    data: {
        name: "ping",
        description: "Ping command",
        options: [],
        permissions: [],
    },
    async execute(client, interaction) {

        const test = embed("Ping", "Pong!", `${interaction.user.username} tarafından istendi.`, `${interaction.member.avatarURL({
            dynamic: true,
            size: 512
        })}`, client.user.avatarURL({dynamic: true, size: 512}), "Purple");
        await interaction.reply({embeds: [test]});
    },
};
