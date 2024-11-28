let handler = async (m, { text, conn, isOwner, isAdmin, args }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
    }

    let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";

    if (m.quoted) {
        if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;

        let usr = m.quoted.sender;
        let nenen = await conn.groupParticipantsUpdate(m.chat, [usr], "demote");

        if (nenen) m.reply(`Sukses demote @${usr.split('@')[0]}!`, m.chat, {
            mentions: [usr]
        });
        return;
    }

    if (!m.mentionedJid[0]) return m.reply(`Tag orang yang akan di-unadmin!`);

    let users = m.mentionedJid.filter(
        (u) => !(u == ownerGroup || u.includes(conn.user.jid))
    );

    for (let user of users) {
        if (user.endsWith("@s.whatsapp.net")) {
            await conn.groupParticipantsUpdate(m.chat, [user], "demote");
            m.reply(`@${user.split('@')[0]} Mampus Dicopot Admin nya🗿`, m.chat, {
                mentions: [user]
            });
        }
    }
};

handler.help = ['demote @user']
handler.tags = ['group']
handler.command = /^(demo?te|member|\↓)$/i
handler.group = true
handler.botAdmin = true
handler.admin = true
handler.register = true;
handler.limit = true;

module.exports = handler
