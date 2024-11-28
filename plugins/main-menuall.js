const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const os = require('os');
const PhoneNumber = require('awesome-phonenumber');

let handler = async (m, { conn, usedPrefix: _p }) => {
  let user = `@${m.sender.split('@')[0]}`;

  let tags = {};
  const defaultMenu = {
    before: `*_❏ Bot Name : [ BOT MERAH🔥 ]_*
*_❏ Prefix : [ %p ]_*
*_❏ Platform : [ panel ]_*
*_❏ Runtime : [ %muptime ]_*
*_❏ Date : [ %date ]_*
*_❏ Database : [ %totalreg ]_*
%readmore
`.trimStart(),
    header: '╭───「 \t*%category* 」',
    body: `\t│ ◦ _%cmd_ %isPremium`,
    footer: '╰──────────✧',
    after: `\n*ꜱɪᴍᴘʟᴇ ʙᴏᴛ ʙʏ ᴇʟ ᴅᴇ ʟʏɴx*\n╰─｟ *ʟʏɴxʙᴏᴛ - ᴍᴅ* ｠─╯`,
  };

  try {
    let name = m.pushName || await conn.getName(m.sender);
    let d = new Date(Date.now() + 3600000);
    let locale = 'en';
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    });
    let time = d.toLocaleTimeString(locale, {
      timeZone: 'Asia/Jakarta'
    }).replace(/[.]/g, ':');

    let _muptime = await getUptime();
    let _uptime = await getUptime();

    let totalreg = Object.keys(global.db.data.users).length;
    let platform = os.platform();
    let muptime = clockString(_muptime);
    let uptime = clockString(_uptime);

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }));

    for (let plugin of help) {
      if (plugin && 'tags' in plugin) {
        for (let tag of plugin.tags) {
          if (!(tag in tags) && tag) tags[tag] = tag;
        }
      }
    }

    conn.menu = conn.menu || {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after = conn.menu.after || defaultMenu.after;

    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                         .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                         .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '').trim();
            }).join('\n');
          }),
          footer
        ].join('\n');
      }),
      after
    ].join('\n');

    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : '';
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: await conn.getName(conn.user.jid),
      name, date, time, platform, totalreg,
      readmore: readMore
    };
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name]);

    await conn.sendMessage(m.chat, {
      text: text.trim(),
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `ᴇʟʟ`,
          body: creator, // Replace with the actual creator's name or a variable
          thumbnailUrl: ell, // Replace with the actual URL to the thumbnail image or a variable
          sourceUrl: `https://chat.whatsapp.com/Bpzg40FTgYa9trttCoFEKi`,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = /^(allmenu|menuall)$/i;
handler.register = true;

module.exports = handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

async function getUptime() {
  if (process.send) {
    process.send('uptime');
    return await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(() => resolve(0), 1000); // Set default uptime to 0 if no response
    }) * 1000;
  }
  return 0; // Return 0 if process.send is not available
}
