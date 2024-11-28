const uploadImage = require('../lib/uploadImage');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Split the input text into top and bottom text
    let [atas, bawah] = text.split('|');
    // Default the top and bottom text if not provided
    let topText = atas ? encodeURIComponent(atas.trim()) : '';
    let bottomText = bawah ? encodeURIComponent(bawah.trim()) : '';

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) throw `Balas gambar dengan perintah\n\n${usedPrefix + command} <${topText || 'teks atas'}>|<${bottomText || 'teks bawah'}>`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`;

    let img = await q.download();
    let url = await uploadImage(img);
    
    // Create the meme URL with proper encoding and parameters
    let meme = `https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${url}`;

    try {
        conn.sendSticker(m.chat, meme, m, {
            packname: global.set.packname,
            author: global.set.author
        });
    } catch (error) {
        console.error('Error sending sticker:', error);
        conn.reply(m.chat, 'Terjadi kesalahan saat membuat stiker.', m);
    }
};

handler.help = ['smeme'];
handler.tags = ['sticker'];
handler.command = /^(s(tic?ker)?me(me)?)$/i;
handler.register = true;
handler.limit = true;

module.exports = handler;
