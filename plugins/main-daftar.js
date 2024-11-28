const { createHash } = require('crypto');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

async function createImage(url, conn) {
    const { imageMessage } = await generateWAMessageContent({
        image: { url }
    }, { upload: conn.waUploadToServer });
    return imageMessage;
}

let handler = async function (m, { conn, text, usedPrefix, command }) {
    const imageUrl1 = "https://telegra.ph/file/51033b3c3a3ce954ea593.png";
    let imageMessage1 = await createImage(imageUrl1, conn);

    let name = conn.getName(m.sender);
    let parts = text.split(".");
    let inputName = parts[0];
    let age = parts[1];
    let sn = createHash('md5').update(m.sender).digest('hex');
    conn.register = conn.register ? conn.register : {};
    let user = global.db.data.users[m.sender];

    if (user.registered === true) {
            const soad = [{
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Unregister & hapus semua database',
                    id: `${usedPrefix}unreg ${sn}`
                })
            }]
            conn.sendAIMessage(m.chat, soad, m, {
                content: 'Nomor kamu sudah teregistrasi didalam database✅\nJika ingin unregister silahkan ketuk tombol dibawah!',
                footer: global.set.footer,
            })
            return
        }

    if (!text) {
        return m.reply(`Untuk mendaftar manual silahkan ketik\n${usedPrefix + command} nama.umur\nContoh Penggunaan\n• ${usedPrefix + command} ${name}.25\n*Jangan lupa untuk menggunakan tanda titik ya kak karena itu untuk pemisah antara nama dan umur kakak🥰*`);
    }

    if (!inputName) {
        return m.reply(`Silahkan Masukan Nama Dan Umur\nContoh Penggunaan ${usedPrefix + command} ${name}.25`);
    }

    if (!age || isNaN(age)) {
        return m.reply(`Silahkan Masukan Umur Setelah Tanda Titik Dan Umur Hanya Boleh Diisi Dengan Angka!`);
    }

    age = parseInt(age);

    if (age > 30) {
        return m.reply('Tua Banget anying🗿');
    }

    if (age < 18) {
        return m.reply('Bocil Dilarang Main Disini🥰');
    }

    m.reply(`\t╭─「 ACCOUNT INFO 」
\t│Name: ${inputName}
\t│Age: ${age} years
\t╰───────
Are you sure about your information?
Type Y to continue
Type N to cancel`);

    conn.register[m.sender] = {
        status: 'PROCESS',
        name: inputName,
        age: age,
        sn: sn,
    };
};

handler.before = async function (m, { conn, usedPrefix, command }) {
    conn.register = conn.register ? conn.register : {};

    if (!m.text) return;
    if (!conn.register[m.sender]) return;

    let user = global.db.data.users[m.sender];
    if (user.registered === true) return;

    let registrationData = conn.register[m.sender];
    if (m.text === "Y") {
        user.limit += 50;
        user.exp += 10000;
        user.money += 5000;
        user.name = registrationData.name;
        user.age = registrationData.age;
        user.regTime = +new Date();
        user.sn = registrationData.sn;
        user.registered = true;

        let responseText = `*✅ Verifikasi Berhasil*\n\n┌  ◦ *ɴᴀᴍᴇ* : ${registrationData.name}\n│  ◦ *ɴᴜᴍʙᴇʀ* : ${m.sender.split("@")[0]}\n│  ◦ *ᴀɢᴇ* : ${registrationData.age} years\nᴄᴏɴɢʀᴀᴛꜱ! ʏᴏᴜ'ᴠᴇ ᴇᴀʀɴᴇᴅ ꜰʀᴏᴍ ʀᴇɢɪꜱᴛᴇʀ\n🎫ʟɪᴍɪᴛ 50\n✨ᴇxᴘ 10000\n💰ᴍᴏɴᴇʏ 5000!`;

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
                            text: wm
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: "THANKS FOR REGISTER✨!",
                            subtitle: "",
                            hasMediaAttachment: true,
                            imageMessage: await createImage("https://telegra.ph/file/51033b3c3a3ce954ea593.png", conn)
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    "name": "cta_copy",
                                    "buttonParamsJson": `{\"display_text\":\"🔐 COPY SN\",\"id\":\"2\",\"copy_code\":\"${registrationData.sn}\"}`
                                },
                                {
                                 "name": "quick_reply",
                                 "buttonParamsJson": `{\"display_text\":\"☰ Menu\",\"id\":\".menu\"}`
                               },
                            ],
                        })
                    })
                }
            }
        }, {});
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        delete conn.register[m.sender];
    } else if (m.text === "N") {
        m.reply('❌ Pendaftaran dibatalkan');
        delete conn.register[m.sender];
    } else {
        m.reply('❕ Pilih Y/N');
    }
};

handler.help = ['daftar'];
handler.tags = ['main'];
handler.command = ['register', 'reg', 'daftar'];

module.exports = handler;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}