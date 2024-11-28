const axios = require('axios');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

const handler = async (m, { text, conn }) => {
  if (!text) return m.reply('Masukan Gambar Yang akan dicari!');
  await m.reply('Sedang diproses...');
  let [query, count] = text.split('|');
  query = query.trim();
  count = count ? parseInt(count.trim()) : 2;

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url }
    }, { upload: conn.waUploadToServer });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let push = [];
  let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
  let res = data.resource_response.data.results.map(v => v.images.orig.url);

  shuffleArray(res);
  let ult = res.splice(0, count);
  for (let i = 0; i < ult.length; i++) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Image ke - ${i + 1}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: wm,
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: `Hasil dari ${query}`,
        hasMediaAttachment: true,
        imageMessage: await createImage(ult[i])
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": `{"display_text":"Source","url":"https://www.pinterest.com/search/pins/?rs=typed&q=${query}","merchant_url":"https://www.pinterest.com/search/pins/?rs=typed&q=${query}"}`
          }
        ]
      })
    });
  }

  const bot = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: 'Selesai!'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm,
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [...push]
          })
        })
      }
    }
  }, {});

  await conn.relayMessage(m.chat, bot.message, {
    messageId: bot.key.id
  });
};
handler.tags = ['internet'];
handler.help = 'pinterest'
handler.command = ['pinterest', 'pin'];
handler.register = true;
handler.limit = true;
module.exports = handler;