const axios = require("axios");

var handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    return m.reply( `Contoh:\n${usedPrefix + command} boobs`);
  }
  try {
  await m.reply(wait)
  const search = await axios.get(
    `https://api.betabotz.eu.org/api/search/xvideos?query=${text}&apikey=lynxcyy`)
  const hasil = search.data.result;
  let teks = `*XVIDEOS RESULTS* \n\n🔍 *KEYWORDS*: *${text}*\n\n`;
  let no = 1;
  for (let i of hasil) {
    teks += `📑 *No* : ${no++}\n📚 *Title* : ${i.title}\n⏱️ *Duration* : ${i.duration}\n🔗 *URL* ${i.url}\n\n─────────────────\n\n`;
  }
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
  await conn.sendMessage(m.chat, { image: { url: hasil[0].thumb }, caption: teks }, { quoted: m });
  } catch (e) {
  throw `*Server error*`
  }
 };
handler.help = ['xvideossearch'];
handler.command = /^(xvids(earch)|xsearch|xvideossearch)$/i
handler.tags = ['internet', 'premium'];
handler.premium = true
module.exports = handler;