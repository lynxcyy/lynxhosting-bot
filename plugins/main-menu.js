const { 
   BufferJSON, 
   WA_DEFAULT_EPHEMERAL, 
   generateWAMessageFromContent, 
   proto, 
   generateWAMessageContent, 
   generateWsAMessage, 
   prepareWAMessageMedia, 
   areJidsSameUser, 
   getContentType 
} = require('@whiskeysockets/baileys')

process.env.TZ = 'Asia/Jakarta'
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let levelling = require('../lib/levelling')


let arrayMenu = [
   'ai',
   'bug',
   'database',
   'downloader',
   'effect',
   'fun',
   'game',
   'group',
   'info',
   'internet',
   'maker',
   'nsfw',
   'owner',
   'panel',
   'premium',
   'rpg',
   'sticker',
   'tools',
   'voice',
   'vps',
]

const allTags = {
    'ai': 'Menu AI',
    'bug': 'Bug Menu⚠️',
    'database': 'Database',
    'downloader': 'Downloader',
    'effect': 'Effect',
    'fun': 'Fun',
    'game': 'Game',
    'group': 'Group',
    'info': 'Info',
    'internet': 'Internet',
    'maker': 'Maker',
    'nsfw': 'PEKOB',
    'owner': 'Owner',
    'panel': 'Panel',
    'premium': 'Premium',
    'rpg': 'RPG',
    'sticker': 'Sticker',
    'tools': 'Tools',
    'voice': 'Voice Effect',
    'vps': 'VPS',
}

const defaultMenu = {
   before: `
Hi %name
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.

◦ *Library:* Baileys
◦ *Function:* Assistant

┌  ◦ Uptime : %uptime
│  ◦ Tanggal : %date
│  ◦ Waktu : %time
└  ◦ Prefix Used : *[ %p ]*
`.trimStart(),
   header: '┌  ◦ *%category*',
   body: '│  ◦ %cmd %islimit %isPremium',
   footer: '└  ',
   after: `*Note:* Ketik .menu <category> untuk melihat menu spesifik\nContoh: .menu tools\n.menuall untuk menampilkan semua menu`
}

let handler = async (m, { conn, usedPrefix: _p, args = [], command }) => {
   try {
       let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
       let { exp, limit, level, role } = global.db.data.users[m.sender]
       let { min, xp, max } = levelling.xpRange(level, global.multiplier)
       let name = `@${m.sender.split`@`[0]}`
       let teks = args[0] || ''
       
       // Time settings 
       let d = new Date(new Date + 3600000)
       let locale = 'id'
       let date = d.toLocaleDateString(locale, {
           day: 'numeric',
           month: 'long',
           year: 'numeric'
       })
       
       let time = d.toLocaleTimeString(locale, {
           hour: 'numeric',
           minute: 'numeric',
           second: 'numeric'
       })

       let _uptime = process.uptime() * 1000
       let uptime = clockString(_uptime)
       
       // Get help list
       let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
           return {
               help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
               tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
               prefix: 'customPrefix' in plugin,
               limit: plugin.limit,
               premium: plugin.premium,
               enabled: !plugin.disabled,
           }
       })

       // main menu 
       if (!teks) {
           let menuList = `${defaultMenu.before}\n\n┌  ◦ *DAFTAR MENU*\n`
           for (let tag of arrayMenu) {
               if (tag && allTags[tag]) {
                   menuList += `│  ◦ ${_p}menu ${tag}\n`
               }
           }
           menuList += `└  \n\n${defaultMenu.after}`

           // Replace placeholders nya
           let replace = {
               '%': '%',
               p: _p, 
               uptime,
               name, 
               date,
               time
           }

           let text = menuList.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), 
               (_, name) => '' + replace[name])

           await conn.relayMessage(m.chat, {
               extendedTextMessage:{
                   text: text,
                   contextInfo: {
                       mentionedJid: [m.sender],
                       externalAdReply: {
                           title: date,
                           mediaType: 1,
                           previewType: 0,
                           renderLargerThumbnail: true,
                           thumbnailUrl: 'https://telegra.ph/file/3a34bfa58714bdef500d9.jpg',
                           sourceUrl: 'https://www.whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W'
                       }
                   },
                   mentions: [m.sender]
               }
           }, {})
           return
       }

       if (!allTags[teks]) {
           return m.reply(`Menu "${teks}" tidak tersedia.\nSilakan ketik ${_p}menu untuk melihat daftar menu.`)
       }

       let menuCategory = defaultMenu.before + '\n\n'
       menuCategory += defaultMenu.header.replace(/%category/g, allTags[teks]) + '\n'
       
       let categoryCommands = help.filter(menu => menu.tags && menu.tags.includes(teks) && menu.help)
       
       for (let menu of categoryCommands) {
           for (let help of menu.help) {
               menuCategory += defaultMenu.body
                   .replace(/%cmd/g, menu.prefix ? help : _p + help)
                   .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                   .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '') + '\n'
           }
       }
       
       menuCategory += defaultMenu.footer + '\n\n' + defaultMenu.after

       let replace = {
           '%': '%',
           p: _p, 
           uptime, 
           name,
           date,
           time
       }

       let text = menuCategory.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), 
           (_, name) => '' + replace[name])

       await conn.relayMessage(m.chat, {
           extendedTextMessage:{
               text: text, 
               contextInfo: {
                   mentionedJid: [m.sender],
                   externalAdReply: {
                       title: date,
                       mediaType: 1,
                       previewType: 0,
                       renderLargerThumbnail: true,
                       thumbnailUrl: 'https://telegra.ph/file/3a34bfa58714bdef500d9.jpg',
                       sourceUrl: 'https://www.whatsapp.com/channel/0029Vae9KCRJENxuheUogl2W'
                   }
               }, 
               mentions: [m.sender]
           }
       }, {})

   } catch (e) {
       conn.reply(m.chat, 'Maaf, menu sedang error', m)
       console.error(e)
   }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|bot)$/i
handler.exp = 3

module.exports = handler

function clockString(ms) {
   if (isNaN(ms)) return '--'
   let h = Math.floor(ms / 3600000)
   let m = Math.floor(ms / 60000) % 60
   let s = Math.floor(ms / 1000) % 60
   return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}