let war = global.maxwarn;

    let handler = async (m, { conn, text, usedPrefix, command }) => {
    let dapat = (Math.floor(Math.random() * 100000))
    let owner = '6281222844295@s.whatsapp.net';
    let nomors = m.sender
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) return m.reply('Tag salah satu lah')
    if (typeof db.data.users[who] == 'undefined') return m.reply('Pengguna tidak ada didalam data base')
        if (who === owner) {
        let warn = global.db.data.users[m.sender].warn || 0;
        if (warn < war) {
            global.db.data.users[m.sender].warn += 1;
            m.reply(`⚠️ *PERINGATAN* ⚠️
Anda menerima peringatan dari admin

▢ *Warning:* ${warn + 1}/${war}
▢ *Alasan:* Percobaan Pembunuhan Terhadap Ownerku
Jika Anda menerima *${war}* peringatan, Anda akan dihapus secara otomatis dari grup`);
        } else {
            global.db.data.users[m.sender].warn = 0;
            m.reply(`⛔ Anda telah melebihi batas peringatan *${war}* dan akan dihapus dari grup`);
            await time(3000);
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            m.reply(`♻️ Anda telah dikeluarkan dari grup karena telah diperingatkan *${war}* kali`, m.sender);
        }
        return;
    }
    
    let __timers = (new Date - global.db.data.users[m.sender].lastrampok)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    let users = global.db.data.users
    if (new Date - global.db.data.users[m.sender].lastrampok > 3600000) {
        if (10000 > users[who].money) return m.reply('ᴛᴀʀɢᴇᴛ ɢᴀᴀᴅᴀ 💰ᴜᴀɴɢ ʙᴏᴅᴏʜ, ᴋɪꜱᴍɪɴ ᴅɪᴀ')
        users[who].money -= dapat * 1
        users[m.sender].money += dapat * 1
        global.db.data.users[m.sender].lastrampok = new Date * 1
        conn.reply(m.chat, `ʙᴇʀʜᴀꜱɪʟ ᴍᴇʀᴀᴍᴘᴏᴋ ᴍᴏɴᴇʏ ᴛᴀʀɢᴇᴛ ꜱᴇʙᴇꜱᴀʀ 💰${dapat}`, m)
    } else conn.reply(m.chat, `Anda Sudah merampok dan berhasil sembunyi , tunggu ${timers} untuk merampok lagi`, m)
}
handler.help = ['merampok *@tag*']
handler.tags = ['rpg']
handler.command = /^merampok$/
handler.register = true
module.exports = handler

    function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)]
    }
    function clockString(ms) {
        let h = Math.floor(ms / 3600000)
        let m = Math.floor(ms / 60000) % 60
        let s = Math.floor(ms / 1000) % 60
        return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
    }