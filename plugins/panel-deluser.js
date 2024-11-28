const fetch = require('node-fetch');

let handler = async (m, { isOwner, args, conn, command, usedPrefix }) => {
    if (!isOwner) return m.reply(`Maaf, hanya pemilik yang dapat menghapus pengguna.`);
    
    let usr = args[0];
    if (!usr) return m.reply('ID nya mana?');

    const domain = 'https://panel.lynxbotapi.xyz';
    const dapikey = 'ptla_2Nx27RtDJQn7nTNizt1rqMjJZtvqVni9NmymI7heYg9';

    try {
        let f = await fetch(`${domain}/api/application/users/${usr}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${dapikey}`
            }
        });

        let res = f.ok ? { errors: null } : await f.json();
        if (res.errors) return m.reply('*USER NOT FOUND*');
        m.reply('*SUCCESSFULLY DELETE THE USER*');
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat menghapus pengguna.');
    }
};
handler.tags = ['panel']
handler.help = ['deluser']
handler.command = /^(delusr|deluser)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;
