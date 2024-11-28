const items = ['money', 'chip', 'diamond', 'bank', 'emerald', 'gold'];

let handler = async (m, { conn, args, usedPrefix }) => {
    let user = db.data.users[m.sender];
    let item = items.filter(v => v in user && typeof user[v] === 'number');
    let type = (args[0] || '').toLowerCase();

    // Check if the type is valid
    if (!item.includes(type)) {
        return m.reply(`*List Item:*\n${item.map(v => `${rpg.emoticon(v)} ${v}`).join('\n')}\n\nExample:\n${usedPrefix}judi diamond 100`);
    }

    // Parse the count value
    let count = (args[1] && isNumber(parseInt(args[1])) 
        ? Math.max(parseInt(args[1]), 1) 
        : /all/i.test(args[1]) 
            ? user[type]
            : 1) * 1;

    // Check if the user has enough of the specified item
    if ((user[type] * 1) < count) {
        return m.reply(`*${type} ${rpg.emoticon(type)}* kamu tidak cukup!!`);
    }

    let moneyDulu = user[type] * 1;

    try {
        let Bot = (Math.ceil(Math.random() * 91)) * 1;
        let Kamu = (Math.floor(Math.random() * 71)) * 1;
        let status = 'Kalah';

        if (Bot < Kamu) {
            user[type] += count * 1;
            status = 'Menang';
        } else if (Bot > Kamu) {
            user[type] -= count * 1;
        } else {
            status = 'Seri';
            user[type] += (Math.floor(count / 1.5)) * 1;
        }

        m.reply(`
| *PLAYERS* | *POINT* |
*🤖 BOT:*      ${Bot}
*👤 KAMU:*    ${Kamu}

Kamu *${status}*, kamu ${status === 'Menang' 
    ? `Mendapatkan *+${count * 2}*` 
    : status === 'Kalah' 
        ? `Kehilangan *-${count}*` 
        : `Mendapatkan *+${Math.floor(count / 1.5)}*`} *${type} ${rpg.emoticon(type)}*
`.trim());
    } catch (e) {
        if (moneyDulu > (user[type] * 1)) user[type] = moneyDulu * 1;
        m.reply('Error saat melakukan judi (Rejected)');
    }
};

handler.help = ['judi [jumlah]'];
handler.tags = ['rpg'];
handler.command = /^(judi|bet)$/i;
handler.register = true;
handler.limit = 5;
module.exports = handler;

function isNumber(x) {
    return !isNaN(x) && typeof x === 'number';
}
