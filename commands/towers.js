const Discord = require('discord.js')
const { cyber } = require('../jsons/colours.json')
const fetch = require('node-fetch')
const url = 'http://topper64.co.uk/nk/btd6/dat/towers.json'
const settings = { method: 'Get' }
const aliases = [
    ['dart-monkey', 'dart', 'dm'],
    ['boomerang-monkey', 'boomerang', 'bm', 'boom', '💥', 'rang', 'bomerang', 'boo', 'bomer', 'rangs', 'bomerrang'],
    ["bomb-shooter", 'bs', 'cannon'],
    ['tack-shooter', 'tac', 'tak', 'ta', 'tacc',],
    ['ice-monkey', 'ice', 'im',],
    ['glue-gunner', 'glue', 'gs', 'glu', 'stick',],
    ['sniper-monkey', 'sniper', 'sn', 'snip', 'snooper', 'gun', 'snipermonkey',],
    ['monkey-sub', 'submarine', 'sub', 'sm', 'st',],
    ['monkey-buccaneer', 'boat', 'buc', 'bucc', 'buccaneer',],
    ['monkey-ace', 'ace', 'pilot', 'plane',],
    ['heli-pilot', 'heli', 'helicopter', 'helipilot',],
    ['mortar-monkey', 'mortar', 'mor'],
    ['wizard-monkey', 'wizard', 'apprentice', 'wiz',],
    ['super-monkey', 'super', 'supermonkey',],
    ['ninja-monkey', 'ninja', 'n', 'ninj', 'shuriken',],
    ['alchemist', 'al', 'alk', 'alcc', 'elk', 'alc', 'alche', 'potion', 'beer', 'wine', 'liquor', 'intoxicant', 'liquid', 'op'],
    ['druid', 'drood', 'd'],
    ['banana-farm', 'farm', 'monkeyfarm',],
    ['spike-factory', 'factory', 'spike', 'spac', 'spak', 'spanc', 'spikes', 'spikefactory', 'spi', 'sf', 'spacc', 'spikeshooter', 'basetrash', 'spact',],
    ['monkey-village', 'vill', 'vil', 'villi', 'town', 'house', 'energy', 'building', 'hut', 'circle', 'fort',],
    ['engineer-monkey', 'engi', 'eng', 'overclock', 'engie'],
]
module.exports = {
    name: 'dart',
    description: 'buccaneer upgrades desc',
    aliases: ['dart-monkey', 'dart', 'dm', 'boomerang-monkey', 'boomerang', 'bm', 'boom', '💥', 'rang', 'bomerang', 'boo', 'bomer', 'rangs', 'bomerrang', "bomb-shooter", 'bs', 'bomb', 'cannon', 'tack-shooter', 'tac', 'tak', 'ta', 'tacc', 'ice-monkey', 'ice', 'im', 'glue-gunner', 'glue', 'gs', 'glu', 'stick', 'sniper-monkey', 'sniper', 'sn', 'snip', 'snooper', 'gun', 'snipermonkey', 'monkey-sub', 'submarine', 'sub', 'sm', 'st', 'monkey-buccaneer', 'boat', 'buc', 'bucc', 'buccaneer', 'monkey-ace', 'ace', 'pilot', 'plane', 'heli-pilot', 'heli', 'helicopter', 'helipilot', 'mortar-monkey', 'mortar', 'mor', 'wizard-monkey', 'wizard', 'apprentice', 'wiz', 'super-monkey', 'super', 'supermonkey', 'ninja-monkey', 'ninja', 'n', 'ninj', 'shuriken', 'alchemist', 'al', 'alk', 'alcc', 'elk', 'alc', 'alche', 'potion', 'beer', 'wine', 'liquor', 'intoxicant', 'liquid', 'op', 'druid', 'drood', 'd', 'banana-farm', 'farm', 'monkeyfarm', 'spike-factory', 'factory', 'spike', 'spac', 'spak', 'spanc', 'spikes', 'spikefactory', 'spi', 'sf', 'spacc', 'spikeshooter', 'basetrash', 'spact', 'monkey-village', 'vill', 'vil', 'villi', 'town', 'house', 'energy', 'building', 'hut', 'circle', 'fort', 'engineer-monkey', 'engi', 'eng', 'overclock', 'engie'],
    usage: '<path1> <path2> <path3>',
    execute(message, args) {
        if (!args || args[1] || isNaN(args[0]) || args[0].includes('-')) {
            return provideHelpMsg()
        }
        const pathStr = args[0].toString()
        const path1 = parseInt(pathStr.charAt(0))
        const path2 = parseInt(pathStr.charAt(1))
        const path3 = parseInt(pathStr.charAt(2))
        let path = 1
        if (path2 < 1 && path3 < 1) {
            path = 1
        } else if (path1 < 1 && path3 < 1) {
            path = 2
        } else if (path1 < 1 && path2 < 1) {
            path = 3
        } else {
            return provideHelpMsg()
        }
        let tier = 0
        switch (path) {
            case 1:
                tier = path1
                break
            case 2:
                tier = path2
                break
            case 3:
                tier = path3
                break
        }
        const newArgs = message.content.slice(2).split(/ +/)
        const commandName = newArgs.shift().toLowerCase()
        let name = findName(commandName)
        fetch(url, settings)
            .then((res) => res.json())
            .then((json) => {
                let object = json[`${name}`].upgrades[path - 1][tier - 1]
                if (!object) {
                    const embed = baseTower(json, name)

                    return message.channel.send(embed).then((msg) => {
                        msg.react('❌')
                        const filter = (reaction, user) => {
                            return (
                                reaction.emoji.name === '❌' &&
                                user.id === message.author.id
                            )
                        }
                        const collector = msg.createReactionCollector(filter, {
                            time: 20000
                        })

                        collector.on('collect', () => {
                            msg.delete()
                        })
                    })
                } else {
                    const embed = anyOtherTower(json, name, path, tier)
                    message.channel.send(embed).then((msg) => {
                        msg.react('❌')
                        const filter = (reaction, user) => {
                            return (
                                reaction.emoji.name === '❌' &&
                                user.id === message.author.id
                            )
                        }
                        const collector = msg.createReactionCollector(filter, {
                            time: 20000
                        })

                        collector.on('collect', () => {
                            msg.delete()
                        })
                    })
                }


            })

    }
}
function provideHelpMsg(message) {
    fetch(url, settings)
        .then((res) => res.json())
        .then((json) => {
            let str = `Please use the number in \`\`codeblocks\`\` to specify the upgrade.\nFor example, **q!${name} 030**`
            const pathsArr = [
                '100',
                '200',
                '300',
                '400',
                '500',
                '010',
                '020',
                '030',
                '040',
                '050',
                '001',
                '002',
                '003',
                '004',
                '005'
            ]
            for (let i = 0; i < 15; i++) {
                let path
                let tier = 0
                if (parseInt(pathsArr[i]) % 100 == 0) {
                    path = 1
                    tier = parseInt(pathsArr[i]) / 100
                } else if (parseInt(pathsArr[i]) % 10 == 0) {
                    path = 2
                    tier = parseInt(pathsArr[i]) / 10
                } else {
                    path = 3
                    tier = parseInt(pathsArr[i])
                }
                const object = json[`${name}`].upgrades[path - 1][tier - 1]
                if (i % 5 == 0) {
                    str += '\n'
                } else {
                    str += ',   '
                }
                str += `__${object.name}__   \`\`${pathsArr[i]}\`\``
            }

            return message.channel.send(str)
        })
}
function hard(cost) {
    return Math.round((cost * 1.08) / 5) * 5
}
function baseTower(json, name) {
    let object = json[`${name}`]
    const embed = new Discord.MessageEmbed()
        .setColor(cyber)
        .addField('name', object.name)
        .addField(
            'cost',
            `${object.cost} (medium), ${hard(
                parseInt(object.cost)
            )} (hard)`
        )
        .addField('notes', object.notes)
        .addField('in game description', object.description)
        .setFooter(
            'd:dmg|md:moab dmg|cd:ceram dmg|p:pierce|r:range|s:time btw attacks|j:projectile count|\nq!ap for help and elaboration'
        )
    return embed
}
function anyOtherTower(json, name, path, tier) {
    let object = json[`${name}`].upgrades[path - 1][tier - 1];

    let totalCost = 0
    let newCost = 0
    for (i = tier; i > 0; i--) {
        newCost =
            json[`${name}`].upgrades[path - 1][i - 1].cost;

        totalCost += parseInt(newCost);
    }
    const baseCost = parseInt(json[`${name}`].cost)
    totalCost += baseCost

    const embed = new Discord.MessageEmbed()
        .setColor(cyber)
        .addField('name', object.name)
        .addField(
            'cost',
            `${hard(parseInt(object.cost))} (hard), ${object.cost} (medium)`
        )
        .addField('notes', object.notes)
        .addField('in game description', object.description)
        .addField('xp needed:', `${object.xp}`)
        .addField(
            'total cost',
            `${hard(totalCost)} (hard), ${totalCost} (medium)`
        )
        .setFooter(
            'd:dmg|md:moab dmg|cd:ceram dmg|p:pierce|r:range|s:time btw attacks|j:projectile count|\nq!ap for help and elaboration'
        )
    return embed
}
function findName(commandName) {
    for (let i = 0; i < aliases.length; i++) {
        let towerAliasSet = aliases[i]
        for (let j = 0; j < towerAliasSet.length; j++) {
            if (commandName == towerAliasSet[j]) {
                return towerAliasSet[0]

            }
        }
    }
    return
}