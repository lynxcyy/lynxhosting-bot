const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
const { createHash } = require('crypto');

let handler = async (m, { conn }) => {
m.reply("Tunggu Sebentar Ya Kak...")
  const qris = 'https://telegra.ph/file/c51929d66c694f2e8f545.jpg';
  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url }
    }, { upload: conn.waUploadToServer });
    return imageMessage;
  }
  let sn = createHash('md5').update(m.sender).digest('hex');

  const qriss = await createImage(qris);

  const push = [
    {
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `MULTI PAYMENT\n- SUPPORT ALL WALLET\n- SUPPORT ALL BANK TRANSFER`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '`𝙇𝙔𝙉𝙓𝙃𝙊𝙎𝙏𝙄𝙉𝙂 `⚡'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: `QRIS`,
        hasMediaAttachment: true,
        imageMessage: qriss
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_copy",
            "buttonParamsJson": `{\"display_text\":\"SALIN SN\",\"id\":\"2\",\"copy_code\":\"081222844295\"}`
        }
        ]
      })
    },
  ];

  const bot = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: 'Silahkan Pilih Metode Pembayaran!'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: '`𝙇𝙔𝙉𝙓𝙃𝙊𝙎𝙏𝙄𝙉𝙂 `⚡'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: push
          })
        })
      }
    }
  }, {});

  await conn.relayMessage(m.chat, bot.message, {
    messageId: bot.key.id
  });
};

handler.help = ['donasi'];
handler.tags = ['info'];
handler.command = /^(donet|donasi|donate|payment)$/i;

module.exports = handler;