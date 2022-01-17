const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { timeOptions } = require('../config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, 'GUILD_MESSAGES', 'DIRECT_MESSAGES'] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

module.exports = {
    name: 'messageCreate',
    async execute(msg) {
        try {
            var prefix
            if(msg.channel.DMChannel) {
                handleMessage();
            }
            db.query(`SELECT prefix FROM GuildData WHERE guildID = ${msg.guild.id}`, (err, result, fields) => {
                if (err) throw err;
                prefix = result[0].prefix;
                
                db.query(`SELECT channelID FROM ChannelBlacklist WHERE channelID = ${msg.channel.id}`, (err, result1, fields) => {
                    if (err) throw err;
    
                    // Function to toggle responses in a channel
                    if (result1.length && !msg.content.toLowerCase().startsWith(`${prefix}toggleresponses`)) return;

                    if (!msg.content.startsWith(prefix) || !msg.guild || msg.author.bot) return;
                    handleCommand(); 
                })

            })
        } catch (err) {
                log(`Client ran into an error during messageCreate event.`);
                console.error(err);
                return log(`Error not fatal. Client continued to run.`);
        }

        var userId = msg.author.id;
        var userTag = msg.author.tag;
        var isBot = msg.author.bot ? 1 : 0;
        var createdAtDate = msg.author.createdAt.toISOString().slice(0, 10);
        var createdAtTime = msg.author.createdAt.toLocaleTimeString('en-UK', timeOptions);
        for (var i = 0; i < createdAtDate.length; i++) {if (createdAtDate[i] == '/') {createdAtDate[i] = '-'}};
        var createdAt = `${createdAtDate} ${createdAtTime}`;
        db.query(`SELECT * FROM UserData WHERE userID = ${msg.author.id}`, (err, result, fields) => {
            if (err) throw err;
            
            if (!result.length) {
                log(`Adding user data for ${userTag}...`);
                db.query(`INSERT INTO UserData VALUES (${userId}, \'${userTag}\', ${isBot}, \'${createdAt}\')`, (err, result1) => {
                    if (err) throw err;
                    log(`User data added. Rows affected: ${result1.affectedRows}`);
                })
            } else if (result[0].userTag != userTag) {
                log(`Updating user data for ${userTag}...`);
                db.query(`UPDATE UserData SET userTag = \'${userTag}\' WHERE userID = ${userId}`, (err, result1) => {
                    if (err) throw err;
                    log(`User data updated. Rows affected: ${result1.affectedRows}`);
                });
            };
        });

        // Command Handling
        function handleCommand() {
            //Splitting the message from the user
            const args = msg.content.slice(prefix.length).trim().split(' ');
            const prompt = args.shift().toLowerCase();
            let command;
            switch (prompt) {
                case 'ui':
                    command = 'userinfo';
                    args.shift();
                    break;
                case 'user':
                    command = 'userinfo';
                    args.shift();
                    break;
                case 'si':
                    command = 'serverinfo';
                    args.shift();
                    break;
                case 'server':
                    command = 'serverinfo';
                    args.shift();
                    break;
                case 'tr':
                    command = 'toggleresponses';
                    args.shift();
                    break;
                default:
                    command = prompt;
                    break;
            };
            log(`Called command: ${command} in ${msg.channel.name} (${msg.guild.name})`);

            //See if the commands folder has that command in it
            if (!client.commands.has(command)) return;
            
            //Try to execute the command. If we can't, we throw an error instead.
            try {
                client.commands.get(command).execute(msg, args, prefix);
            } catch (error) {
                console.error(error);
                msg.channel.send("I hit an issue trying to issue that command.");
                log(`Client ran into an error while issuing a command.`);
            }
                
        }
    }
}