const {Player} = require("discord-player");

class playerXATHENA extends Player {
    constructor(client) {
        super(client, {
            ytdlOptions: {
                requestOptions: {
                    headers: {
                        cookie: process.env.YT_COOKIE || null,
                    },
                },
                quality: "highestaudio",
                dlChunkSize: 2 * 1024 * 1024,
                highWaterMark: 10 * 1024 * 1024,
            },
        });
        this.client = client;
    }
}

module.exports = playerXATHENA;
