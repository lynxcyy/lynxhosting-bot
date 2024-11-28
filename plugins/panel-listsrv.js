const fetch = require('node-fetch');

let handler = async (m, { isOwner, args, conn, command, usedPrefix }) => {
    if (!isOwner) return m.reply(`Maaf, Anda tidak dapat melihat daftar server.`);
    let page = args[0] ? args[0] : '1';
    const domain = 'https://panel.lynxbotapi.xyz';
    const dapikey = 'ptla_2Nx27RtDJQn7nTNizt1rqMjJZtvqVni9NmymI7heYg9';
    const capikey = 'ptlc_i7kc8k0MVq6oBVw81syNmsCXIHQFDec4fWHhRS4oRDi';

    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${dapikey}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let sections = [{
            title: "List Servers Panel",
            rows: []
        }];

        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${capikey}`
                }
            });

            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            sections[0].rows.push({
                title: `ID: ${s.id} - Status: ${status}`,
                description: s.name,
                id: `.delsrv ${s.id}`
            });
        }

        let messageSections = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
                sections: sections
            })
        }];

        await conn.sendAIMessage(m.chat, messageSections, m, {
            header: 'ʟʏɴxʙᴏᴛ',
            content: 'Daftar Server:',
            footer: 'Powered By ELL'
        });

        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
            m.reply(`Gunakan perintah ${usedPrefix}listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
        }
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat memuat daftar server.');
    }
};
handler.help = ['listserver']
handler.tags = ['panel']
handler.command = /^(list(srv|server))$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;
