let war = global.maxwarn;

let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
    let isAdmin = m.isGroup ? (groupMetadata.admins || []).includes(m.sender) : false;
    let isOwner = global.owner.includes(m.sender.split('@')[0]);

    if (!isAdmin && !isOwner) {
        return m.reply('⛔ Perintah ini hanya bisa digunakan oleh admin grup atau owner');
    }
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    if (!who) {
        return m.reply(`Tag User!\n\n📌 Contoh : ${usedPrefix + command} @user`);
    }
    if (!(who in global.db.data.users)) {
        return m.reply( `🚨 Pengguna tidak terdaftar dalam database saya`);
    }
    let name = conn.getName(m.sender);
    let warn = global.db.data.users[who].warn;
    let reason = text.replace(/@[^\s]+/g, '').trim();
    if (warn < war) {
        global.db.data.users[who].warn += 1;
        m.reply(`
⚠️ *Pengguna yang Diperingatkan* ⚠️

▢ *Admin:* ${name}
▢ *Pengguna:* @${who.split('@')[0]}
▢ *Memperingatkan:* ${warn + 1}/${war}
▢ *Alasan:* ${reason}`, null, { mentions: [who] });

        m.reply(`
⚠️ *PERINGATAN* ⚠️
Anda menerima peringatan dari admin

▢ *Warning:* ${warn + 1}/${war}
▢ *Alasan:* ${reason}
Jika Anda menerima *${war}* peringatan, Anda akan dihapus secara otomatis dari grup`, who);
    } else if (warn == war) {
        global.db.data.users[who].warn = 0;
        m.reply(`⛔ Pengguna melebihi peringatan *${war}*, akan dihapus dari grup`);
        await time(3000);
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
        m.reply(`♻️ Anda telah dikeluarkan dari grup *${groupMetadata.subject}* karena telah diperingatkan *${war}* kali`, who);
    }
};

handler.help = ['warn'];
handler.tags = ['group'];
handler.command = ['warn'];
module.exports = handler;

const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};