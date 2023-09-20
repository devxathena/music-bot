module.exports = (client, fs) => {

    const playerXATHENA = require('../../client/player');
    const player = new playerXATHENA(client);
    global.player = player;
    const playerEventFiles = fs.readdirSync("src/playerEvents").filter(file => file.endsWith('.js'));

    for (const file of playerEventFiles) {
        const playerEvent = require(`../../playerEvents/${file}`);
        player.events.on(playerEvent.name, (...args) => playerEvent.execute(client, player, ...args));
        console.log(`👌 Player Event loaded successfully: ${playerEvent.name}`);
    }
}