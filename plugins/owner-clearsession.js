const { readdirSync, statSync, unlinkSync } = require('fs');
const { join } = require('path');

let handler = async (m, { conn, usedPrefix, args }) => {

  const sesi = ['./session']; // Adjusted path to be relative to the script location
  const array = [];

  try {
    sesi.forEach(dirname => {
      // Check if the directory exists before trying to read it
      if (statSync(dirname).isDirectory()) {
        readdirSync(dirname).forEach(file => {
          if (file !== 'creds.json') { 
            array.push(join(dirname, file));
          }
        });
      } else {
        console.log(`Directory not found: ${dirname}`);
      }
    });
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
    conn.reply(m.chat, `Error: ${error.message}`, m);
    return;
  }

  const deletedFiles = [];

  array.forEach(file => {
    try {
      const stats = statSync(file);

      if (stats.isDirectory()) {
        console.log(`Skipping directory: ${file}`);
      } else {
        unlinkSync(file);
        deletedFiles.push(file);
      }
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
  });

  if (deletedFiles.length > 0) {
    conn.reply(m.chat, 'Success!', m);
    console.log('Deleted files:', deletedFiles);
  } else {
    conn.reply(m.chat, 'Tidak ada file yang tersisa di folder sessions', m);
  }
};

handler.help = ['clearsession'];
handler.tags = ['owner'];
handler.command = /^(clearsession|clearss|klirss)$/i;
handler.rowner = true;

module.exports = handler;
