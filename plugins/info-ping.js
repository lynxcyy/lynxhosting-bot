var { performance } = require("perf_hooks");

var handler = async (m, { conn }) => {
    var old = performance.now();
    await m.reply('_Testing speed..._')
  var old = performance.now();
  var neww = performance.now();
  var speed = neww - old;
    
    var txt = `
*PING TEST*
${Math.round(neww - old)} ms
Merespon dalam ${speed.toFixed(4)} ms
`
        conn.relayMessage(m.chat, {
extendedTextMessage:{
                text: txt, 
                contextInfo: {
                     externalAdReply: {
                        title: "",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://telegra.ph/file/ec8cf04e3a2890d3dce9c.jpg',
                        sourceUrl: ''
                    }
                }, mentions: [m.sender]
}}, {})
}

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = /^(ping)$/i;
handler.register = true;
module.exports = handler;