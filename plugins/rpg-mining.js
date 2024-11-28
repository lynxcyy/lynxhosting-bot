const cooldown = 300000

let handler = async (m, { usedPrefix }) => {
    try {
        let user = global.db.data.users[m.sender]
        
        // Initialize lastmining if it's undefined
        if (user.lastmining === undefined) {
            user.lastmining = 0
        }

        let timers = (cooldown - (new Date - user.lastmining))
        if (user.health < 80) {
            const soad = [{
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Heal',
                    id: `${usedPrefix}heal`
                })
            }]
            conn.sendAIMessage(m.chat, soad, m, {
                content: 'Health Anda Harus Diatas 80!',
                footer: global.set.footer,
            })
            return
        }
        if (user.pickaxe == 0) {
            const soad = [{
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Buat Pickaxe',
                    id: `${usedPrefix}craft pickaxe`
                })
            }]
            conn.sendAIMessage(m.chat, soad, m, {
                content: 'Anda Tidak Mempunya Pickaxe!',
                footer: global.set.footer,
            })
            return
        }
        if (new Date - user.lastmining <= cooldown) return m.reply(`
You're already mining!!, please wait *🕐${clockString(timers)}*
`.trim())

        const rewards = reward(user)
        let text = 'You\'ve been mining and lost'
        for (const lost in rewards.lost) {
            if (user[lost]) {
                const total = rewards.lost[lost].getRandom()
                user[lost] -= total * 1
                if (total) text += `\n*${global.rpg.emoticon(lost)}${lost}:* ${total}`
            }
        }
        text += '\n\nBut you got'
        for (const rewardItem in rewards.reward) {
            if (rewardItem in user) {
                const total = rewards.reward[rewardItem].getRandom()
                user[rewardItem] += total * 1
                if (total) text += `\n*${global.rpg.emoticon(rewardItem)}${rewardItem}:* ${total}`
            }
        }
        m.reply(text.trim())
        user.lastmining = new Date * 1
    } catch (e) {
        return m.reply('Terjadi Kesalahan...')
    }
}

handler.help = ['mining']
handler.tags = ['rpg']
handler.command = /^(mining)$/i
handler.register = true
module.exports = handler

function reward(user = {}) {
    let rewards = {
        reward: {
            exp: [1000],
            trash: [101],
            string: [25],
            rock: [30],
            iron: [25],
            emerald: [1, 4, 0, 0, 3],
            common: [10, 40, 82, 100, 3],
            uncommon: [34, 5, 23, 81],
            mythic: [12, 4, 0, 1, 0],
            legendary: [0, 0, 5, 1, 6, 2, 0, 0],
            iron: [0, 0, 0, 1, 0, 0],
            gold: [0, 0, 0, 0, 0, 1, 0],
            diamond: [7, 2, 5, 0, 3, 0, 1, 0],
        },
        lost: {
            health: [40],
            pickaxedurability: [10]
        }
    }
    // Adjust to return a random value
    for (const key in rewards.reward) {
        rewards.reward[key].getRandom = () => pickRandom(rewards.reward[key])
    }
    for (const key in rewards.lost) {
        rewards.lost[key].getRandom = () => pickRandom(rewards.lost[key])
    }
    return rewards
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
