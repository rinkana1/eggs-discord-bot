const { SlashCommandBuilder } = require('@discordjs/builders');
const helpMessage = 'Syntax: -remind <time in minutes>~<DM toggle>~<title of reminder>\n\nBy default, the reminder will be public, unless you specify that you want a DM\n\n**Example:** -remind 30~y~Finish your homework!';

class Reminder {
   constructor() {
       this.time = 0
       this.title = ''
       this.dmToggle = false
   };
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('Set a reminder'),
    async execute(message) {
        const content = message.content.slice(8);
        const args = content.split('~');
        
        reminder = new Reminder();

        if(!content) {
            message.channel.send(helpMessage);
            return;
        }
        
        reminder.time = args[0];

        if(args.length > 1) {
            if(args[1] == 'yes' || args[1] == 'y') {
                reminder.dmToggle = true;
            } else if(args[1] == 'no' || args[1] == 'n') {
                reminder.dmToggle = false;
            } else {
                args[1] = 'ERROR';
            }  
        }

        if(args.length > 2) {reminder.title = args[2]};
        
        try {
            if (args.length > 3) throw 'Excessive Arguments';
            if (isNaN(args[0]) == true) throw 'Time NaN';
            if (args[1] == 'ERROR') throw 'Invalid DM Response';
        } catch(err) {
            console.error(`ERROR: ${err}`);
            switch(err) {
                case 'Excessive Arguments':
                    message.channel.send('You have too many arguments!');
                    return;
                case 'Time NaN':
                    message.channel.send('Time must be a number!');
                    return;
                case 'Invalid DM Response':
                    message.channel.send('Your DM Toggle is Invalid!');
                    console.log(args[2]);
                    console.log(args);
                    return;
            }
        }
        

        log(`SUCCESS! Reminder set.\nTitle: \"${reminder.title}\"\nTime: ${reminder.time} min\nDM: ${reminder.dmToggle}`)
        message.react('👍')
        let timer = setTimeout(() => {
            console.log(`Reminder sent!`);
            if(reminder.dmToggle == false) {
                if (reminder.title) {
                    message.channel.send(`<@${message.author.id}> **Here is your reminder: ${reminder.title}**`);
                } else {
                    message.channel.send(`<@${message.author.id}> **Here is your reminder!!**`);
                }
            } else {
                if (reminder.title) {
                    message.author.send(`**Here is your reminder: ${reminder.title}**`);
                } else {
                    message.author.send(`Here is your reminder!!`);
                }
            }
        }, (reminder.time * 60000));
        

    },
};