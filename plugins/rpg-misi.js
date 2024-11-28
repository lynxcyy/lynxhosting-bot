const fs = require ('fs')
   
    let handler = async (m, { conn, usedPrefix }) => {
    let sections = [{
        name: 'single_select',
        buttonParamsJson: JSON.stringify({
            title: 'Tap Here!',
            sections: [{
                title: 'MISI',
                rows: [
                    {
                        title: "「🛵」Ojek",
                        description: "Menjadi Tukang Ojek Untuk Mendapatkan Money",
                        id: '.ojek'
                    },
                    {
                        title: "「🚀」Roket",
                        description: "Meluncurkan Roket Untuk Menghancurkan Dunia Dan Mendapatkan Money",
                        id: '.roket'
                    },
                    {
                        title: "「👮」Polisi",
                        description: "Jadi Polisi Dan Tangkap Penjahat Untuk Mendapatkan Money",
                        id: '.polisi'
                    },
                    {
                        title: "「🥷」Rob",
                        description: "Merampok Bank Untuk Mendapatkan Money",
                        id: '.rob'
                    },
                    {
                        title: "「☠️」Hitman",
                        description: "Menjadi Hitman Dan Bunuh Seseorang",
                        id: '.bunuh'
                    },
                    {
                        title: "「🚖」Taxy",
                        description: "Menjadi Supir Taxy Dan Mendapatkan Money",
                        id: '.taxy'
                    }
                ]
            }]
        })
    }];

    await conn.sendAIMessage(m.chat, sections, m, {
        header: 'ʟʏɴxʙᴏᴛ',
        content: 'Silahkan Pilih Misi Yang Tersedia',
        footer: global.set.footer,
        media: fs.readFileSync('./media/ell.jpg')
    });
};

handler.help = ['misi', 'misirpg'];
handler.tags = ['info'];
handler.command = /^(misi(rpg)?|misirpg)$/i;
handler.register = true;
module.exports = handler;
