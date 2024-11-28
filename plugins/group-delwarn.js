let handler = async (m, { conn, args, groupMetadata }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) return m.reply('✳️ Memberi label atau menyebut seseorang')

    if (args[0] === 'all') {
        let isAdmin = m.isGroup ? (groupMetadata.admins || []).includes(m.sender) : false
        let isOwner = global.owner.includes(m.sender.split('@')[0])

        if (!isAdmin && !isOwner) {
            return m.reply('✳️ Perintah ini hanya bisa digunakan oleh admin grup atau owner')
        }
        for (let user in global.db.data.users) {
            global.db.data.users[user].warn = 0
        }

        return m.reply('⚠️ *PERINGATAN* \n\n▢ Berhasil Menghapus semua Warning\n▢ Total Warning Yang Dimiliki Pengguna: *0*')
    }

    if (!(who in global.db.data.users)) return m.reply('✳️ Pengguna Tidak Terdaftar Di Database Bot!')

    let isAdmin = m.isGroup ? (groupMetadata.admins || []).includes(m.sender) : false
    let isOwner = global.owner.includes(m.sender.split('@')[0])

    if (!isAdmin && !isOwner) {
        return m.reply('✳️ Perintah ini hanya bisa digunakan oleh admin grup atau owner')
    }

    let warn = global.db.data.users[who].warn
    if (warn > 0) {
        global.db.data.users[who].warn -= 1
        m.reply(`⚠️ *PERINGATAN*
         
▢ Berhasil Menghapus 1 Warning
▢ Total Warning Yang Dimiliki Pengguna: *${warn - 1}*`)
    } else if (warn == 0) {
        m.reply('✳️ Pengguna tidak memiliki peringatan')
    }
}

handler.help = ['delwarn @user']
handler.tags = ['group', 'owner']
handler.command = ['delwarn', 'unwarn']
handler.register = true
module.exports = handler
