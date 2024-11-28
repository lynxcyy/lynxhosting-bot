const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

let handler = async (m, { conn }) => {
  if (!m.quoted) {
    m.reply('Reply ke pesan saluran channel-nya.');
    return;
  }

  try {
    let quotedMessage = await m.getQuotedObj();
    let id = quotedMessage.msg.contextInfo.forwardedNewsletterMessageInfo;
    if (!id || !id.newsletterJid) {
      throw new Error('ID tidak ditemukan dalam pesan yang dikutip.');
    }

    let responseText = `Powered By LYNX HOSTING⚡\nId: ${id.newsletterJid}`;
    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: responseText
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: wm
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: " ",
              subtitle: "",
              hasMediaAttachment: false
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: "cta_copy",
                  buttonParamsJson: `{\"display_text\":\"🔐 COPY ID\",\"id\":\"2\",\"copy_code\":\"${id.newsletterJid}\"}`
                }
              ]
            })
          })
        }
      }
    }, {});

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } catch (error) {
    console.error(error); // Log the error
    m.reply(`Terjadi kesalahan: ${error.message || error}`);
  }
};

handler.help = ['idch'];
handler.command = ['idch'];
handler.owner = true;
handler.tags = ['tools'];

module.exports = handler;