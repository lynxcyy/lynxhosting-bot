let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    const cooldown = 86400000;
    const now = new Date().getTime();
    if (!user.lastnguli) user.lastnguli = 0;
    const timeElapsed = now - user.lastnguli;
    const timeLeft = cooldown - timeElapsed;
    
    if (timeElapsed > cooldown) {
        user.limit += 10;
        m.reply('_🎉Selamat kamu mendapatkan +10 limit_');
        user.lastnguli = now;
    } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        m.reply(`[💬] Anda sudah mengklaim upah nguli hari ini. Tunggu ${hours} jam ${minutes} menit ${seconds} detik lagi.`);
    }
}

handler.help = ['nguli'];
handler.tags = ['rpg'];
handler.command = /^(nguli)$/i;
handler.register = true;
handler.limit = true;
module.exports = handler;
