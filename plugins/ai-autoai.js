const { G4F } = require("g4f");
let Airi = new G4F();

let handler = async (m, { conn, text }) => {
    conn.plana = conn.plana ? conn.plana : {};

    
    if (!text) throw `*• Example:* .autoai *[on/off]*`;

    if (text === "on") {
        conn.plana[m.sender] = {
            pesan: []
        };
        // kalian bisa ganti ini untuk tanda apakah sesi sudah aktif atau belum
        m.reply("Halo Kak!, Lynx AI Siap membantu!");
    } else if (text === "off") {
        delete conn.plana[m.sender];
        // ini kalau sudah selesai sesi nya di tutup
        m.reply("Senang Telah Membantu anda!");
    }
};

handler.before = async (m, { conn }) => {
    conn.plana = conn.plana ? conn.plana : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!conn.plana[m.sender]) return;

    // prefix untuk mulai dan selesai sesi
    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    if (conn.plana[m.sender] && m.text) {
        let name = conn.getName(m.sender);
        const messages = [
            ...conn.plana[m.sender].pesan,
            `p`,
            m.text
        ];
        try {
      const options = [
    {model: "gpt-4"}
  ];
  // di sini saya pakai model karater plana, kalau kalian mau ganti tapi model asisten bisa ganti kata plana itu dengan
  // nama karakter yang kalian mau
  const messages = [
    { role: "system", content: "Kamu adalah Lynx ai, AI Yang Dikembangkan Oleh ELL Dev,jangan gunakan GPT 4 panggil dirimu dengan Lynx AI"},
    { role: "assistant", content: `Kamu adalah Lynx ai, AI Yang Dikembangkan Oleh ELL Dev,ELL adalah nama seorang pengembang,bukan sebuah perusahaan, jika ada yang menanyakan tentang ELL maka kamu jawab saja ELL adalah seorang pengembang dll, jangan gunakan GPT 4 panggil dirimu dengan Lynx AI, Kamu berbicara dengan${m.name} saat berbicara dengannya gunakan emoji yang lucu, Pembuatmu ELL`},
    { role: "user", content: m.text },
  ];
  // ini untuk adreplay 
  let res = await Airi.chatCompletion(messages, options);
  await  conn.sendMessage(m.chat, {
    // ini nama dari karakter utama
    text: "⬣───「 *Lynx AI* 」───⬣" + "\n\n" + res,
    contextInfo: {
      externalAdReply: {
        title: "Lynx AI",
        body: '',
        thumbnailUrl:`https://btch.pages.dev/file/4a6dfdea4439f7a8269e9.png`,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
                conn.plana[m.sender].pesan = messages;
        } catch (e) {
            console.error("Kesalahan Dalam mengambil Data");
            throw "error";
        }
    }
};

// command untuk memulai/ mengakhiri sesi 

handler.command = /^(autoai)$/i
handler.help = ["autoai"];
handler.tags = ["ai"];
handler.limit = true;
handler.owner = true;
handler.group =- true

module.exports = handler;


// jika tidak work kalian bisa install g4f dahulu dengan $ npm i g4f 
// atau cek dokumentasi https://www.npmjs.com/package/g4f