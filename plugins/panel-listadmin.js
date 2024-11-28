const fetch = require('node-fetch');

let handler = async (m, { isOwner, args, conn, command, usedPrefix }) => {
    if (!isOwner) return m.reply(`Maaf, Anda tidak dapat melihat daftar pengguna.`);
    
    let page = args[0] ? args[0] : '1';
    const domain = 'https://panel.lynxbotapi.xyz';
    const dapikey = 'ptla_2Nx27RtDJQn7nTNizt1rqMjJZtvqVni9NmymI7heYg9';

    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${dapikey}`
            }
        });

        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut list admin:\n\n";

        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `ID: ${u.id} - Status: ${u.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
            }
        }

        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User: ${res.meta.pagination.count}`;

        await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat memuat daftar pengguna.');
    }
};
handler.help = ['listadmin']
handler.tags = ['panel']
handler.command = /^(listadmin)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;
