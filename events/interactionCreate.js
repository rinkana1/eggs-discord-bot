const fs = require('fs');
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
    name: 'interactionCreate',
    async execute(interaction) {
        if(!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if(!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

        console.log(`${interaction.user.tag} triggered an interaction in #${interaction.channel.name}`)
    },
};