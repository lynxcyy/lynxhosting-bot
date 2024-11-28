let handler = async (m, { text, conn, isOwner, isAdmin, args }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
    }
    
    let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
    
    if (m.quoted) {
        if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
        
        let usr = m.quoted.sender;
        let nenen = await conn.groupParticipantsUpdate(m.chat, [usr], "promote");        
        if (nenen) m.reply(`@${usr.split('@')[0]} Sekarang Telah Menjadi Admin!`, m.chat, {
            mentions: [usr]
        });
        return;
    }
    if (!m.mentionedJid[0]) return m.reply(`Tag orang yang akan dijadikan admin!`);    
    let users = m.mentionedJid.filter(
        (u) => !(u == ownerGroup || u.includes(conn.user.jid))
    );    
    for (let user of users) {
        if (user.endsWith("@s.whatsapp.net")) {
            await conn.groupParticipantsUpdate(m.chat, [user], "promote");
            m.reply(`Sukses mempromosikan @${user.split('@')[0]}!`, m.chat, {
                mentions: [user]
            });
        }
    }
};

handler.help = ['promote @user']
handler.tags = ['group']
handler.command = /^(promo?te|admin|\^)$/i
handler.group = true
handler.botAdmin = true
handler.admin = true
module.exports = handler
