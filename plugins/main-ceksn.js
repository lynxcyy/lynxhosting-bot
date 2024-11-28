const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
const { createHash } = require('crypto');

let handler = async function(m, { conn, text, usedPrefix }) {
    let sn = createHash('md5').update(m.sender).digest('hex');

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `*Serial Number:*\n*${sn}*`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: wm
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                      }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "cta_copy",
                                "buttonParamsJson": `{\"display_text\":\"🔐 COPY SN\",\"id\":\"2\",\"copy_code\":\"${sn}\"}`
                            },
                        ],
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['ceksn'];
handler.tags = ['main'];
handler.command = ['ceksn'];
handler.register = true;
handler.limit = true;
module.exports = handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    console.log({ ms, h, m, s });
    return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}