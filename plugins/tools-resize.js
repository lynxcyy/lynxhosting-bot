const jimp = require('jimp');
const uploadImage = require('../lib/uploadImage.js'); // Memastikan Anda memiliki file ini
const uploadFile = require('../lib/uploadFile.js'); // Memastikan Anda memiliki file ini

let handler = async (m, { conn, usedPrefix, args }) => {
    let toWidth = parseInt(args[0], 10);
    let toHeight = parseInt(args[1], 10);
    if (!toWidth || !toHeight) throw 'Harap berikan lebar dan tinggi yang valid.';
    
    let quotedMsg = m.quoted ? m.quoted : m;
    let mime = (quotedMsg.msg || quotedMsg).mimetype || '';
    if (!mime) throw 'Media tidak ditemukan.';

    let media = await quotedMsg.download();
    let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    if (!isMedia) throw `Tipe "${mime}" tidak didukung.`;

    let image = await jimp.read(media);
    let size = {
        before: {
            height: image.bitmap.height,
            width: image.bitmap.width
        },
        after: { 
            height: toHeight,
            width: toWidth,
        }
    };

    // Resize the image
    image = await image.resize(toWidth, toHeight);

    // Save the resized image to a buffer
    let buffer = await image.getBufferAsync(jimp.AUTO);

    // Upload the resized image
    let linkCompres = await uploadImage(buffer);

    // Send the resized image
    conn.sendFile(m.chat, buffer, null, `
• BEFORE
*+* Width : ${size.before.width}
*+* Height : ${size.before.height}

• AFTER
*+* Width : ${size.after.width}
*+* Height : ${size.after.height}

• LINK
*+* Original: ${await uploadImage(media)}
*+* Compressed: ${linkCompres}`, m);
};

handler.help = ['resize <width> <height>'];
handler.tags = ['tools'];
handler.command = /^(resize)$/i;

module.exports = handler;
