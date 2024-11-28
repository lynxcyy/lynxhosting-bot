const fetch = require('node-fetch')
let handler = async (m, {
    conn
}) => {
    const response = await fetch("https://techy-api.vercel.app/api/json");
    const data = await response.json();
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    await conn.sendMessage(m.chat, {
        text: data.message,
        contextInfo: {
            externalAdReply: {
                    title: "Bot is active✅\ntype .menu to display the menu",
                    thumbnail: await (await conn.getFile("https://cdn-icons-png.flaticon.com/128/12225/12225958.png")).data
                },
            mentionedJid: [m.sender],
        },
    }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.customPrefix = /^(bot|bot?|bott|p|P)$/i
handler.command = new RegExp
module.exports = handler;