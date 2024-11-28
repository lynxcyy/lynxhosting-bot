const xpperlimit = 1
let handler = async (m, { conn, command, args }) => {
  let user = db.data.users[m.sender]
  let all = command.replace(/^tarik|pull/i, '')
  let count = all ? all : args[0]
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].bank / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.atm == 0) return m.reply('kamu belum mempuyai kartu ATM !')
  if (global.db.data.users[m.sender].bank >= xpperlimit * count) {
    global.db.data.users[m.sender].bank -= xpperlimit * count
    global.db.data.users[m.sender].money += count
    conn.reply(m.chat, `Sukses menarik sebesar ${count} Money 💰`, m)
  } else conn.reply(m.chat, `[❗] Uang dibank anda tidak mencukupi untuk ditarik sebesar ${count} money 💰`, m)
}
handler.help = ['tarik <jumlah>']
handler.tags = ['rpg']
handler.command = /^tarik([0-9]+)|tarik|tarikall|pull([0-9]+)|pull(all)$/i
handler.limit = 5
handler.register = true;
module.exports = handler