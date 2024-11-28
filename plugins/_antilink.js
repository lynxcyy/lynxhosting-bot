let handler = m => m;

let linkRegex = /(chat.whatsapp.com\/([0-9A-Za-z]{20,24})|(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+(com|xyz|me|my|id|io|eu\.org|biz|biz\.id)(\/[^\s]+)?)/i;

handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true;
  let chat = global.db.data.chats[m.chat];
  let isGroupLink = linkRegex.exec(m.text);

  if (chat.antiLink && isGroupLink) {
    const isOwner = global.owner.includes(m.sender);

    const groupInviteCode = await conn.groupInviteCode(m.chat);
    const currentGroupLink = `chat.whatsapp.com/${groupInviteCode}`;

    if (isGroupLink[0].includes(currentGroupLink)) {
      await conn.reply(m.chat, 'Link yang dikirim adalah link grup saat ini, saya tidak akan menghapusnya.', m);
      console.log("Link grup saat ini terdeteksi. Tidak ada tindakan diambil.");
      return true;
    }

    await conn.reply(m.chat, '「  *LINK TERDETEKSI* 」\nMaaf saya harus menghapusnya.', m);

    if (isOwner) {
      await conn.reply(m.chat, 'Anda adalah owner, saya tidak akan menghapus pesan anda.', m);
      console.log("Owner terdeteksi. Tidak ada tindakan diambil.");
      return true;
    }

    if (isAdmin) {
      await conn.reply(m.chat, 'Anda adalah admin, saya tidak akan menghapus pesan anda.', m);
      console.log("Admin terdeteksi. Tidak ada tindakan diambil.");
      return true;
    }

    await conn.sendMessage(m.chat, { delete: m.key });

    if (!isBotAdmin) {
      await conn.reply(m.chat, 'Saya bukan admin, jadikan saya admin agar bisa mengeluarkan orang yang mengirim link.', m);
      console.log("Bot bukan admin. Tidak bisa mengeluarkan pengguna.");
      return true;
    }

    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    await conn.reply(m.chat, 'Maaf saya harus mengeluarkan anda.', m);
    console.log("Pesan dihapus dan pengguna dikeluarkan.");
  }
  return true;
}

module.exports = handler;
