const fs = require('fs');

let handler = async (m, { conn }) => {
    let vn;
    const ownerNumber = '6281222844295@s.whatsapp.net';
    if (m.sender === ownerNumber) {
        vn = fs.readFileSync("./vn/lopyou.mp3");
    } else {
        vn = fs.readFileSync("./vn/claraa.mp3");
    }
    conn.sendFile(m.chat, vn, "lah.mp3", null, m, true, {
        type: "audioMessage",
        ptt: true,
    });
}

handler.customPrefix = /^(lopyou|lopyu|lopeyu|lopeyou|loveyu|loveyou|love you|love yu|i love you)$/i;
handler.command = new RegExp();
module.exports = handler;