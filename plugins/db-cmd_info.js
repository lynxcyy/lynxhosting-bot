const util = require('util');

const handler = async (m, { conn, text }) => {
  let hash = text;
  if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex');
  if (!hash) throw 'Hash not found';

  let sticker = global.db.data.sticker[hash];
  if (sticker) {
    let mentionedText = sticker.mentionedJid.length > 0 ? `*Cmd Mention:*\n${sticker.mentionedJid.map((v, i) => `No. *${i + 1}*:\n*Mention Name:* ${conn.getName(v)}\n*Mention Number:* ${splitM(v)}\n*Mention Jid:* ${v}`).join('\n\n')}` : '';

    m.reply(`
      *fileSha256:* ${hash}
      *Text:* ${sticker.text}
      *Time Create:* ${sticker.at}
      *Locked:* ${sticker.locked ? 'Yes' : 'No'}
      *Creator Name:* ${conn.getName(sticker.creator)}
      *Creator Number:* ${splitM(sticker.creator)}
      *Creator Jid:* ${sticker.creator}
      ${mentionedText}
    `.trim());
  } else {
    m.reply('Sticker Not in the database');
  }
};

handler.help = ['infocmd'];
handler.tags = ['database'];
handler.command = ['infocmd'];
handler.register = true;
module.exports = handler;

function splitM(jid) {
  return jid.split('@')[0];
}
