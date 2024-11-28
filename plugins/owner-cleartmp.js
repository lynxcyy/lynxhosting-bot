const { readdirSync, statSync, unlinkSync } = require('fs');
const { join } = require('path');

let handler = async (m, { conn, usedPrefix, args }) => {

  const tmp = ['./tmp'];
  const filenames = [];

  tmp.forEach(dirname => {
    try {
      readdirSync(dirname).forEach(file => {
        filenames.push(join(dirname, file));
      });
    } catch (error) {
      console.error(`Failed to read directory ${dirname}:`, error);
      conn.reply(m.chat, `Gagal membaca folder ${dirname}`, m);
      return;
    }
  });

  const deletedFiles = [];

  filenames.forEach(file => {
    try {
      const stats = statSync(file);

      if (stats.isDirectory()) {
        console.log(`Skipping directory: ${file}`);
      } else {
        unlinkSync(file);
        deletedFiles.push(file);
      }
    } catch (error) {
      console.error(`Failed to delete file ${file}:`, error);
    }
  });

  if (deletedFiles.length > 0) {
    conn.reply(m.chat, `Sukses! ${deletedFiles.length} file telah dihapus.`, m);
  } else {
    conn.reply(m.chat, 'Tidak ada file yang dihapus.', m);
  }
};

handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.command = /^(cleartmp|klirtemp|klirtmp)$/i;
handler.rowner = true;

module.exports = handler;
