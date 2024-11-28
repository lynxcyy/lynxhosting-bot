const axios = require('axios');

let handler = async (m, { usedPrefix, command, conn, text, args }) => {
    if (!text) return m.reply('Umh... Linknya??');
    m.reply('Please wait...');
    try {
        let json = await (await axios.get('https://api.alyachan.dev/api/yta?url=' + text + '&apikey=zCLgMA')).data
        if (!json.status) return m.reply(json.msg)
        let dls = "Download Audio Success";
        let ytthumb = await (await conn.getFile(json.data.thumbnail)).data;

        let doc = {
            audio: { url: json.data.url },
            mimetype: "audio/mp4",
            fileName: json.data.title + '.mp3',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: args[0],
                    title: json.data.title,
                    body: dls,
                    sourceUrl: args[0],
                    thumbnail: ytthumb
                }
            }
        };

        await conn.sendMessage(m.chat, doc, { quoted: m });
    } catch (e) {
        console.error(e);
        m.reply(`Error: ${String(e)}`);
    }
};

handler.tags = ['downloader'];
handler.help = ['ytmp3'];
handler.command = /^(yta|ytmp3|ytaudio)$/i;
handler.register = true;
handler.limit = true;
module.exports = handler;