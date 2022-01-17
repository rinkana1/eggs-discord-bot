// require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, dbhost, dbuser, dbpass, dbname, timeOptions } = require('./config.json');
const mysql = require('mysql');

// Replaces console.log(); Adds timestamp to each logged message
var log = (mess) => {
    return console.log.apply(
        console,
        [`[${new Date().toLocaleTimeString('en-US', timeOptions)}] ${mess}`]
    );
};
global.log = log;

// create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_VOICE_STATES'] });

// Creates a connection with MySQL database
// Information such as dbuser and dbpass must be defined in config.json
let db = mysql.createConnection({
    host: dbhost,
    user: dbuser,
    password: dbpass,
    database: dbname,
    charset: "utf8mb4_unicode_ci"
});

// Connects to MySQL Database connection
db.connect((err) => {
    if (err) throw err;
    log(`Connected to MySQL Database!`);
});

// Makes MySQL database global for all commands and events in program
global.db = db;

// EVENTS
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// login to Discord with you app's token
client.login(token);