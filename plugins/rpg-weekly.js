const rewards = {
  exp: 15000,
  money: 35999,
  limit: 30,
}
const cooldown = 604800000
let handler = async (m, { usedPrefix }) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastweekly < cooldown) {
    let remainingTime = msToTime(user.lastweekly + cooldown - new Date())
    return m.reply(`You have already claimed *weekly rewards*, please wait until the cooldown finishes.\n\nCooldown remaining: ${remainingTime}`)
  }
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  m.reply(text.trim())
  user.lastweekly = new Date * 1
}
handler.help = ['weekly']
handler.tags = ['rpg']
handler.command = /^(weekly)$/i
handler.register = true
handler.cooldown = cooldown
module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor(duration / (1000 * 60 * 60 * 24));

  days = (days < 10) ? "0" + days : days;
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}
