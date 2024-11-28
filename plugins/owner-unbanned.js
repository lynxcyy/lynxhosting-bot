let handler = async (m, { conn, text, args }) => {
    let users = global.db.data.users;

    if (args[0] === 'all') {
        let unbannedUsers = [];
        for (let user in users) {
            if (users[user].banned) {
                users[user].banned = false;
                users[user].warning = 0;
                unbannedUsers.push(user);
            }
        }
        if (unbannedUsers.length > 0) {
            return conn.reply(m.chat, `Semua pengguna yang terbanned telah di-unban.`, m);
        } else {
            return conn.reply(m.chat, `Tidak ada pengguna yang terbanned.`, m);
        }
    }

    let who;
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else if (m.quoted && m.quoted.sender) {
            who = m.quoted.sender;
        } else if (args[0]) {
            who = args[0].replace(/[@+-]/g, '') + '@s.whatsapp.net';
        } else {
            return m.reply('Reply target yang akan di unban');
        }
    } else {
        if (args[0]) {
            who = args[0].replace(/[@+-]/g, '') + '@s.whatsapp.net';
        } else {
            who = m.chat;
        }
    }

    if (!users[who]?.banned) {
        return m.reply('Pengguna ini tidak dalam keadaan dibanned.');
    }
    users[who].banned = false;
    users[who].warning = 0;
    conn.reply(m.chat, 'Done!', m);
};

handler.help = ['unban'];
handler.tags = ['owner'];
handler.command = /^unban(user)?$/i;
handler.owner = true;
module.exports = handler;