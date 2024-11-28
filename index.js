let cluster = require('cluster');
let path = require('path');
let fs = require('fs');
let package = require('./package.json');
const CFonts = require('cfonts');
const Readline = require('readline');
const yargs = require('yargs/yargs');
const rl = Readline.createInterface(process.stdin, process.stdout);

const listcolor = ['red', 'blue', 'magenta'];
const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)];

/**
 * Fungsi untuk sleep dengan delay tertentu
 * @param {number} ms - Waktu dalam milidetik
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verifyLogin() {
    try {
        const secretBangetJir = await fetch('https://raw.githubusercontent.com/permenmd/cache/main/sigma.txt');
        const password = await secretBangetJir.text();

        console.log('|| ▓░░░░░░░░░ || 10%');
        await sleep(500);
        console.log('|| ▓▓░░░░░░░░ || 20%');
        await sleep(500);
        console.log('|| ▓▓▓░░░░░░░ || 30%');
        await sleep(500);
        console.log('|| ▓▓▓▓░░░░░░ || 40%');
        await sleep(500);
        console.log('|| ▓▓▓▓▓░░░░░ || 50%');
        await sleep(500);
        console.log('|| ▓▓▓▓▓▓░░░░ || 60%');
        await sleep(500);
        console.log('[\x1b[1m\x1b[31mLogin Key Required\x1b[0m]: ');
        
        return new Promise((resolve) => {
            rl.question('[\x1b[1m\x1b[31mLynxbot Security\x1b[0m]: ', async (skibidi) => {
                if (skibidi.trim() === password.trim()) {
                    console.log('Successfully Logged');
                    console.log('|| ▓▓▓▓▓▓▓░░░ || 70%');
                    await sleep(500);
                    console.log('|| ▓▓▓▓▓▓▓▓░░ || 80%');
                    await sleep(500);
                    console.log('|| ▓▓▓▓▓▓▓▓▓░ || 90%');
                    await sleep(500);
                    console.log('|| ▓▓▓▓▓▓▓▓▓▓ || 100%');
                    await sleep(700);
                    console.clear();
                    resolve(); // Lanjutkan ke fungsi berikutnya setelah login berhasil
                } else {
                    console.log('Wrong Key');
                    process.exit(-1);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching the login key:', error);
        process.exit(-1);
    }
}

/**
 * Fungsi utama yang akan dijalankan setelah verifikasi berhasil
 */
async function main() {
    // Menampilkan nama package dan info developer
    CFonts.say(`${package.name}`, {
        font: 'block',
        align: 'left',
        gradient: [randomcolor, randomcolor]
    });
    CFonts.say(`${package.name} By ${package.author.name || package.author}`, {
        font: 'console',
        align: 'left',
        gradient: [randomcolor, randomcolor]
    });

    start('main.js');
}

var isRunning = false;
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
    if (isRunning) return;
    isRunning = true;
    let args = [path.join(__dirname, file), ...process.argv.slice(2)];
    cluster.setupMaster({
        exec: path.join(__dirname, file),
        args: args.slice(1),
    });
    let p = cluster.fork();
    p.on('message', data => {
        console.log('[RECEIVED]', data);
        switch (data) {
            case 'reset':
                p.process.kill();
                isRunning = false;
                start.apply(this, arguments);
                break;
            case 'uptime':
                p.send(process.uptime());
                break;
        }
    });
    p.on('exit', (_, code) => {
        isRunning = false;
        console.error('Exited with code:', code);
        if (code === 0) return;
        fs.watchFile(args[0], () => {
            fs.unwatchFile(args[0]);
            start(file);
        });
    });
    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
    if (!opts['test'])
        if (!rl.listenerCount()) rl.on('line', line => {
            p.emit('message', line.trim());
        });
}

// Mulai verifikasi, lalu lanjutkan ke fungsi main setelah verifikasi berhasil
verifyLogin().then(() => main());
