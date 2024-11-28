const fetch = require('node-fetch');

let handler = async (m, { isOwner, args, conn, command, usedPrefix }) => {
    if (!isOwner) return m.reply('Maaf, hanya ELL yang dapat menghapus server.');
    let srv = args[0];
    if (!srv) return m.reply('ID nya mana?');

    const domain = 'https://panel.lynxbotapi.xyz';
    const dapikey = 'ptla_2Nx27RtDJQn7nTNizt1rqMjJZtvqVni9NmymI7heYg9';

    try {
        let f = await fetch(`${domain}/api/application/servers/${srv}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${dapikey}`
            }
        });

        let res = f.ok ? { errors: null } : await f.json();
        if (res.errors) return m.reply('*SERVER NOT FOUND*');
        m.reply('*SUCCESSFULLY DELETE THE SERVER*');
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat menghapus server.');
    }
};
handler.tags = ['panel']
handler.help = ['delserver']
handler.command = /^(delsrv|delserver)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;
