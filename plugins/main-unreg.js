const { createHash } = require('crypto');

let handler = async function (m, { args }) {
  if (!args[0]) return m.reply('Masukkan nomor serial Anda');

  let user = db.data.users[m.sender];
  if (!user) return m.reply('Anda belum terdaftar.');

  let sn = createHash('md5').update(m.sender).digest('hex');
  if (args[0] !== sn) return m.reply('Serial Number salah/tidak valid');
  delete db.data.users[m.sender];
  
  m.reply('Berhasil membatalkan registrasi dan menghapus data pengguna dari database.');
};

handler.help = ['unreg'];
handler.tags = ['main'];
handler.command = ['unreg', 'unregister'];
handler.register = true;
handler.limit = 1;

module.exports = handler;
