let fs = require('fs');
let ffmpeg = require('fluent-ffmpeg');
let yts = require('yt-search');

let handler = async (m, { usedPrefix, command, text }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'judul lagu'))
  m.reply(wait)   
  try {
    let yt = await yts(text);
    let video = yt.all[0];
    if (!video) return m.reply('No results found');
    let thumbnailUrl = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
    let json = {
      status: true,
      title: video.title,
      duration: video.timestamp,
      views: video.views,
      data: {
        size: 'unknown',
        url: video.url
      }
    };

    m.react('✅')
    if (!json.status) return m.reply(Func.jsonFormat(json));

    let ca = `乂  *Y T - P L A Y*\n\n`
    ca += `  ∘  *Title* : ` + json.title + `\n`
    ca += `  ∘  *Duration* : ` + json.duration + `\n`
    ca += `  ∘  *Viewer* : ` + json.views + `\n`
    ca += `  ∘  *Size* : ` + json.data.size + `\n\n`
    ca += global.set.footer;

    let xSize = Func.sizeLimit(json.data.size, global.set.max_upload);
    if (xSize.oversize) return m.reply(`The file size (${json.data.size}) is too large, please download it yourself via this link : ${json.data.url}`);

    const soad = [
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: 'Download Audio',
          id: `${usedPrefix}yta ${video.url}`
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: 'Download Video',
          id: `${usedPrefix}ytv ${video.url}`
        })
      }
    ];

    await conn.sendAIMessage(m.chat, soad, m, {
      thumbnailUrl: thumbnailUrl,
      renderLargerThumbnail: true,
      content: ca,
      footer: ' ',
    });
  } catch (e) {
    console.log(e);
    return m.reply(Func.jsonFormat(e));
  }
};

handler.help = handler.command = ['play'];
handler.tags = ['downloader'];
handler.register = true;
handler.limit = 1;

module.exports = handler;