const axios = require('axios');

const API_TOKEN = global.dop;

const handler = async (m, { isOwner, args }) => {
    if (!isOwner) return m.reply('Maaf, Hanya Owner Yang Dapat Menggunakan Perintah Ini!');

    let dropletId = args[0];
    if (!dropletId) return m.reply('ID droplet belum diberikan.');

    const turnOffDroplet = async () => {
        try {
            const response = await axios.post(
                `https://api.digitalocean.com/v2/droplets/${dropletId}/actions`,
                {
                    type: 'power_off',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`,
                    },
                }
            );

            if (response.status === 201 && response.data.action && response.data.action.status === 'in-progress') {
                m.reply('VPS (Digital Ocean) Berhasil Dimatikan!.');
            } else {
                m.reply('Gagal mematikan VPS (Droplet).');
            }
        } catch (error) {
            m.reply(`Terjadi kesalahan saat mematikan VPS (Droplet): ${error.message}`);
        }
    };

    turnOffDroplet();
};

handler.command = 'ntid';

module.exports = handler;
