const { generateWAMessageFromContent, generateWAMessageContent, proto } = require('@whiskeysockets/baileys');

let handler = async (m, { conn, usedPrefix, command, isOwner, text }) => {
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg');
    let fkon = { key: { participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': `© ʟʏɴxʙᴏᴛ`,}}}

    let caption = `\`</BROADCAST SLIDE>\`
    By: @${m.sender.split('@')[0]}`;
    const delay = time => new Promise(res => setTimeout(res, time));
    let getGroups = await conn.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
    let anu = groups.map(v => v.id);
    var pesan = m.quoted && m.quoted.text ? m.quoted.text : text;
    if (!pesan) return m.reply('teksnya?')
    
    for (let i of anu) {
        await delay(500);
        let [pesan, tek, teks, inbox] = text.split('|');
        if (!pesan || !tek || !teks || !inbox) return m.reply(`[❗] *Masukan Text:*\n\nPenggunaan: /${usedPrefix + command} text|text|text|text\n\n*Contoh:* ${usedPrefix + command} Halo|Aku|Pedo|Salam kenal yah`);

        const url = "https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg";
        async function image(url) {
            const { imageMessage } = await generateWAMessageContent({
                image: { url }
            }, {
                upload: conn.waUploadToServer
            });
            return imageMessage;
        }

        let msg = generateWAMessageFromContent(
            i,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: caption },
                            contextInfo: {
                                mentionedJid: conn.parseMention(caption),
                                quoted: [m],
                                isForwarded: true,
                                forwardingScore: 99999,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363297027027445@newsletter',
                                    newsletterName: 'Powered By LYNX HOSTING⚡!',
                                    serverMessageId: null,
                                },
                            },
                            carouselMessage: {
                                cards: [
                                    {
                                        header: {
                                            imageMessage: await image(url),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: pesan },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"👤 Chat Owner","url":"https://wa.me/6281222844295","merchant_url":"https://wa.me/6281222844295"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"💬 Follow","url":"https://whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W","merchant_url":"https://whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W"}`
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        header: {
                                            imageMessage: await image(url),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: tek },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"👤 Chat Owner","url":"https://wa.me/6281222844295","merchant_url":"https://wa.me/6281222844295"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"💬 Follow","url":"https://whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W","merchant_url":"https://whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W"}`
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        header: {
                                            imageMessage: await image(url),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: teks },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"👤 Chat Owner","url":"https://wa.me/6281222844295","merchant_url":"https://wa.me/6281222844295"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"💬 Follow","url":"https://whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W","merchant_url":"https://whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W"}`
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        header: {
                                            imageMessage: await image(url),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: inbox },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"👤 Chat Owner","url":"https://wa.me/6281222844295","merchant_url":"https://wa.me/6281222844295"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"💬 Follow","url":"https://whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W","merchant_url":"https://whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W"}`
                                                },
                                            ],
                                        },
                                    },
                                ],
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkon }
        );

        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
        }).catch(_ => _);
    }
    m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`);
}

handler.help = ['bcgcslide <teks>'];
handler.tags = ['owner'];
handler.command = /^(bcgcslide|bcgcs)$/i;
handler.owner = true;

module.exports = handler;