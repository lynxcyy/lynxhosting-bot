const fetch = require('node-fetch');

const API_TOKEN = 'c0db1699f7b20d902eed0e915514fe1d';
const ZONE_ID = 'ae41c7b345e8ef4b153d6a2a51d9d4e5';
const domain = 'https://api.cloudflare.com/client/v4';

const getSubdomains = async () => {
    try {
        const response = await fetch(`${domain}/zones/${ZONE_ID}/dns_records`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.result || [];
    } catch (error) {
        throw new Error('Error fetching subdomains: ' + error);
    }
};

let handler = async (m, { isOwner, conn }) => {
    if (!isOwner) return m.reply(`Maaf, Hanya Owner Yang Dapat Menggunakan Perintah Ini!`);

    try {
        const subdomains = await getSubdomains();
        if (subdomains.length === 0) {
            return m.reply('Tidak ada subdomain yang tersedia.');
        }

        let sections = [{
            title: 'Pilih Subdomain untuk Dihapus',
            rows: subdomains.map(subdomain => ({
                title: `ID: ${subdomain.id} - Nama: ${subdomain.name}`,
                description: `Tipe: ${subdomain.type}`,
                id: `.dodel ${subdomain.id}`
            }))
        }];

        let messageSections = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: 'Pilih Subdomain',
                sections: sections
            })
        }];

        await conn.sendAIMessage(m.chat, messageSections, m, {
            header: 'Panel Subdomain',
            content: 'Silakan pilih subdomain yang ingin Anda hapus.',
            footer: 'Powered by LynxBot'
        });
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan saat memuat daftar subdomain.');
    }
};

handler.tags = 'subdo'
handler.help = 'delsub'
handler.command = /^(delete|hapus|del)subdomain$/i;

module.exports = handler;