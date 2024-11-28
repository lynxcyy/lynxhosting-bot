const fetch = require('node-fetch');

const API_TOKEN = dop

let handler = async (m, { isOwner }) => {
    if (!isOwner) return m.reply('Maaf, Anda tidak dapat mengakses daftar droplet.');

    try {
        const getDroplets = async () => {
            try {
                const response = await fetch('https://api.digitalocean.com/v2/droplets', {
                    headers: {
                        Authorization: "Bearer " + API_TOKEN
                    }
                });
                const data = await response.json();
                return data.droplets || [];
            } catch (error) {
                m.reply('Error fetching droplets: ' + error);
                return [];
            }
        };

        getDroplets().then(droplets => {
            let totalvps = droplets.length;
            let responseText = `*List Droplet Digital Ocean Anda: ${totalvps}*\n\n`;

            if (droplets.length === 0) {
                responseText += 'Tidak ada Droplet yang tersedia.';
            } else {
                droplets.forEach(droplet => {
                    const ipv4Addresses = droplet.networks.v4.filter(network => network.type === "public");
                    const ipAddress = ipv4Addresses.length > 0 ? ipv4Addresses[0].ip_address : 'Tidak ada IP';
                    responseText += `*ID:* ${droplet.id}\n*Hostname:* ${droplet.name}\n*Username Login:* root\n*IP:* ${ipAddress}\n*RAM:* ${droplet.memory} MB\n*CPU:* ${droplet.vcpus} CPU\n*OS:* ${droplet.image.distribution}\n*Storage:* ${droplet.disk} GB\n*Status:* ${droplet.status}\n\n`;
                });
            }
            m.reply(responseText);
        });
    } catch (err) {
        m.reply('Terjadi kesalahan saat mengambil data droplet: ' + err);
    }
};
handler.tags = 'vps'
handler.help = 'listdroplet'
handler.command = /^listdroplet|listdrop$/i;


module.exports = handler;