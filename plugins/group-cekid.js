const fetch = require('node-fetch');

let handler = async (m, { conn, groupMetadata }) => {
    conn.reply(m.chat, `${await groupMetadata.id}`, m);
}
handler.help = ['cekid'];
handler.tags = ['group'];
handler.command = /^(cekid|idgc|gcid)$/i;
handler.register = true;

module.exports = handler;
