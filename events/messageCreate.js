const fs = require('fs');
const { channel } = require("diagnostics_channel");
const prefix = '-'
const { Client, Collection, Intents } = require('discord.js');
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
    execute(msg) {
            if (!msg.content.startsWith(prefix) || !msg.guild || msg.author.bot) return;
        //Splitting the message from the user
        const args = msg.content.split(prefix);
        const command = args.reverse().shift().toLowerCase();
        console.log(`Called command: ${command}`);
        
        //See if the commands folder has that command in it
        if (!client.commands.has(command)) return;
        
        //Try to execute the command. If we can't, we throw an error instead.
        try {
            client.commands.get(command).execute(msg, args);
        } catch (error) {
            console.error(error);
            msg.channel.send("I hit an issue trying to issue that command.");
            console.log("A Command was issued, but I hit an issue trying to run it.");
        }
    },
};