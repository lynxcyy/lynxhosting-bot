const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

let handler = async (m, { conn }) => {
    m.reply(wait)
  const imageUrl1 = 'https://telegra.ph/file/08272cf5b21d77f45c929.jpg';
  const imageUrl2 = 'https://telegra.ph/file/08272cf5b21d77f45c929.jpg';

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url }
    }, { upload: conn.waUploadToServer });
    return imageMessage;
  }

  const imageMessage1 = await createImage(imageUrl1);
  const imageMessage2 = await createImage(imageUrl2);

  const push = [
    {
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `*「 LIST PRIVATE PANEL LYNX HOSTING⚡」*
- ⚡ RAM 1GB CPU 60% = 2.500 / BULAN
- ⚡ RAM 2GB CPU 80% = 3.500 / BULAN
- ⚡ RAM 3GB CPU 100% = 4.500 / BULAN
- ⚡ RAM 4GB CPU 120% = 5.500 / BULAN
- ⚡ RAM 5GB CPU 140% = 6.500 / BULAN
- ⚡ RAM 6GB CPU 160% = 7.500 / BULAN
- ⚡ RAM 7GB CPU 180% = 8.500 / BULAN
- ⚡ RAM 8GB CPU 100% = 9.500 / BULAN
- ⚡ RAM 9GB CPU 220% = 10.500 / BULAN
- ⚡ RAM 10GB CPU 240% = 11.500 / BULAN
- ⚡ RAM UNLI CPU UNLI = 15.000 / BULAN

*KEUNTUNGAN PANEL PRIVATE:*
- ANTI DDOS
- NODE FRESH
- BOT ON 24 JAM
- TANPA RESELLER DAN ADMIN PANEL
- IP PRIVATE
- SC DIPASTIKAN AMAN 100%
- ANTI RUSUH
- SUDAH PASTI NO DELAY
- JIKA BELUM BISA RUN BOT? ADMIN SIAP MEMBANTU SAMPAI RUN
- PRIORITAS UTAMA JIKA ADA KENDALA
- GARANSI 20D 2X REPLACE SERVER
- CLAIM GARANSI? SS BUKTI PEMBELIAN`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '`© ʟʏɴx ʜᴏꜱᴛɪɴɢ`⚡'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: `*PRIVATE PANEL⚡*`,
        hasMediaAttachment: true,
        imageMessage: imageMessage1
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": '{"display_text":"Beli Produk","url":"https://wa.me/6282211801357?text=MIN+MW+BUY+PRIVATE+PANEL","merchant_url":"https://wa.me/6282211801357"}'
          }
        ]
      })
    },
    {
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `*「 LIST PUBLIC PANEL LYNX HOSTING⚡」*
- 📦 RAM 1GB CPU 40% = 1.000 / BULAN
- 📦 RAM 2GB CPU 60% = 2.000 / BULAN
- 📦 RAM 3GB CPU 80% = 3.000 / BULAN
- 📦 RAM 4GB CPU 100% = 4.000 / BULAN
- 📦 RAM 5GB CPU 120% = 5.000 / BULAN
- 📦 RAM 6GB CPU 140% = 6.000 / BULAN
- 📦 RAM 7GB CPU 160% = 7.000 / BULAN
- 📦 RAM 8GB CPU 180% = 8.000 / BULAN
- 📦 RAM 9GB CPU 200% = 9.000 / BULAN
- 📦 RAM 10GB CPU 220% = 10.000 / BULAN
- 📦 RAM UNLI CPU UNLI = 11.000 / BULAN

*KEUNTUNGAN PANEL LYNX HOSTING*
- ANTI DDOS
- NODE FRESH
- BOT ON 24 JAM
- SUPPORT ALL SC
- ANTI RUSUH
- SUDAH PASTI NO DELAY
- JIKA BELUM BISA RUN BOT? ADMIN SIAP MEMBANTU SAMPAI RUN
- PRIORITAS UTAMA JIKA ADA KENDALA
- GARANSI 25D 1X REPLACE SERVER
- CLAIM GARANSI? SS BUKTI PEMBELIAN`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '`© ʟʏɴx ʜᴏꜱᴛɪɴɢ`⚡'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: `*PUBLIC PANEL📦*`,
        hasMediaAttachment: true,
        imageMessage: imageMessage2
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": '{"display_text":"Beli Produk","url":"https://wa.me/6282211801357?text=MIN+MW+BUY+PUBLIC+PANEL","merchant_url":"https://wa.me/6282211801357"}'
          }
        ]
      })
    },
    {
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `*「 LIST DIGITAL OCEAN LYNX HOSTING⚡」*
- 🌩️1GB RAM 1 CORE Rp. 20.000 / BULAN
- 🌩️2GB RAM 1 CORE Rp. 25.000 / BULAN
- 🌩️2GB RAM 2 CORE Rp. 30.000 / BULAN
- 🌩️4GB RAM 2 CORE Rp. 35.000 / BULAN
- 🌩️8GB RAM 4 CORE Rp. 50.000 / BULAN
- 🌩️16GB RAM 4 CORE (AMD) Rp. 65.000 / BULAN 
*KEUNTUNGAN VPS LYNX HOSTING⚡*
- AKTIF 30D
- FREE INSTALL PANEL RAM 4GB+
- FREE INSTALL WINGS (NODE) RAM 4GB+
- FREE EGG BOT WA VIP RAM 4GB+
- FREE SUBDO RAM 4GB+
- BEBAS REQUEST OS REGION 
- DESKTOP EXPERIENCE (UBUNTU) / CLI
- FULL AKSES VPS
- GARANSI 30D
- 3X REBUILD RAM 4+
- 2X REBUILD RAM 4-
- CLAIM GARANSI? SERTAKAN BUKTI PEMBELIAN`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '`© ʟʏɴx ʜᴏꜱᴛɪɴɢ`⚡'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: `*DIGITAL OCEAN🌩️*`,
        hasMediaAttachment: true,
        imageMessage: imageMessage2
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": '{"display_text":"Beli Produk","url":"https://wa.me/6282211801357?text=MIN+MW+BUY+VPS","merchant_url":"https://wa.me/6282211801357"}'
          }
        ]
      })
    },
    {
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `*「 PRODUK LAIN LYNX HOSTING⚡」*
- SC PRIBADI LYNX HOSTING V1 Rp. 30.000 (UNTUK FITUR TANYAKAN SAJA)
- SC PRIBADI LYNX HOSTING V2 Rp. 45.000 (UNTUK FITUR TANYAKAN SAJA)
- Sewa Bot Merah 15.000/bln
- Akses premium Bot Merah 7k/bln
- JASA RUN BOT Rp. 5.000 / BULAN 
- JASA BUG Rp. 5.000 / NOMOR (JAMINAN C1)
- ADMIN PANEL Rp. 15.000
- RESELLER PANEL Rp. 10.000
- JASA EDIT SC _HARGA BERVARIASI TERGANTUNG KESULITAN_
- JASA INSTALL PANEL Rp. 15.000 (Rp. 25.000 JIKA SUBDO DARI KAMI _JAMINAN ANTI DDOS_)
- JASA INSTALL WINGS RP. 15.000 (Rp. 25.000 JIKA SUBDO DARI KAMI _JAMINAN ANTI DDOS_)
- FIX WINGS MERAH Rp. 7.000
- JASA INSTALL PANEL Rp. 10.000 (Rp. 20.000 JIKA THEME DARI KAMI DAN BEBAS REQ THEME YANG DI SEDIAKAN)
- JASA BROADCAST Rp. 3.000 / BROADCAST (TOTAL ADA 70+ GC)
- SUBDO Rp. 15.000 / SUBDO `
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '`© ʟʏɴx ʜᴏꜱᴛɪɴɢ`⚡'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: `*PRODUK LAIN✨*`,
        hasMediaAttachment: true,
        imageMessage: imageMessage2
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": '{"display_text":"Beli Produk","url":"https://wa.me/6282211801357?text=MIN+MW+BUY+PRODUK+LAIN","merchant_url":"https://wa.me/6282211801357"}'
          }
        ]
      })
    },
  ];

  const bot = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Halo kak ${conn.getName(m.sender)}. Silahkan Pilih Paket Dibawah`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: '`© ʟʏɴx ʜᴏꜱᴛɪɴɢ`⚡'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: push
          })
        })
      }
    }
  }, {});

  await conn.relayMessage(m.chat, bot.message, {
    messageId: bot.key.id
  });
};
handler.help = ['produk'];
handler.tags = ['info'];
handler.command = /^produk|prodak|listpanel$/i;
module.exports = handler;