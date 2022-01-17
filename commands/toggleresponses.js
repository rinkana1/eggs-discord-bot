const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggleresponses')
        .setDescription('Toggles bot responses for a specific channel'),
    execute(msg) {
        try {
            db.query(`SELECT prefix FROM GuildData WHERE guildID = ${msg.guild.id}`, (err, result1, fields) => {
                if (err) throw err;

                let prefix = result1[0].prefix;
                db.query(`SELECT channelID FROM ChannelBlacklist WHERE channelID = ${msg.channel.id}`, (err, result, fields) => {
                    if (err) throw err;
                    if(!result.length) {
                        log(`Adding channel ${msg.channel.name} in ${msg.guild.name} to ChannelBlacklist`);
                        db.query(`INSERT INTO ChannelBlacklist VALUES (${msg.guild.id}, ${msg.channel.id})`, (err, result) => {
                            if (err) throw err;
                            log('Rows affected: ' + result.affectedRows);
                        })
                        return msg.reply(`:x: The channel is now disabled :x:\n(Use ${prefix}toggleresponses to enable it again)`);
                    } else {
                        log(`Removing channel ${msg.channel.name} in ${msg.guild.name} from ChannelBlacklist`);
                        db.query(`DELETE FROM ChannelBlacklist WHERE channelID = ${msg.channel.id}`, (err, result) => {
                            if (err) throw err;
                            log('Operation Successful! Rows affected: ' + result.affectedRows);
                        })
                        return msg.reply(`:white_check_mark: This channel is now enabled :white_check_mark:\n(Use ${prefix}toggleresponses to enable it again)`);
                    };
                });
            })
        } catch (err) {
            log('Client ran into an error during toggleResponses command.');
            console.error(err);
            return msg.reply('I had an issue running that command. Please contact the manufacturer.');
        }
    }
}