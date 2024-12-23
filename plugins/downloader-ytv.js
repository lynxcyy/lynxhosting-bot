let ytdl = require ("ytdl-core")

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return m.reply(`*Example:* .${command} https://www.youtube.com/xxxxxxx`);
    m.reply(wait)
	let obj = await ytmp3(text);
	let title = obj.meta.title;
	conn.sendFile(m.chat, obj.buffer, '', title, m)
};

handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'ytv']
handler.register = true;
handler.limit = true;
module.exports = handler

async function ytmp3(url) {
	try {
		const { videoDetails } = await ytdl.getInfo(url, {
			lang: "id",
		});
		const stream = ytdl(url, {
			filter: "videoandaudio",
		});
		const chunks = [];
		stream.on("data", (chunk) => {
			chunks.push(chunk);
		});
		await new Promise((resolve, reject) => {
			stream.on("end", resolve);
			stream.on("error", reject);
		});
		const buffer = Buffer.concat(chunks);
		return {
			meta: {
				title: videoDetails.title,
				channel: videoDetails.author.name,
				seconds: videoDetails.lengthSeconds,
				description: videoDetails.description,
				image: videoDetails.thumbnails.slice(-1)[0].url,
			},
			buffer: buffer,
			size: buffer.length,
		};
	} catch (error) {
		throw error;
	}
}