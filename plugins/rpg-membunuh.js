let war = global.maxwarn;

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let dapat = Math.floor(Math.random() * 100000);
    let healtu = Math.floor(Math.random() * 100);
    let owner = '6281222844295@s.whatsapp.net';
    let nomors = m.sender;
    let who;

    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    if (!who) return m.reply('Tag salah satu lah');
    if (typeof db.data.users[who] == 'undefined') return m.reply('Pengguna tidak ada didalam database');
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

    let __timers = new Date() - global.db.data.users[m.sender].lastsda;
    let _timers = 3600000 - __timers;
    let timers = clockString(_timers);
    let users = global.db.data.users;

    if (new Date() - global.db.data.users[m.sender].lastsda > 3600000) {
        if (10 > users[who].health) return m.reply('ᴛᴀʀɢᴇᴛ ꜱᴜᴅᴀʜ ᴛɪᴅᴀᴋ ᴍᴇᴍɪʟɪᴋɪ ʜᴇᴀʟᴛʜ💉');
        if (100 > users[who].money) return m.reply('💠ᴛᴀʀɢᴇᴛ ᴛɪᴅᴀᴋ ᴍᴇᴍɪʟɪᴋɪ ᴀᴘᴀᴘᴜɴ :(💠');

        users[who].health -= healtu;
        users[who].money -= dapat;
        users[m.sender].money += dapat;
        global.db.data.users[m.sender].lastsda = new Date().getTime();
        
        conn.reply(m.chat, `ᴛᴀʀɢᴇᴛ ʙᴇʀʜᴀꜱɪʟ ᴅɪ ʙᴜɴᴜʜ ᴅᴀɴ ᴋᴀᴍᴜ ᴍᴇɴɢᴀᴍʙɪʟ ᴍᴏɴᴇʏ ᴛᴀʀɢᴇᴛ ꜱᴇʙᴇꜱᴀʀ\n💰${dapat} ᴍᴏɴᴇʏ\nᴅᴀʀᴀʜ ᴛᴀʀɢᴇᴛ ʙᴇʀᴋᴜʀᴀɴɢ -${healtu} ʜᴇᴀʟᴛʜ❤`, m);
    } else {
        conn.reply(m.chat, `Anda Sudah Membunuh Dan Berhasil Sembunyi, tunggu ${timers} untuk membunuh lagi`, m);
    }
}

handler.help = ['membunuh *@tag*'];
handler.tags = ['rpg'];
handler.command = /^membunuh$/;
handler.register = true;
module.exports = handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};