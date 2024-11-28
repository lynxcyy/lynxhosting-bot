const fetch = require('node-fetch');

let handler = async (m, { isOwner, args }) => {
    if (!isOwner) {
        return m.reply(`Maaf, Anda tidak dapat menggunakan perintah ini.`);
    }
    const domain = 'https://panel.lynxbotapi.xyz';
    const dapikey = 'ptla_2Nx27RtDJQn7nTNizt1rqMjJZtvqVni9NmymI7heYg9';
    try {
        let f = await fetch(`${domain}/api/application/servers?page=1`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${dapikey}`
            }
        });
        if (!f.ok) {
            throw new Error('Gagal mengambil daftar server.');
        }
        let res = await f.json();
        let servers = res.data;
        let sections = [{
            title: "Pilih Server untuk Di Unsuspend",
            rows: []
        }];

        for (let server of servers) {
            let s = server.attributes;

            sections[0].rows.push({
                title: `${s.name}`,
                description: `ID: ${s.id}`,
                id: `.anus ${s.id}`
            });
        }
        let messageSections = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: `Daftar Server`,
                sections: sections
            })
        }];

        await conn.sendAIMessage(m.chat, messageSections, m, {
            header: 'ʟʏɴxʙᴏᴛ',
            content: 'Silakan Pilih Server Untuk Di Unsuspend:',
            footer: 'Powered By ELL'
        });

    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat memuat daftar server.');
    }
};
handler.tags = ['panel']
handler.help = ['unsuspend']
handler.command = 'unsuspend', 'unsus';
handler.owner = true;
handler.register = true;

module.exports = handler;