let handler = async (m, {
  conn,
  args,
  command
}) => {
  let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length
  conn.reply(m.chat, `total current features : ${totalf}`, m)
}
handler.help = ['totalfeatures']
handler.tags = ['info']
handler.command = /^(total(fitur|feature(s))?)$/i
handler.register = true;
module.exports = handler
