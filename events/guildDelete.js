module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        log(`Removing guild data...`)
        await db.query(`DELETE FROM GuildData WHERE guildID = ${guild.id}`, (err, result) => {
            if (err) throw err;
            log(`Operation Successful! Rows affected: ${result.affectedRows}`);
        })
        log(`Client has left ${guild.name}`);
    }
}
