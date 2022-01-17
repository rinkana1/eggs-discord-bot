const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say a message'),
    async execute(msg, args) {
        var response = args.join(' ');
        if (!response) {
            log('Cannot send an empty message. Command call deleted.');
                    return msg.reply('I can\'t send an empty message!')
                        .then(message => {
                            setTimeout(() => message.delete(), 3000)
                            msg.delete()
                        })
                        .catch();
        }

        msg.delete()

        try {
            msg.channel.send(response);
        } catch (err) {
            switch (err) {
                default:
                    log('Client ran into an error during the \"say\" command');
                    return console.error(err)
                    
                
            };
        };

    },
};