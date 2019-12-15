const h = require('../heroes.json');
const Discord = require('discord.js');
module.exports = {
	name: 'quincy',
    description: 'quincy upgrades',
    usage: '!quincy <level>',
    aliases: ['q'],
	execute(message, args, client) {
		if(!args){
			return message.channel.send(`Please specify a level \`\`e.g.: ${message.content} 4\`\``)
		}
		const hh = h['quincy'][parseInt(args[0])];
		const heroEmbed = new Discord.RichEmbed()
		.setTitle('Quincy')
		.addField('cost',`${hh.cost}`)
		.addField('desc',`${hh.desc}`)
		.setFooter('use q!ap for help and elaboration');
		message.channel.send(heroEmbed)
    },
};