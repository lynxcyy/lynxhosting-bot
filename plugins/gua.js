let handler = async function (m, { conn, text, usedPrefix }) {
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/avatar_contact.png');
  conn.sendMessage(m.chat, {
    text: 'Owner Gua Udah Dateng nih😍',
    contextInfo: {
      externalAdReply: {
        title: 'EL Ganteng🗿',
        body: `・「Lynxbot」`,
        thumbnailUrl: pp,
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};
handler.command = /^(gua)$/i;
handler.owner = true;
module.exports = handler;