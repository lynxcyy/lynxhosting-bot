const { nikParser } = require('nik-parser');

const handler = async (m, { conn, command, usedPrefix, args, isOwner }) => {
  if (!isOwner) return m.reply('lu bukan dev cok');
  if (!args[0]) return m.reply(`</> Anda harus mendapatkan nik target terlebih dahulu dan lakukan command seperti ini: ${usedPrefix + command} 16070xxxxx\n\n`);
  
  const ktp = args[0];
  const nik = nikParser(ktp);
  
  let response = `Nik: ${nik.isValid()}\nProvinsi ID: ${nik.provinceId()}\nNama Provinsi: ${nik.province()}\nKabupaten ID: ${nik.kabupatenKotaId()}\nNama Kabupaten: ${nik.kabupatenKota()}\nKecamatan ID: ${nik.kecamatanId()}\nNama Kecamatan: ${nik.kecamatan()}\nKode Pos: ${nik.kodepos()}\nJenis Kelamin: ${nik.kelamin()}\nTanggal Lahir: ${nik.lahir()}\nUniqcode: ${nik.uniqcode()}`;

  // Check if there is a name property
  if (nik.name) {
    response += `\nNama: ${nik.name}`;
  }

  // Log all properties of the nik object
  console.log('All properties of nik object:', nik);

  m.reply(response);
};
handler.help = ['nikparser'].map(v => v + ' <NIK>');
handler.tags = ['tools'];
handler.rowner = true;
handler.owner = true;
handler.command = /^(nik|nikparser|dox)$/i;

module.exports = handler;