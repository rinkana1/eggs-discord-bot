const { defaultPrefix, timeOptions } = require('../config.json');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {

        var guildId = guild.id;
        var guildName = guild.name;
        var memberCount = guild.memberCount;
        var verificationLevel = guild.verificationLevel;
        var createdAtDate = guild.createdAt.toISOString().slice(0, 10);
        var createdAtTime = guild.createdAt.toLocaleTimeString('en-UK', timeOptions);
        for (var i = 0; i < createdAtDate.length; i++) {if (createdAtDate[i] == '/') {createdAtDate[i] = '-'}};
        var createdAt = `${createdAtDate} ${createdAtTime}`;

        log(`Adding data from new guild: ${guild.name}`)
        await db.query(`INSERT INTO GuildData VALUES (${guildId}, \'${defaultPrefix}\', \'${guildName}\', ${memberCount}, \'${verificationLevel}\', \'${createdAt}\')`, function(err, result) {
            if (err) throw err;
            log(`[Operation Successful! Rows affected: ${result.affectedRows}`);
        });
    }
}