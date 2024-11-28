const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
const moment = require("moment-timezone");
const fetch = require('node-fetch');
const crypto = require('crypto');

const API_TOKEN = global.dop;

function generateRandomPassword(length = 8) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    function getRandomElement(set) {
        return set[Math.floor(Math.random() * set.length)];
    }

    let password = '';
    password += getRandomElement(lowercase);
    password += getRandomElement(digits);
    password += getRandomElement(uppercase);
    password += getRandomElement(lowercase);

    while (password.length < length - 1) {
        const charSet = lowercase + uppercase + digits + specialChars;
        password += getRandomElement(charSet);
    }
    password += getRandomElement(lowercase + uppercase);
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    if (uppercase.includes(password[0]) || uppercase.includes(password[password.length - 1])) {
        password = generateRandomPassword(length);
    }

    return password;
}

function mapRegion(input) {
    const regionMap = {
        sgp: 'sgp1',
        nyc: 'nyc1',
        ams: 'ams3',
        fra: 'fra1', 
        tor: 'tor1',
    };

    return regionMap[input.toLowerCase()] || input;
}

let handler = async (m, { conn, args, text, usedPrefix: _p, command, isOwner }) => {
    async function createImage(url) {
        const { imageMessage } = await generateWAMessageContent({
            image: { url }
        }, { upload: conn.waUploadToServer });
        return imageMessage;
    }

    const imageUrl1 = "https://telegra.ph/file/722f43c9399e3b2db415c.jpg";
    const imageMessage1 = await createImage(imageUrl1);

    const currentDateTime = moment.tz('Asia/Jakarta');
    let wktuwib = currentDateTime.format('HH:mm:ss');

    let d = new Date(new Date() + 3600000);
    let locale = 'id';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    if (['cvps'].includes(command.toLowerCase())) {
        if (!isOwner) return m.reply('Maaf, Hanya Owner Yang Dapat Menggunakan Perintah Ini!');
        
        let [ram, hostname, region, phone] = args;
        if (!ram || !hostname || !region || !phone) return m.reply('.cvps <ram> <hostname> <region> <nomor>\nContoh: .cvps 2gb ell sgp 6281xxxx');

        let u = phone.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        let password = generateRandomPassword();

        let size;
        switch (ram.toLowerCase()) {
            case '1gb':
                size = 's-1vcpu-1gb';
                break;
            case '2gb':
                size = 's-1vcpu-2gb';
                break;
            case '4gb':
                size = 's-2vcpu-4gb';
                break;
            case '8gb':
                size = 's-4vcpu-8gb';
                break;
            default:
                return m.reply('RAM yang didukung hanya 1GB, 2GB, 4GB, atau 8GB');
        }

        let mappedRegion = mapRegion(region);

        try {
            let dropletData = {
                name: hostname,
                region: mappedRegion,
                size: size,
                image: 'ubuntu-20-04-x64',
                ssh_keys: null,
                backups: false,
                ipv6: true,
                user_data: `#cloud-config\npassword: ${password}\nchpasswd: { expire: False }`,
                private_networking: null,
                volumes: null,
                tags: ['T'],
                project: 'panel cuy'
            };

            let response = await fetch('https://api.digitalocean.com/v2/droplets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                },
                body: JSON.stringify(dropletData)
            });

            let responseData = await response.json();

            if (response.ok) {
                let dropletConfig = responseData.droplet;
                let dropletId = dropletConfig.id;

                m.reply('Tunggu Sebentar...');
                await new Promise(resolve => setTimeout(resolve, 60000));

                let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`
                    }
                });

                let dropletData = await dropletResponse.json();
                let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia";

                let responseText = `*Hai @${u.split`@`[0]} Ini Data VPS Anda*
*DARI \`LYNX HOSTING\`⚡*

┏━  ⬣『 *DATA  VPS*  』⬣  ━┓
┣━━━━━━━━━━━━━━━━━━┓
┃ *ID :* ${dropletId}
┃ *IP VPS :* ${ipVPS}
┃ *USERNAME :* root
┃ *Password :* ${password}
┃ *CREATED BY :* ${m.pushName}
┃ *CREATED AT :* ${date} ${wktuwib}
┣━━━━━━━━━━━━━━━━━━┫
┗━━━━━━━━━━━━━━━━━━┛
*NOTES :*
- *JAGA BAIK² DATA VPS ANDA*
- *OWN HANYA MENGIRIM 1X DATA*
- *MASUK GROUP UNTUK INFO*
- *SS SERVER MENGGUNAKAN SSH DENGAN COMMAND .DONE <vps ram> <harga>*
- *HUB OWNER JIKA ADA KENDALA*
- *NO MINING*
- *JANGAN MEMAKSA KINERJA CPU 100% TERUS MENERUS!*
*LANGGAR? DI DELETE NO REFF*
*JANGAN LUPA UNTUK MENGGANTI PASSWORD VPS ANDA*`;

                let msg = generateWAMessageFromContent(m.chat, {
                    viewOnceMessage: {
                        message: {
                            "messageContextInfo": {
                                "deviceListMetadata": {},
                                "deviceListMetadataVersion": 2
                            },
                            interactiveMessage: proto.Message.InteractiveMessage.create({
                                body: proto.Message.InteractiveMessage.Body.create({
                                    text: responseText
                                }),
                                footer: proto.Message.InteractiveMessage.Footer.create({
                                    text: '`LYNX HOSTING`⚡'
                                }),
                                header: proto.Message.InteractiveMessage.Header.create({
                                    title: "THANKS FOR ORDER!",
                                    subtitle: "",
                                    hasMediaAttachment: true,
                                    imageMessage: imageMessage1
                                }),
                                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                    buttons: [
                                        {
                                            "name": "cta_copy",
                                            "buttonParamsJson": `{\"display_text\":\"🔐 COPY ID\",\"id\":\"1\",\"copy_code\":\" ${dropletId}\"}`
                                        },
                                        {
                                            "name": "cta_copy",
                                            "buttonParamsJson": `{\"display_text\":\"🔐 COPY IP VPS\",\"id\":\"2\",\"copy_code\":\"${ipVPS}\"}`
                                        },
                                        {
                                            "name": "cta_copy",
                                            "buttonParamsJson": `{\"display_text\":\"🔐 COPY PASSWORD\",\"id\":\"3\",\"copy_code\":\"${password}\"}`
                                        }
                                    ],
                                })
                            })
                        }
                    }
                }, {});

                await conn.relayMessage(u, msg.message, { messageId: msg.key.id });
                await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

            } else {
                throw new Error(`Gagal membuat VPS: ${responseData.message}`);
            }
        } catch (err) {
            console.error(err);
            m.reply(`Terjadi kesalahan saat membuat VPS: ${err}`);
        }
    }
};
handler.tags = 'vps'
handler.help = ["cvps <ram> <hostname> <region> <buyer>"];
handler.command = /^(cvps)$/i;

module.exports = handler;