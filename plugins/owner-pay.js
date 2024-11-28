let handler = async (m, { conn, command, args, usedPrefix: p, isOwner, DevMode }) => {
    if (!isOwner) return !0
    let type = (args[0] || '').toLowerCase()
    let who

    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender
    } else if (m.mentionedJid && m.mentionedJid[0]) {
        who = m.mentionedJid[0]
    } else if (args[2]) {
        who = args[2].replace(/[@+-]/g, '') + '@s.whatsapp.net'
    } else {
        who = m.fromMe ? conn.user.jid : m.sender
    }

    let cok = `Apa yang akan ditambahkan kedalam database pengguna? Exp, Money, Limit\nExample: ${p}pay exp 10 @628123456789`

    try {
        if (/pay/i.test(command)) {
            const count = args[1] && !isNaN(args[1]) ? Math.max(parseInt(args[1]), 1) : 1
            if (typeof db.data.users[who] == 'undefined') return m.reply('The user does not exist in the database')

            switch (type) {
                case 'exp':
                    db.data.users[who].exp += count
                    conn.reply(m.chat, `Added successfully ${count} ${type}`, m)
                    break
                case 'money':
                    db.data.users[who].money += count
                    conn.reply(m.chat, `Added successfully ${count} ${type}`, m)
                    break
                case 'limit':
                    db.data.users[who].limit += count
                    conn.reply(m.chat, `Added successfully ${count} ${type}`, m)
                    break
                default:
                    return conn.reply(m.chat, cok, m)
            }
        }
    } catch (e) {
        conn.reply(m.chat, cok, m)
        console.log(e)
    }
}

handler.help = ['pay <type> <amount> [@tag|number|reply]'].map(v => v)
handler.command = ['pay']
handler.tags = ['owner']
handler.fail = null
handler.owner = true
module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '')
}
