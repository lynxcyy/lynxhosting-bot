let { WAMessageStubType } = require('@whiskeysockets/baileys');
let urlRegex = require('url-regex-safe')({ strict: false });
let PhoneNumber = require('awesome-phonenumber');
let terminalImage = global.opts['img'] ? require('terminal-image') : '';
let chalk = require('chalk');
let fs = require('fs');
let moment = require('moment-timezone');

module.exports = async function (m, conn = { user: {} }) {
  let _name = await conn.getName(m.sender);
  let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (_name ? ' ~' + _name : '');
  let chat = await conn.getName(m.chat);

  let img;
  try {
    if (global.opts['img']) img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false;
  } catch (e) {
    console.error(e);
  }

  let filesize = (m.msg ? m.msg.vcard ? m.msg.vcard.length : m.msg.fileLength ? m.msg.fileLength.low || m.msg.fileLength : m.msg.axolotlSenderKeyDistributionMessage ? m.msg.axolotlSenderKeyDistributionMessage.length : m.text ? m.text.length : 0 : m.text ? m.text.length : 0) || 0;
  let user = global.DATABASE.data.users[m.sender];
  let me = PhoneNumber('+' + (conn.user && conn.user.jid).replace('@s.whatsapp.net', '')).getNumber('international');

  let logOutput = `${chalk.black(chalk.bgYellow((m.messageTimestamp ? moment(1000 * (m.messageTimestamp.low || m.messageTimestamp)).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') : moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'))))}
${chalk.black(chalk.bgGreen(m.messageStubType ? WAMessageStubType[m.messageStubType] : ''))}
${chalk.green(`${filesize} [${(filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1))}${['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || ''}B]`)}
${chalk.cyan(`from:`)} ${chalk.yellow(sender)} ${chalk.yellow(`${m ? m.exp : '?'}${user ? '|' + user.exp + '|' + user.limit : ''}${'|' + user.level}`)}
${chalk.cyan('to:')} ${chalk.magenta(m.chat + (chat ? ' ~' + chat : ''))}
${chalk.cyan('type:')} ${chalk.black(chalk.bgYellow(m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''))}`.trim();

  if (img) logOutput += `\n${img.trimEnd()}`;
  if (typeof m.text === 'string' && m.text) {
    let log = m.text.replace(/\u200e+/g, '');
    let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g;
    let mdFormat = (depth = 4) => (_, type, text, monospace) => {
      let types = {
        _: 'italic',
        '*': 'bold',
        '~': 'strikethrough'
      };
      text = text || monospace;
      let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
      return formatted;
    };
    if (log.length < 4096)
      log = log.replace(urlRegex, (url, i, text) => {
        let end = url.length + i;
        return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.hex('#00008B')(url) : url; // Dark blue for URLs
      });
    log = log.replace(mdRegex, mdFormat(4));
    if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + await conn.getName(user)));
    logOutput += `\n${chalk.cyan('message: ')}${m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : chalk.white(log)}`;
  }
  if (m.messageStubParameters) logOutput += `\n${m.messageStubParameters.map(jid => {
    jid = conn.decodeJid(jid);
    let name = conn.getName(jid);
    return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : ''));
  }).join(', ')}`;
  if (/document/i.test(m.mtype)) logOutput += `\n📄 ${m.msg.filename || m.msg.displayName || 'Document'}`;
  else if (/ContactsArray/i.test(m.mtype)) logOutput += `\n👨‍👩‍👧‍👦 ${' ' || ''}`;
  else if (/contact/i.test(m.mtype)) logOutput += `\n👨 ${m.msg.displayName || ''}`;
  else if (/audio/i.test(m.mtype)) {
    let s = m.msg.seconds;
    logOutput += `\n${m.msg.ptt ? '🎤 (PTT ' : '🎵 ('}AUDIO) ${Math.floor(s / 60).toString().padStart(2, 0)}:${(s % 60).toString().padStart(2, 0)}`;
  }

  // Print the log output
  console.log(logOutput);

  // Print the separator line
  console.log(chalk.red('──────────────────────────────────────────────────────────────────'));
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'lib/print.js'"));
  delete require.cache[file];
});
