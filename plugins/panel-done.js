const handler = async (m, { args, isOwner }) => {
    if (!isOwner) return m.reply('Njirr Lu siapa Cuk');

    if (!args[0] || !args[1] || !args[2]) {
        return m.reply('Salah cara penggunaan yang benar: .done barang jumlah harga');
    }

    const barang = args[0];
    const jumlah = args[1];
    const harga = `Rp${args[2]}`;
    
    const teks = `*TRANSAKSI TELAH BERHASIL DILAKUKAN✅*
📦Barang = ${barang}
📥Jumlah = ${jumlah}
💴Harga = ${harga}`;

    await m.reply(teks);
};
handler.help = ['done']
handler.command = ['done', 'don'];
handler.tags = ['panel'];
handler.register = true;

module.exports = handler;