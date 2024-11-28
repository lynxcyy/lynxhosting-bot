const fs = require('fs');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  const caption = `
▧「 *B A N K  U S E R* 」
│ 👤 Name: ${user.registered ? user.name : conn.getName(m.sender)}
│ ${rpg.emoticon('atm')} Atm: ${user.atm > 0 ? 'Level ' + user.atm : '✖️'}
│ ${rpg.emoticon('bank')} Bank: ${user.bank} / ${user.fullatm}
│ ${rpg.emoticon('money')} Money: ${user.money}
│ ${rpg.emoticon('chip')} Chip: ${user.chip}
│ 🤖 Robo: ${user.robo > 0 ? 'Level ' + user.robo : '✖️'}
│ 📑 *Registered:* ${user.registered ? 'Ya' : 'Tidak'}
└─────────────────────────···
`.trim();

  await conn.reply(m.chat, caption, m, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        title: ' ',
        body: ' ',
        thumbnailUrl: "https://telegra.ph/file/686c0713ddfe5e940f124.jpg",
        renderLargerThumbnail: true,
        sourceUrl: ' ' 
      }
    }
  });
}

handler.help = ['bank'];
handler.tags = ['rpg'];
handler.command = /^(bank)$/i;
handler.register = true;
handler.limit = true;
module.exports = handler;