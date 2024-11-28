const { performance } = require("perf_hooks");
const axios = require("axios");
const os = require("os");
const util = require("util");
const { sizeFormatter } = require("human-readable");

const osInfo = "linux";
const serverInfo = "AMD EPYC 7702";
const cpuCore = 64;

const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
    return cpu;
});

const cpu = cpus.reduce(
    (last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
    },
    {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0,
        },
    }
);

// Informasi RAM
const totalRAM = 64000000; 
const freeRAM = 48000000; 

const handler = async (m, { conn }) => {
    const uptime = os.uptime();
    const uptimeFormatted = formatUptime(uptime);
    
    const txt = `
┌ ◦\t*ᴜ ᴘ ᴛ ɪ ᴍ ᴇ* 
└ ◦\t${uptimeFormatted}

┌ ◦\t*s ᴇ ʀ ᴠ ᴇ ʀ*
│ ◦\t*🧿 sᴇʀᴠᴇʀ:* 9691daca-11c8-47b8-b0f6-a30a44739803
│ ◦\t*💻 ᴏs:* ${osInfo}
└ ◦\t*🛑 ʀᴀᴍ:* ${format(freeRAM)} GB / ${format(totalRAM)} GB

_CPU Core(s) Usage (${cpuCore} Core CPU)_
AMD EPYC 7732 (3.35 GHz)\n${Object.keys(cpu.times)
        .map(
            (type) =>
                `- *${(type + "*").padEnd(6)}: ${(
                    (100 * cpu.times[type]) /
                    cpu.total
                ).toFixed(2)}%`
        )
        .join("\n")}
`;

    conn.relayMessage(m.chat, {
        extendedTextMessage: {
            text: txt, 
            contextInfo: {
                externalAdReply: {
                    title: "",
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://telegra.ph/file/ec8cf04e3a2890d3dce9c.jpg',
                    sourceUrl: ''
                }
            },
            mentions: [m.sender]
        }
    }, {});
};

async function getUptime() {
    if (process.send) {
        process.send('uptime');
        return new Promise(resolve => {
            process.once('message', resolve);
            setTimeout(resolve, 1000);
        }) * 1000;
    }
}

function formatUptime(uptime) {
    let seconds = Math.floor(uptime % 60);
    let minutes = Math.floor((uptime / 60) % 60);
    let hours = Math.floor((uptime / (60 * 60)) % 24);
    let days = Math.floor(uptime / (60 * 60 * 24));

    let formattedUptime = '';
    if (days > 0) formattedUptime += `${days} days `;
    if (hours > 0) formattedUptime += `${hours} hours `;
    if (minutes > 0) formattedUptime += `${minutes} minutes `;
    if (seconds > 0) formattedUptime += `${seconds} seconds`;

    return formattedUptime;
}

handler.help = ['server'];
handler.tags = ['info'];
handler.command = /^(server|uptime)$/i;

module.exports = handler;

function format(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
}
