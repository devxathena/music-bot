const {Collection, REST, Routes} = require("discord.js");
module.exports = (client, fs) => {

    const commands = [];
    client.commands = new Collection();
    const commandFolders = fs.readdirSync('src/commands');

    for (const folder of commandFolders) {
        const commandFolderFiles = fs.readdirSync(`src/commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFolderFiles) {
            const command = require(`../../commands/${folder}/${file}`);
            const commandName = command.name || command.data?.name;
            const commandDesc = command.description || command.data?.description;
            const commandPerm = command.permissions || command.data?.permissions;
            const commandOpt = command.options || command.data?.options;
            commands.push({
                name: commandName,
                description: commandDesc,
                options: commandOpt,
                permissions: commandPerm
            });
            client.commands.set(commandName, command);
            console.log(`👌 Command loaded successfully: ${commandName}`);
        }
    }

    const rest = new REST().setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log(`👌 Loading ${commands.length} application (/) commands.`);
            const data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                {body: commands},
            );

            console.log(`👌 ${data.length} application (/) commands reloaded successfully.`);
        } catch (error) {
            console.error(error);
        }
    })();
}