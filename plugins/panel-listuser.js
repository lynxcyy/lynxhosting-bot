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

        let messageText = `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        let totalUsr = `Total Users: ${res.meta.pagination.count}`;

        let sections = [{
            title: "List Users Panel",
            rows: users.map(a => ({
                title: `ID: ${a.attributes.id} - Status: ${a.attributes.server_limit === null ? 'Inactive' : 'Active'}`,
                description: a.attributes.username,
                id: `.delusr ${a.attributes.id}`
            }))
        }];

        let messageSections = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: messageText,
                sections: sections
            })
        }];

        await conn.sendAIMessage(m.chat, messageSections, m, {
            header: 'ʟʏɴxʙᴏᴛ',
            content: totalUsr,
            footer: 'Powered By ELL'
        });

        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
            m.reply(`Gunakan perintah ${usedPrefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
        }
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat memuat daftar pengguna.');
    }
};
handler.help = ['listuser']
handler.tags = ['panel']
handler.command = /^(listusr|listuser)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;
