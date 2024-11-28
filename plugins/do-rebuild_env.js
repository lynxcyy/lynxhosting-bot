const fetch = require('node-fetch');

const API_TOKEN = global.dop

const handler = async (m, { isOwner, args }) => {
    if (!isOwner) return m.reply(`Maaf, Hanya Owner Yang Dapat Menggunakan Perintah Ini!`);

    let dropletId = args[0];
    if (!dropletId) return m.reply('ID droplet belum diberikan.');

    const rebuildVPS = async () => {
        try {
            const response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}/actions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                },
                body: JSON.stringify({
                    type: 'rebuild',
                    image: 'ubuntu-20-04-x64'
                })
            });

            if (response.ok) {
                const data = await response.json();
                m.reply(`Rebuild VPS berhasil dimulai. Status aksi: ${data.action.status}`);

                const vpsInfo = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`
                    }
                });

                if (vpsInfo.ok) {
                    const vpsData = await vpsInfo.json();
                    const droplet = vpsData.droplet;
                    const ipv4Addresses = droplet.networks.v4.filter(network => network.type === 'public');
                    const ipAddress = ipv4Addresses.length > 0 ? ipv4Addresses[0].ip_address : 'Tidak ada IP';

                    const textvps = `*VPS SUKSES REBUILD*\nIP VPS: ${ipAddress}\nSYSTEM IMAGE: ${droplet.image.slug}`;
                    setTimeout(() => {
                        m.reply(textvps);
                    }, 60000);
                } else {
                    m.reply('Gagal mendapatkan informasi VPS setelah rebuild.');
                }
            } else {
                const errorData = await response.json();
                m.reply(`Gagal melakukan rebuild VPS: ${errorData.message}`);
            }
        } catch (error) {
            m.reply(`Terjadi kesalahan saat melakukan rebuild VPS: ${error}`);
        }
    };

    rebuildVPS();
};

handler.command = 'rbil';

module.exports = handler;