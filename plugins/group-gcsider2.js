let handler = async (m, { conn, text, groupMetadata }) => {
    await conn.sendPresenceUpdate('composing', m.chat);
    var lama = 86400000 * 7;
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    const milliseconds = new Date(now).getTime();

    let member = groupMetadata.participants.map(v => v.id);
    if (!text) {
        var pesan = "🚩 Please be active in the group because there will be member cleaning at any time";
    } else {
        var pesan = text;
    }
    var total = 0;
    var sider = [];
    for (let i = 0; i < member.length; i++) {
        let users = m.isGroup ? groupMetadata.participants.find(u => u.id == member[i]) : {};
        if ((typeof global.db.data.users[member[i]] == 'undefined' || milliseconds * 1 - global.db.data.users[member[i]].lastseen > lama) && !users.isAdmin && !users.isSuperAdmin) {
            if (typeof global.db.data.users[member[i]] !== 'undefined') {
                if (global.db.data.users[member[i]].banned == true) {
                    total++;
                    sider.push(member[i]);
                }
            } else {
                total++;
                sider.push(member[i]);
            }
        }
    }

    if (total == 0) return conn.reply(m.chat, `🚩 *There are no siders in this group.*`, m);

    let rows = sider.map(v => ({
        title: `@${v.replace(/@.+/, '')}`,
        description: `${typeof global.db.data.users[v] == "undefined" ? 'Sider' : 'Off ' + msToDate(milliseconds * 1 - global.db.data.users[v].lastseen)}`,
	id: `.kick @${v}`, 
	v: v
    }));

    let sections = [{
        title: `List Siders in ${await conn.getName(m.chat)}`,
        rows: rows
    }];

    let messageSections = [{
        name: 'single_select',
        buttonParamsJson: JSON.stringify({
            title: `Total: ${total}`,
            sections: sections
        })
    }];

    await conn.sendAIMessage(m.chat, messageSections, m, {
        header: 'ʟʏɴxʙᴏᴛ',
        content: `*${total}/${member.length}* group members are siders due to:\n1. Inactive for more than 7 days\n2. Just joined but never active\n\n"${pesan}"`,
        footer: 'Powered By ELL'
    });
};

handler.help = ['gcsider2'];
handler.tags = ['group'];
handler.command = /^(gcsider2)$/i;
handler.group = true;
handler.register = true;

module.exports = handler;

function msToDate(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    if (d == 0 && h == 0 && m == 0) {
        return "Just Now";
    } else {
        return [d, 'd ', h, 'h '].map(v => v.toString().padStart(2, '0')).join('');
    }
}

