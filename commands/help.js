const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends help message'),
    async execute(msg, args, prefix) {
        if (args.length) {
            switch(args[0].toLowerCase()) {
                case 'help':
                    return msg.reply(`*Sends a help message*\n\nSyntax: **${prefix}help** [command]\n\nTo send a list of commands, use **${prefix}help**`);
                case 'ping':
                    return msg.reply(`*Pong!*\n\nSyntax: **${prefix}ping**`);
                case 'prefix':
                    return msg.reply(`*Displays current prefix or changes prefix*\n\nSyntax: **${prefix}prefix** [new prefix]\n\nTo display current prefix, use **${prefix}prefix**`);
                case 'serverinfo':
                    return msg.reply(`*Displays server info!*\n\nSyntax: **${prefix}serverinfo**`);
                case 'si':
                    return msg.reply(`*Displays server info!*\n\nSyntax: **${prefix}serverinfo**`);
                case 'server':
                    return msg.reply(`*Displays server info!*\n\nSyntax: **${prefix}serverinfo**`);
                case 'userinfo':
                    return msg.reply(`*Displays user info!*\n\nSyntax: **${prefix}userinfo**\n\nTo get someone else\'s user info, use **${prefix}userinfo** [mention]`);
                case 'ui':
                    return msg.reply(`*Displays user info!*\n\nSyntax: **${prefix}userinfo**\n\nTo get someone else\'s user info, use **${prefix}userinfo** [mention]`);
                case 'user':
                    return msg.reply(`*Displays user info!*\n\nSyntax: **${prefix}userinfo**\n\nTo get someone else\'s user info, use **${prefix}userinfo** [mention]`);
                case 'toggleresponses':
                    return msg.reply(`*Turns off bot responses for a channel*\n\nSyntax: **${prefix}toggleresponses**`);
                case 'tr':
                    return msg.reply(`*Turns off bot responses for a channel*\n\nSyntax: **${prefix}toggleresponses**`);
                case 'remind':
                    return msg.reply(`*Sends a reminder*\n\nSyntax: **${prefix}remind** [time in minutes]~[DM toggle]~[title of reminder]\n\nBy default, the reminder will be public, unless you specify that you want a DM\n\nExample: **${prefix}remind** 30~y~Finish your homework!`);
                case 'say':
                    return msg.reply(`*Sends a custom message*\n\nSyntax **${prefix}say** [message]`);
                case 'roll':
                    return msg.reply(`*Performs a dice roll*\n\nSyntax: **${prefix}roll** [dice]\n\nExample: **${prefix}roll** 1d6`)
                default:
                    return msg.reply('Unknown command!');
            }
        } else {
            msg.author.send(`__**List of commands**__\n\n**${prefix}help**: Displays this help message.\n**${prefix}ping**: Pong!\n**${prefix}prefix**: Displays current prefix or changes prefix.\n**${prefix}serverinfo**: Diplays server info.\n**${prefix}userinfo**: Displays user info.\n**${prefix}toggleresponses**: Turns off bot responses for a channel.\n**${prefix}remind**: Sends a reminder.\n**${prefix}say**: Sends a custom message.\n**${prefix}roll**: Performs a dice roll.`);
        }
    },
};