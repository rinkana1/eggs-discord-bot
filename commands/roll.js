const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Perform a dice roll'),
    async execute(msg, args) {
        try {
            if (!args[0]) throw 'INVALID ARGUMENTS';
            args[0] = args[0].toLowerCase();
            var [ numDice, dieType ] = args[0].split('d');
            var result = 0;

            if (isNaN(numDice)) throw 'INVALID NUM OF DICE';
            if (isNaN(dieType)) throw 'INVALID DIE TYPE';

            parseInt(numDice);
            parseInt(dieType);

            if (!numDice || numDice == 0) throw 'INVALID NUM OF DICE';
            if (!dieType || dieType == 0) throw 'INVALID DIE TYPE';

            function rollDie(type) {
                return Math.ceil(Math.random() * type)
            }

            for (numDice; numDice > 0; numDice--) {
                result += rollDie(dieType);
            }

            msg.reply(`Your dice roll: **${result}**`);
        } catch (err) {
            log(`Client ran into an error during \"roll\" command. Error occured in ${msg.channel.name} (${msg.guild.name})`)
            switch (err) {
                case 'INVALID ARGUMENTS':
                    log(`ERROR: ${err}`);
                    return msg.reply('You must specify what type of die roll you want!');
                case 'INVALID NUM OF DICE':
                    log(`ERROR: ${err}`);
                    return msg.reply('The number of dice must be a number above zero!');
                case 'INVALID DIE TYPE':
                    log(`ERROR: ${err}`);
                    return msg.reply('The die type must be a number above zero!')
                default:
                    console.error(err)
                    return log('Error not fatal. Client continued to run');
            }
            
        }
        
    },
};