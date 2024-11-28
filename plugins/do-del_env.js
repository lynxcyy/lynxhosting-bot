const fetch = require('node-fetch');

const API_TOKEN = global.dop;

let handler = async (m, { isOwner, args }) => {
    if (!isOwner) return m.reply('Maaf, Hanya Owner Yang Dapat Menggunakan Perintah Ini!');

    let dropletId = args[0];
    if (!dropletId) return m.reply('ID droplet belum diberikan.');

    let deleteDroplet = async () => {
        try {
            let response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (response.ok) {
                m.reply('Droplet berhasil dihapus.');
            } else {
                const errorData = await response.json();
                return m.reply(`Gagal menghapus droplet: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat menghapus droplet:', error);
            m.reply('Terjadi kesalahan saat menghapus droplet.');
        }
    };

    deleteDroplet();
};

handler.command = /^dodel$/i

module.exports = handler;