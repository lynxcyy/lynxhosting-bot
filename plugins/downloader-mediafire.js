global.max_upload = 20 * 1024 * 1024 * 1024; // 20 GB dalam byte

let handler = async (m, { usedPrefix, command, args }) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://www.mediafire.com/file/c8aod99ns240d4t/com.termux_118.apk/file'));
  if (!args[0].match('mediafire.com')) return m.reply(status.invalid);
  m.react('🕐');
  try {
    const json = await Func.fetchJson(API('alya', '/api/mediafire', { url: args[0] }, 'apikey'));
    if (!json.status) return m.reply(Func.jsonFormat(json));
    
    let ca = `乂  *M E D I A F I R E*\n\n`;
    ca += `  ∘  *Name* : ` + json.data.filename + '\n';
    ca += `  ∘  *Size* : ` + json.data.filesize + '\n';
    ca += `  ∘  *Type* : ` + json.data.filetype + '\n';
    ca += `  ∘  *Mime* : ` + json.data.mimetype + '\n';
    ca += `  ∘  *Upload* : ` + json.data.uploadAt + '\n\n';
    ca += global.set.footer;

    let xSize = Func.sizeLimit(json.data.filesize, global.max_upload);
    if (xSize.oversize) {
      let shortLink = await Func.shortlink(json.data.link);
      return m.reply(`The file size (${json.data.filesize}) is too large, please download it yourself via this link: ${shortLink}`);
    }
    
    conn.sendMessageModify(m.chat, ca, m, {
      largeThumb: true,
      thumbnail: 'https://telegra.ph/file/98417f85e45f3cae84bee.jpg'
    }).then(async () => {
      conn.sendMedia(m.chat, json.data.link, m, {
        fileName: json.data.filename,
        mentions: [m.sender]
      });
    });
  } catch (e) {
    console.log(e);
    return m.reply(status.error);
  }
};

handler.help = ['mediafire'];
handler.command = ['mediafire', 'mf', 'mfdl'];
handler.tags = ['downloader'];
handler.register = true;
handler.limit = 2;

module.exports = handler;