const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id');

let handler = async (m, { conn }) => {
  try {
    if (!db.data.stats) {
      await conn.sendMessage(m.chat, { text: 'Tidak ada data statistik yang tersedia.' });
      return;
    }

    let stats = Object.entries(db.data.stats).map(([key, val]) => {
      let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key;
      if (/exec/.test(name)) return null;
      return { name, ...val };
    }).filter(stat => stat && stat.total > 10);

    if (stats.length === 0) {
      await conn.sendMessage(m.chat, { text: 'Tidak ada statistik yang valid.' });
      return;
    }

    stats = stats.sort((a, b) => b.total - a.total);

    let txt = stats.map(({ name, total, last }, idx) => {
      if (name.includes('-') && name.endsWith('.js')) name = name.split('-')[1].replace('.js', '');
      return `${idx + 1}. Command: ${name}\n   Hit: ${total}x\n   Last Hit: ${moment(last).format('DD/MM/YY HH:mm:ss')}`;
    }).join('\n');

    let message = `乂  *H I T S T A T*\n\n${txt}\n\n${global.set.footer || ''}`;
    await conn.sendMessage(m.chat, { text: message });
  } catch (error) {
    await conn.sendMessage(m.chat, { text: 'Terjadi kesalahan saat menghasilkan statistik hit.' });
  }
};

handler.help = handler.command = ['hitstat'];
handler.tags = ['info'];
handler.register = true;

module.exports = handler;

function parseMs(ms) {
  if (typeof ms !== 'number') throw 'Parameter harus diisi dengan angka';
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    milliseconds: Math.trunc(ms) % 1000,
    microseconds: Math.trunc(ms * 1000) % 1000,
    nanoseconds: Math.trunc(ms * 1e6) % 1000
  };
}

function getTime(ms) {
  let now = parseMs(+new Date() - ms);
  if (now.days) return `${now.days} hari yang lalu`;
  else if (now.hours) return `${now.hours} jam yang lalu`;
  else if (now.minutes) return `${now.minutes} menit yang lalu`;
  else return `beberapa detik yang lalu`;
}
