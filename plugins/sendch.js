const baileys = require('@whiskeysockets/baileys');
const { MessageType, proto } = baileys;

let handler = async (m, { conn, args }) => {

    const channelId = '120363297027027445@newsletter'; 

    let pesan = args.join(' ');
    if (!pesan) return m.reply( '• *Contoh :* .sendch Hello');
const senderName = m.pushName
    const messages = {
        extendedTextMessage: {
            text: `${pesan}`,
            contextInfo: {
isForwarded: true, 
 forwardedNewsletterMessageInfo: {
 newsletterJid: '120363297027027445@newsletter', 
 newsletterName: 'Powered By ELL', 
 serverMessageId: -1
},
                externalAdReply: {
                    body: 'powered by ell',
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    thumbnailUrl: 'https://telegra.ph/file/3a34bfa58714bdef500d9.jpg',
                    sourceUrl: ''
                }
            }
        }
    };

    const messageToChannel = proto.Message.encode(messages).finish();
    const result = {
        tag: 'message',
        attrs: { to: channelId, type: 'text' },
        content: [
            {
                tag: 'plaintext',
                attrs: {},
                content: messageToChannel
            }
        ]
    };

    await conn.query(result);

    m.reply(`Berhasil Mengirim:\nPesan: ${pesan}\ntarget channel: ${channelId}`);
};

handler.help = ['sendch *<text>*'];
handler.tags = ['owner'];
handler.command = /^(sendch)$/i;
handler.owner = true;

module.exports = handler;