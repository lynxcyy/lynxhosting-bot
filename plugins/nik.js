const nikParser = require('nikparser'); 

const handler = async (m, { conn, command, args, isOwner}) => {
  if (!isOwner) return m.reply('lu bukan dev cok');
  if (!q) return m.reply(`</> Anda harus mendapatkan nik target terlebih dahulu dan lakukan command seperti ini: ${prefix + command} 16070xxxxx\n\n`);
  
  const ktp = q;
  const nik = nikParser(ktp);
  
  m.reply(`Nik: ${nik.isValid()}\nProvinsi ID: ${nik.provinceId()}\nNama Provinsi: ${nik.province()}\nKabupaten ID: ${nik.kabupatenKotaId()}\nNama Kabupaten: ${nik.kabupatenKota()}\nKecamatan ID: ${nik.kecamatanId()}\nNama Kecamatan: ${nik.kecamatan()}\nKode Pos: ${nik.kodepos()}\nJenis Kelamin: ${nik.kelamin()}\nTanggal Lahir: ${nik.lahir()}\nUniqcode: ${nik.uniqcode()}`);
  break;
  

handler.help = ['nikparser'].map(v => v + ' <NIK>');
handler.tags = ['tools'];
handler.rowner = true
handler.owner = true
handler.command = /^(nik|nikparser|dox)$/i;
module.exports = handler