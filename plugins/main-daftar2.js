const { createHash } = require('crypto');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
const fetch = require('node-fetch');

async function createImage(url, conn) {
    const { imageMessage } = await generateWAMessageContent({
        image: { url }
    }, { upload: conn.waUploadToServer });
    return imageMessage;
}

let handler = async function(m, { conn, text, usedPrefix }) {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let sn = createHash('md5').update(m.sender).digest('hex');;

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

    user.regTime = +new Date();
    user.registered = true;
    let age = getRandomInt(15, 25);
    user.age = age;
    user.limit += 50;
    user.exp += 10000;
    user.money += 5000;

    let responseText = `*✅ Verifikasi Berhasil*\n\n┌  ◦ *ɴᴀᴍᴇ* : ${name}\n│  ◦ *ɴᴜᴍʙᴇʀ* : ${m.sender.split("@")[0]}\n│  ◦ *ᴀɢᴇ* : ${age} years\nᴄᴏɴɢʀᴀᴛꜱ! ʏᴏᴜ'ᴠᴇ ᴇᴀʀɴᴇᴅ ꜰʀᴏᴍ ʀᴇɢɪꜱᴛᴇʀ\n🎫ʟɪᴍɪᴛ 50\n✨ᴇxᴘ 10000\n💰ᴍᴏɴᴇʏ 5000!`;

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
                                "buttonParamsJson": `{\"display_text\":\"🔐 COPY SN\",\"id\":\"2\",\"copy_code\":\"${sn}\"}`
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
};

handler.help = ['verify'];
handler.tags = ['main'];
handler.command = /^(verify)$/i;

module.exports = handler;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}