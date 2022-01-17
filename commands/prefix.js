const { SlashCommandBuilder } = require('@discordjs/builders');
const { defaultPrefix, timeOptions } = require('../config.json');
let prefix;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Checks and sets a new prefix'),
    async execute(msg, args) {
        let timestamp = new Date().toLocaleTimeString('en-US', timeOptions);

        if (args.length) {
            if (args[0].toLowerCase() == 'set') {
                try {
                    if (args[1] == '$') throw 'MUDAE PREFIX ERROR';
                    log(`Updating prefix data for ${msg.guild.id}`);
                    db.query(`UPDATE GuildData SET prefix = \'${args[1]}\' WHERE guildID = ${msg.guild.id}`, function(err, result) {
                        if (err) throw err;
                        log(`Operation Successful! Rows affected: ${result.affectedRows}`);
                    })
                return msg.channel.send(`Successfully set prefix to \`${args[1]}\``);
                } catch (err) {
                    switch (err) {
                        case 'MUDAE PREFIX ERROR':
                            log(`Prefix update request rejected. Reason: ${err}`);
                            return msg.channel.send('Cannot set prefix to \`$\` because it conflicts with other, more important bots.');
                    }
                }
                

            } else if (args[0].toLowerCase() == 'default') {
                log(`Updating prefix data for ${msg.guild.id}`);
                db.query(`UPDATE GuildData SET prefix = \'${defaultPrefix}\' WHERE guildID = ${msg.guild.id}`, function(err, result) {
                        if (err) throw err;
                        log(`Operation Successful! Rows affected: ${result.affectedRows}`);
                    })

                return msg.channel.send(`Successfully set prefix to \`${defaultPrefix}\``);
            }
        }
        
        db.query(`SELECT prefix FROM GuildData WHERE guildID = ${msg.guild.id}`, (err, result) => {
            if (err) throw err;
            return msg.channel.send(`**The current prefix is: **\`${result[0].prefix}\``);
        })
    },
};