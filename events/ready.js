module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        log(`Ready! Logged in as ${client.user.tag}`);
    },
};