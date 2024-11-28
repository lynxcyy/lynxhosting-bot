let handler = async (m, { isAdmin, isBotAdmin }) => {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (m.fromMe || !m.isGroup) return true; 

    let chat = global.db.data.chats[m.chat];
    let isFoto = m.mtype === 'imageMessage'; 

    // Periksa apakah antiFoto diaktifkan di grup dan pesan yang diterima adalah gambar
    if (chat.antiFoto && isFoto) { 
      if (isAdmin || !isBotAdmin) {
        return true; // Biarkan gambar dikirim jika pengirim adalah admin atau bot bukan admin
      } else {
        await m.reply(`*Anti image:* Admin has turned on anti image. You can't send images to this group.`);
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.key.id, fromMe: false, participant: m.key.participant } });
        console.log('Pesan gambar pengguna dihapus.');
        return false; // Hentikan proses lebih lanjut setelah menghapus pesan gambar
      }
    }

    return true; // Izinkan proses lebih lanjut untuk jenis pesan lainnya
  } catch (error) {
    console.error('Error in handler:', error);
    return true; // Izinkan proses lebih lanjut dalam kasus terjadi kesalahan
  }
};


handler.command = /^antifoto$/i;

handler.admin = true;

handler.group = true;

module.exports = handler;
