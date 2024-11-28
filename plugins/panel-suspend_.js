const fetch = require('node-fetch');

const handler = async (m, { isOwner, args, conn, command, usedPrefix }) => {
    if (!isOwner) {
        return m.reply(`Maaf, Anda tidak dapat melakukan operasi ini.`);
    }

    const serverId = args[0];
    if (!serverId) {
        return m.reply('Silakan masukkan ID server yang ingin disuspend.');
    }

    const domain = 'https://panel.lynxbotapi.xyz';
    const dapikey = 'ptla_2Nx27RtDJQn7nTNizt1rqMjJZtvqVni9NmymI7heYg9';

    try {
        const response = await fetch(`${domain}/api/application/servers/${serverId}/suspend`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${dapikey}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? errorData.errors[0].title : 'Gagal menanggapi permintaan.');
        }

        await m.reply('*Server berhasil disuspend.*');
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat melakukan operasi.');
    }
};
handler.command = /^ngtd$/i;
module.exports = handler;
