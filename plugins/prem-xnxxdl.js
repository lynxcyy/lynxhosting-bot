const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply('Masukkan Link!');
    try {
        await m.reply('Please wait...');

        // Fetch video data
        const response = await fetch(`https://api.botcahx.eu.org/api/download/xnxxdl?url=${text}&apikey=OwtgrEPf`);
        
        const hasil = await response.json();
        const videoUrl = hasil.result.url;

        // Define the path to the tmp directory
        const tmpDir = path.join(__dirname, '../tmp'); // Adjust path to point one level up

        // Log the tmpDir path for debugging
        console.log('Temporary Directory:', tmpDir);

        // Ensure the temporary directory exists
        if (!fs.existsSync(tmpDir)) {
            console.log('Creating tmp directory...');
            fs.mkdirSync(tmpDir, { recursive: true }); // Create the directory if it doesn't exist
        }

        // Generate a random file name for the video
        const fileName = `xnxx_${Date.now()}.mp4`;
        const filePath = path.join(tmpDir, fileName);

        // Log the filePath for debugging
        console.log('File Path:', filePath);

        // Download and save the video
        const videoStream = await fetch(videoUrl);
        const fileStream = fs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
            videoStream.body.pipe(fileStream);
            videoStream.body.on("error", reject);
            fileStream.on("finish", resolve);
        });

        // Send the video
        await conn.sendMessage(m.chat, { 
            video: { url: filePath }, 
            fileName: fileName, 
            mimetype: 'video/mp4' 
        }, { quoted: m });

        // Optionally delete the file after sending
        fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
        });
    } catch (e) {
        console.error(e);
        throw '*Server error!*';
    }
}

handler.command = /^xnxxd(l|own)$/i;
handler.help = ['xnxxdl'];
handler.tags = ['downloader', 'premium'];
handler.premium = true;

module.exports = handler;