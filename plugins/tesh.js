let handler = async (m, {
conn,
usedPrefix,
command,
isOwner
}) => {
if (!isOwner) return m.reply ("lu bkn owner gua jing")
m.reply ("on kak!")
}
handler.command = 'tesh'
module.exports = handler