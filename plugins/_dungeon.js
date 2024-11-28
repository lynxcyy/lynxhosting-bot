const fs = require('fs');

async function before(m) {
    this.room = this.room ? this.room : {}
    let room = Object.values(this.room).find(room => room.id && room.game && room.state && room.id.startsWith('dungeon') && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender) && room.state == 'WAITING')
    if (room) {
        let p1 = room.game.player1 || ''
        let p2 = room.game.player2 || ''
        let p3 = room.game.player3 || ''
        let p4 = room.game.player4 || ''
        let c1 = room.player1 || ''
        let c2 = room.player2 || ''
        let c3 = room.player3 || ''
        let c4 = room.player4 || ''

        let PLAYER = [room.game.player1]
        if (room.game.player2) PLAYER.push(room.game.player2)
        if (room.game.player3) PLAYER.push(room.game.player3)
        if (room.game.player4) PLAYER.push(room.game.player4)
        let P = data(PLAYER)
        if (/^(sendiri|dewean)$/i.test(m.text.toLowerCase())) {
            let lmao = '! ʏᴏᴜ ᴄᴀɴ\'ᴛ ᴘʟᴀʏ sᴏʟᴏ ʙᴇᴄᴀᴜsᴇ ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ʜᴀᴠᴇ ᴀ ᴘᴀʀᴛɴᴇʀ\n➞ ᴘʟᴇᴀsᴇ ᴛʏᴘᴇ *gass* ᴛᴏ ᴘʟᴀʏ ᴡɪᴛʜ ᴏᴛʜᴇʀ ᴘᴀʀᴛɴᴇʀs...'
            if (room.player2 || room.player3 || room.player4) return this.reply(m.chat, lmao, m)
            room.state = 'PLAYING'
            let str = `
*➞ ʀᴏᴏᴍ ɪᴅ:* ${room.id}
*👩‍🏫 ᴘʟᴀʏᴇʀ:*
${P}
`.trim()
            m.reply(str, room.player1, {
                contextInfo: {
                    mentionedJid: this.parseMention(str)
                }
            })

            setTimeout(async () => {
                let users = global.db.data.users[p1]
                let { health, sword } = room.less
                let { exp, money, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, petFood } = room.price
                let str2 = `
*• ʜᴇᴀʟᴛʜ:* -${health * 1}
*• sᴡᴏʀᴅ ᴅᴜʀᴀʙɪʟɪᴛʏ:* -${sword * 1}
- - - - - - - - - - - - - - - - -

*- ʀ ᴇ ᴡ ᴀ ʀ ᴅ -*
➞ *ᴇxᴘ:* ${exp}
➞ *ᴍᴏɴᴇʏ:* ${money}
➞ *ᴛʀᴀsʜ:* ${sampah}${potion == 0 ? '': '\n*➞ ᴘᴏᴛɪᴏɴ:* ' + potion}${petFood == 0 ? '': '\n*➞ ғᴏᴏᴅᴘᴇᴛ:* ' + petFood * 1}${kayu == 0 ? '': '\n*➞ ᴡᴏᴏᴅ:* ' + kayu}${batu == 0 ? '': '\n*➞ sᴛᴏɴᴇ:* ' + batu}${string == 0 ? '': '\n➞ *sᴛʀɪɴɢ:* ' + string}${iron == 0 ? '': '\n*➞ ɪʀᴏɴ:* ' + iron}${diamond == 0 ? '': '\n*➞ ᴅɪᴀᴍᴏɴᴅ:* ' + diamond}${common == 0 ? '': '\n*➞ ᴄᴏᴍᴍᴏɴ:* ' + common}${uncommon == 0 ? '': '\n*➞ ᴜɴᴄᴏᴍᴍᴏɴ:* ' + uncommon}
`.trim()
                user.health -= health * 1
                user.sworddurability -= sword * 1
                user.money += money * 1
                user.exp += exp * 1
                user.trash += sampah * 1
                user.potion += potion * 1
                user.diamond += diamond * 1
                user.iron += iron * 1
                user.wood += kayu * 1
                user.rock += batu * 1
                user.string += string * 1
                user.common += common * 1
                user.uncommon += uncommon * 1
                user.mythic += mythic * 1
                user.legendary += legendary * 1
                user.pet += pet * 1
                user.petFood += petFood * 1
                user.lastdungeon = new Date * 1
                let dungimg = ['dungeon1.jpg', 'dungeon2.jpg', 'dungeon3.jpg']
                await conn.adReply(room.player1, str2, '- ᴅ ᴜ ɴ ɢ ᴇ ᴏ ɴ -', '', fs.readFileSync('./media/' + dungimg.getRandom()), '', m)
                if (mythic > 0) {
                    let str3 = '🎉 ᴄᴏɴɢʀᴀᴛs ʏᴏᴜ ɢᴏᴛ ᴀ ɪᴛᴇᴍs ʀᴀʀᴇ ᴛʜᴀᴛ ɪs *' + mythic + '* ᴍʏᴛʜɪᴄ ᴄʀᴀᴛᴇ'
                    m.reply(str3, room.player1)
                }
                if (legendary > 0 || pet > 0) {
                    let str3 = (mythic > 0 ? 'ᴀɴᴅ' : 'ᴄᴏɴɢʀᴀᴛs') + ' ɢᴏᴛ ᴀ ɪᴛᴇᴍs ʀᴀʀᴇ ᴛʜᴀᴛ ɪs ' + (pet > 0 && legendary > 0 ? `*${legendary}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs ᴀɴᴅ *${pet}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : pet > 0 && legendary < 1 ? `*${pet}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : legendary > 0 && pet < 1 ? `*${legendary}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs` : '')
                    m.reply(str3, room.player1)
                }
                if ((users.health * 1) < 1 || (users.sworddurability * 1) < 1) {
                    let sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) == 1
                    let _sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 1
                    let __sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 0
                    let health1 = (users.health * 1) < 1
                    if (__sword1) {
                        users[p1].sword -= 1
                        users[p1].sworddurability = 0
                    }
                    let str3 = `${__sword1 ? `➞ ʏᴏᴜʀ sᴡᴏʀᴅ ${_sword1 ? ` ᴛʜᴇ ʟᴇᴠᴇʟ ɪs ʀᴇᴅᴜᴄᴇᴅ ʙʏ 1 ᴅᴜᴇ ᴛᴏ ᴅᴇsᴛʀᴜᴄᴛɪᴏɴ` : ` ᴅᴇsᴛʀᴏʏᴇᴅ`}`: ''}${health1 ? `\n➞ ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ɪs 0, ᴘʟᴇᴀsᴇ ʙᴜʏ ᴘᴏᴛɪᴏɴ ᴛᴏ ʜᴇᴀʟ ʏᴏᴜʀsᴇʟғ`: ''}`
                    m.reply(str3, room.player1)
                }
            }, room.game.time)
        }

        if (/^(mulai|gass|start)$/i.test(m.text.toLowerCase())) {
            let str = `
*➞ ʀᴏᴏᴍ ɪᴅ:* ${room.id}
*👩‍🏫 ᴘʟᴀʏᴇʀs:*
${P}
`.trim()
            for (let pl of PLAYER) m.reply(str, pl, {
                contextInfo: {
                    mentionedJid: this.parseMention(str)
                }
            })
            room.state = 'PLAYING'
            setTimeout(async () => {
                let users = global.db.data.user
                let random = Math.floor(Math.random() * (300000 - 120000 + 1)) + 120000
                let { health, sword } = room.less
                let { exp, money, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, petFood } = room.price
                for (let player of PLAYER) {
                    let user = users[player]
                    user.health -= health * 1
                    user.sworddurability -= sword * 1
                    user.money += money * 1
                    user.exp += exp * 1
                    user.trash += sampah * 1
                    user.potion += potion * 1
                    user.diamond += diamond * 1
                    user.iron += iron * 1
                    user.wood += kayu * 1
                    user.rock += batu * 1
                    user.string += string * 1
                    user.common += common * 1
                    user.uncommon += uncommon * 1
                    user.mythic += mythic * 1
                    user.legendary += legendary * 1
                    user.pet += pet * 1
                    user.petFood += petFood * 1
                    user.lastdungeon = new Date * 1
                    let str2 = `
*• ʜᴇᴀʟᴛʜ:* -${health * 1}
*• sᴡᴏʀᴅ ᴅᴜʀᴀʙɪʟɪᴛʏ:* -${sword * 1}
- - - - - - - - - - - - - - - - -

*- ʀ ᴇ ᴡ ᴀ ʀ ᴅ -*
➞ *ᴇxᴘ:* ${exp}
➞ *ᴍᴏɴᴇʏ:* ${money}
➞ *ᴛʀᴀsʜ:* ${sampah}${potion == 0 ? '': '\n*➞ ᴘᴏᴛɪᴏɴ:* ' + potion}${petFood == 0 ? '': '\n*➞ ғᴏᴏᴅᴘᴇᴛ:* ' + petFood * 1}${kayu == 0 ? '': '\n*➞ ᴡᴏᴏᴅ:* ' + kayu}${batu == 0 ? '': '\n*➞ sᴛᴏɴᴇ:* ' + batu}${string == 0 ? '': '\n➞ *sᴛʀɪɴɢ:* ' + string}${iron == 0 ? '': '\n*➞ ɪʀᴏɴ:* ' + iron}${diamond == 0 ? '': '\n*➞ ᴅɪᴀᴍᴏɴᴅ:* ' + diamond}${common == 0 ? '': '\n*➞ ᴄᴏᴍᴍᴏɴ:* ' + common}${uncommon == 0 ? '': '\n*➞ ᴜɴᴄᴏᴍᴍᴏɴ:* ' + uncommon}
`.trim()
                    let dungimg = ['dungeon1.jpg', 'dungeon2.jpg', 'dungeon3.jpg']
                    await conn.adReply(player, str2, '- ᴅ ᴜ ɴ ɢ ᴇ ᴏ ɴ -', '', fs.readFileSync('./media/' + dungimg.getRandom()), '', m)
                    if (mythic > 0) {
                        let str3 = '🎉 ᴄᴏɴɢʀᴀᴛs ʏᴏᴜ ɢᴏᴛ ᴀ ɪᴛᴇᴍs ʀᴀʀᴇ ᴛʜᴀᴛ ɪs *' + mythic + '* ᴍʏᴛʜɪᴄ ᴄʀᴀᴛᴇ'
                        m.reply(str3, player)
                    }
                    if (legendary > 0 || pet > 0) {
                        let str3 = (mythic > 0 ? 'ᴀɴᴅ' : 'ᴄᴏɴɢʀᴀᴛs') + ' ɢᴏᴛ ᴀ ɪᴛᴇᴍs ʀᴀʀᴇ ᴛʜᴀᴛ ɪs ' + (pet > 0 && legendary > 0 ? `*${legendary}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs ᴀɴᴅ *${pet}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : pet > 0 && legendary < 1 ? `*${pet}* ᴘᴇᴛ ᴛᴏᴋᴇɴ` : legendary > 0 && pet < 1 ? `*${legendary}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs` : '')
                        m.reply(str3, player)
                    }
                    if ((user.health * 1) < 1 || (user.sworddurability * 1) < 1) {
                        let sword1 = (user.sworddurability * 1) < 1 && (user.sword * 1) == 1
                        let _sword1 = (user.sworddurability * 1) < 1 && (user.sword * 1) > 1
                        let __sword1 = (user.sworddurability * 1) < 1 && (user.sword * 1) > 0
                        let health1 = (user.health * 1) < 1
                        if (__sword1) {
                            users[player].sword -= 1
                            users[player].sworddurability = 0
                        }
                        let str3 = `${__sword1 ? `➞ ʏᴏᴜʀ sᴡᴏʀᴅ ${_sword1 ? ` ᴛʜᴇ ʟᴇᴠᴇʟ ɪs ʀᴇᴅᴜᴄᴇᴅ ʙʏ 1 ᴅᴜᴇ ᴛᴏ ᴅᴇsᴛʀᴜᴄᴛɪᴏɴ` : ` ᴅᴇsᴛʀᴏʏᴇᴅ`}`: ''}${health1 ? `\n➞ ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ɪs 0, ᴘʟᴇᴀsᴇ ʙᴜʏ ᴘᴏᴛɪᴏɴ ᴛᴏ ʜᴇᴀʟ ʏᴏᴜʀsᴇʟғ`: ''}`
                        m.reply(str3, player)
                    }
                }
            }, room.game.time)
        }
    }
}

module.exports = before;