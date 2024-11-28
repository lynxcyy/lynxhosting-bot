const moment = require('moment-timezone')

let handler = async (m, { conn, text, command }) => {
    const fcon = { key: { participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': `© ʟʏɴxʙᴏᴛ`,}}}
    const delay = time => new Promise(res => setTimeout(res, time))

    let chats = []
    if (command === 'bc') {
        chats = Object.keys(conn.chats).filter(jid => jid.endsWith('@s.whatsapp.net') || jid.endsWith('@g.us'))
    } else if (command === 'bcgc') {
        chats = Object.keys(conn.chats).filter(jid => jid.endsWith('@g.us'))
    }

    let pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if (!pesan) {
        return m.reply( 'Silahkan reply pesan/masukan teks untuk broadcast!')
    }

    m.reply(`Mengirim Broadcast ke ${chats.length} chat. Estimasi selesai dalam ${(chats.length * 0.5).toFixed(2)} detik`)

    for (let i of chats) {
        conn.reply(i, `${pesan}`, fcon, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: "「 ʟʏɴxʙᴏᴛ - ʙʀᴏᴀᴅᴄᴀꜱᴛ 」",
                    thumbnailUrl: 'https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg',
                    sourceUrl: 'https://chat.whatsapp.com/Bpzg40FTgYa9trttCoFEKi',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        })
        await delay(500)
    }
    m.reply(`Broadcast berhasil dikirim ke ${chats.length} chat`)
}

handler.help = ['bc', 'bcgc']
handler.tags = ['owner']
handler.command = /^(bc|bcgc)$/i
handler.owner = true

module.exports = handler
