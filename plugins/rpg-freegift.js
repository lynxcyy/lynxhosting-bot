const cooldownDuration = 86400000;

let handler = async (m, { conn, args, usedPrefix }) => {
  const user = global.db.data.users[m.sender];
  const today = new Date().toLocaleDateString();
  
  const validGiftCodes = [
    ...new Set([
      'ELL',
      'ellgtg',
      'BloowwXx',
      'BbL016JJQBCSr54OwwW0',
      'giftkey01389320007',
      'kode013923',
      ...(conn.freegift && conn.freegift[m.sender] && conn.freegift[m.sender].code ? conn.freegift[m.sender].code : [])
    ])
  ];

  if (conn.freegift && conn.freegift[m.sender] && conn.freegift[m.sender].time === today) {
    const remainingCooldown = user.lastGift + cooldownDuration - Date.now();
    const remainingTime = getRemainingTime(remainingCooldown);

    return conn.reply(m.chat, `🎁 Kamu sudah menggunakan kode Gift Gratis hari ini. Kode Gift hanya bisa digunakan sekali sehari!\n\nKode Gift Gratis dapat digunakan kembali setelah:\n${remainingTime}`, m);
  }

  if (!args[0]) {
    return conn.reply(m.chat, `❓ Kamu belum memasukkan Kode FreeGiftmu!\n\nContoh: *${usedPrefix}freegift ELL*`, m);
  }

  if (validGiftCodes.includes(args[0])) {
    conn.reply(m.chat, '*🎉 SELAMAT!*\nKamu telah mendapatkan:\n✨ 1000 XP\n🎫 30 Limit\n💰 1000 Money\n🥤 1 Potion', m);
    user.exp += 1000;
    user.limit += 30;
    user.money += 1000;
    user.potion += 1;
    
    if (!conn.freegift) conn.freegift = {};
    conn.freegift[m.sender] = { time: today, code: args[0] };
    user.lastGift = Date.now();
    setTimeout(() => {
      delete conn.freegift[m.sender];
      conn.reply(m.chat, '⏰ Waktunya menggunakan FreeGift lagi!\nKetik *freegift* untuk mendapatkan hadiah spesial.', m);
    }, cooldownDuration);
  } else {
    conn.reply(m.chat, `*❌ KODE FREE TIDAK VALID  ❌*\nSilakan periksa kembali Kode FreeGift yang kamu masukkan.\n\nContoh: *${usedPrefix}freegift ELL*`, m);
  }
};

handler.help = ['freegift <kode>'];
handler.tags = ['rpg'];
handler.command = /^freegift$/i;
handler.register = true;
handler.limit = true;
module.exports = handler;

function getRemainingTime(ms) {
  if (isNaN(ms) || ms < 0) return "00:00:00"; // Handle NaN and negative duration
  let days = Math.floor(ms / 86400000);
  let hours = Math.floor((ms % 86400000) / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);

  let remainingTime = '';
  if (days > 0) remainingTime += `${days} hari `;
  if (hours > 0) remainingTime += `${hours} jam `;
  if (minutes > 0) remainingTime += `${minutes} menit `;
  if (seconds > 0) remainingTime += `${seconds} detik`;

  return remainingTime.trim();
}