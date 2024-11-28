const { randomBytes } = require('crypto');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

let handler = async function(m, { text, args, usedPrefix, command }) {
  if (!args[0]) return await m.reply(`Enter a list of events, Example: ${usedPrefix + command} Event Name|Event Description|Event Location|Event Link`);

  let [cName, cDesc, cLoc, cLink] = text.split("|").map((item) => item.trim());
  cName = anu(cName, 'Event');
  cDesc = anu(cDesc, 'Ada acara nie');
  cLoc = anu(cLoc, 'Indonesia');
  cLink = anu(cLink, 'https://cylic.vercel.app');

  // Set the event date and time to 21 August 2024, 15:00 GMT
  let eventDate = new Date(Date.UTC(2024, 7, 21, 15, 0)).getTime(); // August is month 7 (0-based)

  let msg = generateWAMessageFromContent(m.chat, {
    messageContextInfo: {
      messageSecret: randomBytes(32)
    },
    eventMessage: {
      isCanceled: false,
      name: cName,
      description: cDesc,
      location: {
        degreesLatitude: 0,
        degreesLongitude: 0,
        name: cLoc
      },
      joinLink: cLink,
      startTime: eventDate
    }
  }, {});

  return conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  });
}

handler.help = ["event"].map((a) => a + " *(pesan)*");
handler.tags = ["group"];
handler.command = ["event"];
handler.group = true;

module.exports = handler;

function anu(vl, cylic) {
  return vl && vl.trim() ? vl.trim() : cylic;
}