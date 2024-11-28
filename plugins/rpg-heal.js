let handler = async (m, { args }) => {
    let user = global.db.data.users[m.sender];
    if (user.health >= 100) return m.reply(`
Your ❤️health is full!
`.trim());
    const heal = 40 + (user.cat * 4);
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1;
    if (user.potion < count) return m.reply(`You need to buy ${count - user.potion} more 🥤potion to heal.
You have ${user.potion} 🥤potion in the bag.`.trim());
    user.potion -= count * 1;
    user.health += heal * count;
    m.reply(`Successfully used ${count} 🥤potion to recover health.`, null, {
        thumbnail: 'https://telegra.ph/file/51033b3c3a3ce954ea593.png'
    });
}

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = /^(heal)$/i;
handler.register = true;
handler.limit = true;
module.exports = handler;

function isNumber(number) {
    if (!number) return number;
    number = parseInt(number);
    return typeof number == 'number' && !isNaN(number);
}