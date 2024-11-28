let { MessageType } = require('@whiskeysockets/baileys').default;
let fs = require('fs');

let handler = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  let type = (args[0] || '').toLowerCase();
  let _type = (args[0] || '').toLowerCase();
  let user = global.db.data.users[m.sender];

  let sections = [
    {
      title: "Main Menu",
      rows: [
        {
          title: "「⛏️」Pickaxe",
          description: "〉 10 Kayu\n〉 5 Batu\n〉 5 Iron\n〉 20 String",
          rowId: '.craft pickaxe'
        },
        {
          title: "「⚔️」Sword",
          description: "〉 10 Kayu\n〉 15 Iron",
          rowId: '.craft sword'
        },
        {
          title: "「🎣」Fishingrod",
          description: "〉 10 Kayu\n〉 2 Iron\n〉 20 String",
          rowId: '.craft fishingrod'
        },
        {
          title: "「💳」Atm",
          description: "〉3 Emerald\n〉6 Diamond\n〉10k Money",
          rowId: '.craft atm'
        },
        {
          title: "「🥼」Armor",
          description: "〉 30 Iron\n〉 1 Emerald\n〉 5 Diamond",
          rowId: '.craft armor'
        }
      ]
    }
  ];

  let listMessage = {
    text: "Pilih item yang ingin Anda buat",
    footer: global.set.footer,
    title: "Crafting Menu",
    buttonText: "Tap Here!",
    sections
  };

  let caption = `
█▀▀▀▀█▀▀▀▀█▀▀▀▀█
█────█────█────█
█▄▄▄▄█▄▄▄▄█▄▄▄▄█
█▀▀▀▀█▀▀▀▀█▀▀▀▀█
█────█────█────█
█▄▄▄▄█▄▄▄▄█▄▄▄▄█
█▀▀▀▀█▀▀▀▀█▀▀▀▀█
█────█────█────█
█▄▄▄▄█▄▄▄▄█▄▄▄▄█
`.trim();

  if (args[0] === '404') {
    return conn.sendMessage(m.chat, listMessage, { quoted: m });
  }

  try {
    if (/craft|Crafting/i.test(command)) {
      const count = args[1] ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : 1;
      switch (type) {
        case 'pickaxe':
          if (user.pickaxe > 0) return m.reply('Kamu sudah memiliki ini');
          if (user.rock < 5 || user.wood < 10 || user.iron < 5 || user.string < 20) {
            return m.reply(`Barang tidak cukup!\nUntuk membuat pickaxe, kamu memerlukan: ${user.wood < 10 ? `\n${10 - user.wood} kayu🪵` : ''}${user.iron < 5 ? `\n${5 - user.iron} iron⛓` : ''}${user.string < 20 ? `\n${20 - user.string} String🕸️` : ''}${user.rock < 5 ? `\n${5 - user.rock} Batu🪨` : ''}`);
          }
          user.wood -= 10;
          user.iron -= 5;
          user.rock -= 5;
          user.string -= 20;
          user.pickaxe += 1;
          user.pickaxedurability = 40;
          m.reply("Sukses membuat 1 pickaxe 🔨");
          break;

        case 'sword':
          if (user.sword > 0) return m.reply('Kamu sudah memiliki ini');
          if (user.wood < 10 || user.iron < 15) {
            return m.reply(`Barang tidak cukup!\nUntuk membuat sword, kamu memerlukan: ${user.wood < 10 ? `\n${10 - user.wood} kayu🪵` : ''}${user.iron < 15 ? `\n${15 - user.iron} iron⛓` : ''}`);
          }
          user.wood -= 10;
          user.iron -= 15;
          user.sword += 1;
          user.sworddurability = 40;
          m.reply("Sukses membuat 1 sword 🗡️");
          break;

        case 'fishingrod':
          if (user.fishingrod > 0) return m.reply('Kamu sudah memiliki ini');
          if (user.wood < 10 || user.iron < 2 || user.string < 20) {
            return m.reply(`Barang tidak cukup!\nUntuk membuat pancingan, kamu memerlukan: ${user.wood < 10 ? `\n${10 - user.wood} kayu🪵` : ''}${user.iron < 2 ? `\n${2 - user.iron} iron⛓` : ''}${user.string < 20 ? `\n${20 - user.string} String🕸️` : ''}`);
          }
          user.wood -= 10;
          user.iron -= 2;
          user.string -= 20;
          user.fishingrod += 1;
          user.fishingroddurability = 40;
          m.reply("Sukses membuat 1 pancingan 🎣");
          break;

        case 'armor':
          if (user.armor > 0) return m.reply('Kamu sudah memiliki ini');
          if (user.iron < 30 || user.emerald < 1 || user.diamond < 5) {
            return m.reply(`Barang tidak cukup!\nUntuk membuat armor, kamu memerlukan: ${user.iron < 30 ? `\n${30 - user.iron} iron⛓️` : ''}${user.emerald < 1 ? `\n${1 - user.emerald} emerald❇️` : ''}${user.diamond < 5 ? `\n${5 - user.diamond} diamond💎` : ''}`);
          }
          user.iron -= 30;
          user.emerald -= 1;
          user.diamond -= 5;
          user.armor += 1;
          user.armordurability = 50;
          m.reply("Sukses membuat 1 armor 🥼");
          break;

        case 'atm':
          if (user.atm > 0) return m.reply('Kamu sudah memiliki ini');
          if (user.emerald < 3 || user.money < 10000 || user.diamond < 6) {
            return m.reply(`Barang tidak cukup!\nUntuk membuat ATM, kamu memerlukan: ${user.money < 10000 ? `\n${10000 - user.money} money💰` : ''}${user.emerald < 3 ? `\n${3 - user.emerald} emerald❇️` : ''}${user.diamond < 6 ? `\n${6 - user.diamond} diamond💎` : ''}`);
          }
          user.emerald -= 3;
          user.money -= 10000;
          user.diamond -= 6;
          user.atm += 1;
          user.fullatm = 500000000;
          m.reply("Sukses membuat 1 ATM 💳");
          break;

        default:
          return m.reply(caption);
      }
    } else if (/enchant|enchan/i.test(command)) {
      const count = args[2] ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : 1;
      switch (_type) {
        case 't':
          // Tambahkan kode untuk 't' jika diperlukan
          break;

        case '':
          // Tambahkan kode untuk case kosong jika diperlukan
          break;

        default:
          return m.reply(caption);
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack);
  }
};

handler.help = ['craft'];
handler.tags = ['rpg'];
handler.command = /^(craft|crafting|chant)/i;
handler.register = true;
handler.limit = true;

module.exports = handler;
