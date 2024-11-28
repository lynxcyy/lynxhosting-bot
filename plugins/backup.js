const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
let handler = async (m, { conn }) => {
  try {
    conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });
    const formattedDate = getFormattedDate();
    let backupName = `backup-${formattedDate}.zip`;
    let output = fs.createWriteStream(backupName);
    let archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async function () {
      let caption = `Ini Backup SC nya kak:\n- File: ${backupName}\nSize file: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`;
      await conn.sendFile(m.chat, path.resolve(backupName), backupName, caption, m);
      fs.unlinkSync(backupName);
    });

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        throw err;
      }
    });

    archive.on('error', function (err) {
      throw err;
    });

    archive.pipe(output);
    archive.glob('**/*', {
      cwd: path.resolve(__dirname, '../'),
      ignore: [
        'node_modules/**',
        'session/**',
        'tmp/**',
        '.npm/**',
        'package-lock.json',
        backupName
      ]
    });
    await archive.finalize();
  } catch (err) {
    console.error(err);
    conn.sendMessage(m.chat, 'An error occurred during the backup process.', m);
  }
}

handler.help = ['backup'];
handler.tags = ['owner'];
handler.command = /^backup$/i;

handler.owner = true;

module.exports = handler;