let handler = async (m, { 
    conn, usedPrefix: _p
}) => {
    let user = global.db.data.users[m.sender]
    let info = conn.sendMessage(m.chat, { text: `Waalaikumsalam kak ${conn.getName(m.sender)} 🙏🏻` }, m)
await conn.sendMessage(m.chat, { audio: { url: './vn/salam.mp3' }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [100,0,100,0,100,0,100] }, { quoted: m })
	return conn.sendMessage(m.chat, {
		react: {
			text: "🙏",
			key: m.key,
		},
	});
}
handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i
handler.command = new RegExp

module.exports = handler