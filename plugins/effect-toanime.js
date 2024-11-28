const axios = require('axios');

let handler = async (m, { usedPrefix, command, args }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!/image\/(jpe?g|png)/.test(mime)) {
      return m.reply(`Kirim atau balas gambar dengan perintah ${usedPrefix + command}`);
    }

    let media;
    try {
      media = await q.download();
    } catch (error) {
      console.log('Error downloading media:', error);
      return m.reply('Gagal mengunduh media. Pastikan file yang Anda kirim adalah gambar.');
    }

    let url;
    try {
      url = await scrap.uploader(media);
    } catch (error) {
      console.log('Error uploading media:', error);
      return m.reply('Gagal mengunggah media. Coba lagi nanti.');
    }

    m.reply(status.wait);

    const img2img = async (image, prompt) => {
      const sleep = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      try {
        const response = await axios.get(`https://porno.sytes.net/ai/img2img_create?image=${encodeURIComponent(image)}&prompt=${encodeURIComponent(prompt)}`);
        const id = response.data.result;

        let status = false;
        let result;
        let counter = 0;

        do {
          const checkResponse = await axios.get(`https://porno.sytes.net/ai/img2img_check?id=${id}`);
          const checkResult = checkResponse.data.result;

          if (checkResult.message === "fendi pengen berak") {
            result = checkResult.img_url;
            status = "success";
          } else if (checkResult.message === "Fail!") {
            status = "fail";
          }

          counter++;
          if (counter > 50) {
            status = "fail";
          }

          await sleep(3000); // Tunggu 3 detik sebelum memeriksa status lagi
        } while (!status);

        return {
          status: status === "success",
          ...(status === "success" ? { result } : { message: "Failed!" })
        };
      } catch (e) {
        return {
          status: false,
          message: e.message
        };
      }
    };

    let json = await img2img(url.data.url, 'anime');
    if (!json.status) {
      return m.reply(json.message);
    }

    await conn.sendFile(m.chat, json.result, '', global.set.wm, m);

  } catch (e) {
    console.log('Unexpected error:', e);
    return m.reply('Terjadi kesalahan yang tidak terduga. Coba lagi nanti.');
  }
};

handler.help = handler.command = ['toanime'];
handler.tags = ['effect'];
handler.register = true
handler.limit = 5

module.exports = handler;
