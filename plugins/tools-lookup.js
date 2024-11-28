const fetch = require('node-fetch');

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan Domain/Sub Domain/IP!\n\n*Contoh:* botcahx.eu.org atau 8.8.8.8`;

  if (text.includes('https://') || text.includes('http://')) throw `Tolong masukkan domain/sub domain/IP secara lengkap. Contoh: botcahx.eu.org atau 8.8.8.8`;

  const isIpAddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(text);

  try {
    let res;
    switch (command) {
      case 'dnslookup':
      case 'dns':
      case 'lookup':
        if (isIpAddress) {
          throw 'Tolong masukkan domain, bukan alamat IP.';
        }
        res = await fetch(`https://api.hackertarget.com/dnslookup/?q=${text}`)
          .then(response => response.text())
          .catch(error => {
            console.error(error);
            throw 'Tidak dapat memproses permintaan DNS Lookup';
          });
        m.reply(`*Ini Adalah Hasil DNS Lookup Untuk ${text}:*\n${res}`);
        console.log(res);
        break;

      case 'checkip':
      case 'ipcek':
      case 'cekip':
      case 'ip':
      case 'iplookup':
       if (!text) return m.reply(Func.example(usedPrefix, command, '127.0.0.0'))
    m.react('🕒')
    const json = await Func.fetchJson(API('alya', '/api/ip', { q: text }, 'apikey'))
    if (!json.status) return m.reply(Func.jsonFormat(json))
    let cap = `–  *I P C H E C K*\n\n`
    cap += `  ◦  *Country* : ` + json.data.country + `\n`
    cap += `  ◦  *Code* : ` + json.data.countryCode + `\n`
    cap += `  ◦  *Region* : ` + json.data.region + `\n`
    cap += `  ◦  *Region Name* : ` + json.data.regionName + `\n`
    cap += `  ◦  *City* : ` + json.data.city + `\n`
    cap += `  ◦  *Zip* : ` + json.data.zip + `\n`
    cap += `  ◦  *Lat* : ` + json.data.lat + `\n`
    cap += `  ◦  *Lon* : ` + json.data.lon + `\n`
    cap += `  ◦  *TimeZone* : ` + json.data.timezone + `\n`
    cap += `  ◦  *Isp* : ` + json.data.isp + `\n`
    cap += `  ◦  *Org* : ` + json.data.org + `\n`
    cap += `  ◦  *As* : ` + json.data.as + `\n\n`
    cap += global.set.footer
    m.reply(cap)
        break;

      default:
        throw `Perintah tidak dikenali! Gunakan salah satu dari: ${usedPrefix}dnslookup, ${usedPrefix}iplookup, atau ${usedPrefix}checkip`;
    }

  } catch (error) {
    console.error(error);
    m.reply('*Invalid data!*');
  }
};

handler.command = ['dnslookup', 'lookup', 'dns', 'iplookup', 'ip', 'checkip'];
handler.help = ['dnslookup', 'iplookup'];
handler.tags = ['tools'];
handler.premium = false;

module.exports = handler;
