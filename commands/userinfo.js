const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('User info!'),
    async execute(msg, args) {
        try {
            if (args.length) {
                var user = args[0].slice(3, args[0].length - 1);
                await db.query(`SELECT * FROM UserData WHERE userID = ${user}`, (err, result, fields) => {
                    if (err) throw err;
    
                    result = result[0]
                    return msg.reply(`**User data for <@${user}>**\n**User tag:** \`${result.userTag}\`\n**User ID:** \`${result.userID}\`\n**Account created:** \`${result.createdAt}\``);
                })
            } else {
                await db.query(`SELECT * FROM UserData WHERE userID = ${msg.author.id}`, (err, result, fields) => {
                    if (err) throw err;
    
                    result = result[0];
                    return msg.reply(`**User data for <@${msg.author.id}>**\n**User tag:** \`${result.userTag}\`\n**User ID:** \`${result.userID}\`\n**Account created:** \`${result.createdAt}\``);
                })
            }
            
        } catch (err) {
            console.error(err);
            return msg.reply('Please try again!');
        }
        
    },
};