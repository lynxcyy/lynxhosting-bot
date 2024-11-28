let handler = async (m) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    m.reply(`*Jumlah database saat ini ${totalreg} user*`)
}
handler.help = ['jumlahuser']
handler.tags = ['info']
handler.command = /^(db|jumlah(db|user))$/i
module.exports = handler