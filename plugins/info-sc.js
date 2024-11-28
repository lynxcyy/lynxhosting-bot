let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require ('@whiskeysockets/baileys')
let moment = require ('moment-timezone')
let fetch = require ('node-fetch')
let fs = require ('fs')
let handler = async (m, { conn, args, usedPrefix, command }) => {
const messa = await prepareWAMessageMedia({ image: fs.readFileSync('./media/thumbnail.jpg') }, { upload: conn.waUploadToServer })
const catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"productMessage": {
"product": {
"productImage": messa.imageMessage, 
"productId": "26055212004070172",
"title": `SCRIPT BOT MERAH LYNX MD`,
"description": `SCRIPT BOT MERAH LYNX MD`,
"currencyCode": "IDR",
"bodyText": wm,
"footerText": wm,
"priceAmount1000": "65000000",
"productImageCount": 3,
"firstImageId": 1,
"salePriceAmount1000": "50000000",
"retailerId": wm,
"url": "wa.me/6281222844295"
},
"businessOwnerJid": "6282211801357@s.whatsapp.net",
}
}), { userJid: m.chat, quoted: m })    

conn.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id })
}
handler.help = ['sc']
handler.tags = ['info']
handler.command = /^(sc)$/i

handler.limit = true
module.exports = handler