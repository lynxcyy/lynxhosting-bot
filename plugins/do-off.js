const fetch = require('node-fetch');

const API_TOKEN = global.dop;
const domain = 'https://api.digitalocean.com/v2';

let handler = async (m, { isOwner, conn }) => {
    if (!isOwner) return m.reply(`Maaf, Hanya Owner Yang Dapat Menggunakan Perintah Ini!`);

    try {
        const getDroplets = async () => {
            try {
                const response = await fetch(`${domain}/droplets`, {
                    headers: {
                        'Authorization': `Bearer ${API_TOKEN}`
                    }
                });
                const data = await response.json();
                return data.droplets || [];
            } catch (error) {
                throw new Error('Error fetching droplets: ' + error);
            }
        };

        const servers = await getDroplets();
        if (servers.length === 0) {
            return m.reply('Tidak ada droplet yang tersedia.');
        }

        let sections = [{
            title: 'Pilih Droplet Yang Akan Dimatikan',
            rows: servers.map(server => ({
                title: `ID: ${server.id} - Nama: ${server.name}`,
                description: `Status: ${server.status}`,
                id: `.ntid ${server.id}`
            }))
        }];

        let messageSections = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: 'Pilih Droplet',
                sections: sections
            })
        }];

        await conn.sendAIMessage(m.chat, messageSections, m, {
            header: 'Digital Ocean',
            content: 'Silakan pilih droplet yang akan dimatikan',
            footer: wm
        });
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat memuat daftar droplet.');
    }
};
handler.tags = 'vps'
handler.help = 'turnoff'
handler.command = /^turnoff$/i;

module.exports = handler;