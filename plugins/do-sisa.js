const axios = require('axios');

const API_TOKEN = global.dop

const handler = async (m, { isOwner }) => {
    const getDropletInfo = async () => {
        try {
            const accountResponse = await axios.get('https://api.digitalocean.com/v2/account', {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            });

            const dropletsResponse = await axios.get('https://api.digitalocean.com/v2/droplets', {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            });

            if (accountResponse.status === 200 && dropletsResponse.status === 200) {
                const dropletLimit = accountResponse.data.account.droplet_limit;
                const dropletsCount = dropletsResponse.data.droplets.length;
                const remainingDroplets = dropletLimit - dropletsCount;

                return {
                    dropletLimit,
                    remainingDroplets,
                    totalDroplets: dropletsCount,
                };
            } else {
                throw new Error('Gagal mendapatkan data akun DigitalOcean atau droplet.');
            }
        } catch (error) {
            throw error;
        }
    };

    const sisadropletHandler = async () => {
        try {
            const dropletInfo = await getDropletInfo();
            m.reply(`\t\t\t		I N F O - D O\n╭୧⍤⃝───────────┈◦•◦❥•◦\n│⩽⩾• DROPLET YANG DIPAKAI : ${dropletInfo.totalDroplets}\n│⩽⩾• SISA DROPLET: ${dropletInfo.remainingDroplets}\n│⩽⩾• TOTAL DROPLET : ${dropletInfo.dropletLimit}\n꒰⚘݄꒱₊_____________________˓˓ ⍥⃝⃝ ˒˒`);
        } catch (error) {
            m.reply(`Terjadi kesalahan: ${error.message}`);
        }
    };

    sisadropletHandler();
};

handler.command = 'sisadroplet';
handler.tags = ['vps'];

module.exports = handler;
