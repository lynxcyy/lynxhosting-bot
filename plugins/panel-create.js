const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
const moment = require("moment-timezone");
const fetch = require('node-fetch');
const crypto = require('crypto');
const { sizeFormatter } = require('human-readable');
const format = sizeFormatter();

let handler = async (m, { conn, args, text, usedPrefix: _p, command, isOwner }) => {
    const linkgc = "https://chat.whatsapp.com/Bpzg40FTgYa9trttCoFEKi";
    const InfinitySymbol = "∞"; 
    
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
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const domain = global.domain
    const apikey = global.papikey
    if (['cp', 'createpanel', 'cpanel'].includes(command.toLowerCase())) {
        if (!isOwner) return m.reply('Hanya pemilik yang bisa menggunakan perintah ini.');
        
        let t = text.split(',');
        if (t.length < 5) return m.reply(`*Format salah!*\nPenggunaan:\n${_p}${command} <ram> <disk> <cpu> <user> <nomer>`);
        
        let [ramText, diskText, cpuText, username, phone] = t.map(item => item.trim());
        let u = m.quoted ? m.quoted.sender : phone ? phone.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
        if (!u) return m.reply('Pengguna tidak ditemukan.');
        
        let ram = convertToMegabytes(ramText);
        let disk = convertToMegabytes(diskText);
        let cpu = parseInt(cpuText); 
        let name = username;
        let egg = "15";
        let loc = "1";
        let email = username + "@gmail.com";
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = d.exists ? crypto.randomBytes(5).toString('hex') : (t[5] ? t[5] : crypto.randomBytes(5).toString('hex'));
        
        // Create User
        let f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey,
            },
            	body: JSON.stringify({
                email: email,
                username: username,
                first_name: username,
                last_name: username,
                language: "en",
                password: password.toString()
            })
        });
        
        let data = await f.json();
        if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
        
        let user = data.attributes;
        let startup_cmd = "SILAHKAN START SERVER, DAN JALANKAN SEMUA PERINTAH DI TERMINAL !!"; 
        let memo = ram; 
        
        let f3;
        try {
            f3 = await fetch(domain + "/api/application/servers", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey,
                },
                body: JSON.stringify({
                    name: name,
                    description: date,
                    user: user.id,
                    egg: parseInt(egg),
                    docker_image: "registry.gitlab.com\/d1tzy\/zercode:latest",
                    startup: startup_cmd,
                    environment: {
                        "INST": "npm",
                        "USER_UPLOAD": "0",
                        "AUTO_UPDATE": "0",
                        "CMD_RUN": "SILAHKAN START SERVER, DAN JALANKAN SEMUA PERINTAH DI TERMINAL !!"
                    },
                    limits: {
                        memory: memo,
                        swap: 0,
                        disk: disk,
                        io: 500,
                        cpu: cpu
                    },
                    feature_limits: {
                        databases: 5,
                        backups: 5,
                        allocations: 1
                    },
                    deploy: {
                        locations: [parseInt(loc)],
                        dedicated_ip: false,
                        port_range: [],
                    },
                })
            });
            let resText = await f3.text();
            console.log(resText); // Log the raw response text
            let res = JSON.parse(resText); // Parse the response as JSON

            if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
            
            let server = res.attributes;

            let responseText = `Hai @${u.split('@')[0]} Ini Data Panel Anda
DARI \`LYNX HOSTING\`⚡
┏━  ⬣『 DATA  AKUN  』⬣  ━┓
┣━━━━━━━━━━━━━━━━━━┓
┃ Email : ${email}
┃ Username : ${user.username}
┃ Password : ${password.toString()}
┃ Ram : ${ram === 0 ? InfinitySymbol : ram} MB
┃ Disk : ${disk === 0 ? InfinitySymbol : disk} MB
┃ CPU : ${cpu === 0 ? InfinitySymbol : cpu}%
┃ Created : ${m.pushName}
┃ Hari : ${date}
┃ Jam : ${wktuwib}
┣━━━━━━━━━━━━━━━━━━┫
┗━━━━━━━━━━━━━━━━━━┛
PROFIT :
- BISA GANTI GANTI SC
- BOT DAPAT ON 24 JAM
- WEB CLOSE BOT ON
- GAK BOROS KUOTA
- GAK ABISIN RAM HP
- GARANSI 30 DAY
NOTES :
- JAGA BAIK² DATA PANEL ANDA
- OWN HANYA MENGIRIM 1X DATA
- MASUK GROUP UNTUK INFO
- SS PANEL DENGAN COMMAND .DONE <ram> <harga>
- HUB OWNER JIKA ADA KENDALA
- NO RUN SC DDOS
- NO DDOS DOMAIN
- NO SEBAR DOMAIN
LANGGAR? DI DELETE NO REFF
*JANGAN LUPA UNTUK MENGGANTI PASSWORD PANEL ANDA*`;

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
                                        "name": "cta_url",
                                        "buttonParamsJson": `{\"display_text\":\"🌐 LINK LOGIN\",\"url\":\"${domain}\",\"merchant_url\":\"https://www.google.com\"}`
                                    },
                                    {
                                        "name": "cta_copy",
                                        "buttonParamsJson": `{\"display_text\":\"📛 COPY USERNAME\",\"id\":\"1\",\"copy_code\":\"${user.username}\"}`
                                    },
                                    {
                                        "name": "cta_copy",
                                        "buttonParamsJson": `{\"display_text\":\"🔐 COPY PASSWORD\",\"id\":\"2\",\"copy_code\":\"${password.toString()}\"}`
                                    }
                                ],
                            })
                        })
                    }
                }
            }, {});

            await conn.relayMessage(u, msg.message, { messageId: msg.key.id });
            await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        } catch (err) {
            console.log(err);
            m.reply(`Terjadi kesalahan saat membuat server: ${err.message}`);
        }
    }

    function convertToMegabytes(value) {
        if (value.toLowerCase().endsWith("gb")) {
            return parseInt(value) * 1024;
        } else if (value.toLowerCase().endsWith("mb")) {
            return parseInt(value);
        } else {
            return parseInt(value);
        }
    }
};

handler.help = ['cpanel <ram>,<disk>,<cpu>,<username>,<nomer>'];
handler.tags = ['owner'];
handler.command = /^cp$/i;

module.exports = handler;
