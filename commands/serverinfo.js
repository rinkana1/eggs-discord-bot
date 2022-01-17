const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Server info!'),
    async execute(msg) {
        try {
            await db.query(`SELECT * FROM GuildData WHERE guildID = ${msg.guild.id}`, (err, result, fields) => {
                if (err) throw err;

                result = result[0];
                return msg.reply(`**Server Name:** \`${result.guildName}\`\n**Server ID:** \`${result.guildID}\`\n**Bot Prefix:** \`${result.prefix}\`\n**Total Members:** \`${result.memberCount}\`\n**Verification Level:** \`${result.verificationLevel}\`\n**Created on** \`${result.createdAt}\``);
            })
        } catch (err) {
            console.error(err);
            return msg.reply('Please try again!');
        }
    },
};