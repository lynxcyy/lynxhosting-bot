const fetch = require('node-fetch');

let eue = async (m, {conn, usedPrefix, command, user}) => { 
    let type = command.toLowerCase();
    const commands = [
        'genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 
        'hololive', 'uncensored', 'sungglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 
        'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'pantypull', 'headdress', 
        'headphone', 'anusview', 'shorts', 'stokings', 'topless', 'beach', 'bunnygirl', 
        'bunnyear', 'vampire', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 
        'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'breast', 
        'twintail', 'spreadpussy', 'seethrough', 'breasthold', 'fateseries', 'spreadlegs', 
        'openshirt', 'headband', 'nipples', 'erectnipples', 'greenhair', 'wolfgirl', 'catgirl'
    ];

    if (commands.includes(type)) {
        let res = await fetch(`https://fantox-apis.vercel.app/${type}`);
        if (!res.ok) throw await res.text();
        let json = await res.json();
        if (!json.url) throw 'Error';
        conn.sendFile(m.chat, json.url, 'img.jpg', `Result image: ${type}`, m);
    } else {
        throw false;
    }
};

eue.help = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored', 'sungglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'pantypull', 'headdress', 'headphone', 'anusview', 'shorts', 'stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'vampire', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'breast', 'twintail', 'spreadpussy', 'seethrough', 'breasthold', 'fateseries', 'spreadlegs', 'openshirt', 'headband', 'nipples', 'erectnipples', 'greenhair', 'wolfgirl', 'catgirl']
eue.tags = ['nsfw'];
eue.command = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored', 'sungglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'pantypull', 'headdress', 'headphone', 'anusview', 'shorts', 'stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'vampire', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'breast', 'twintail', 'spreadpussy', 'seethrough', 'breasthold', 'fateseries', 'spreadlegs', 'openshirt', 'headband', 'nipples', 'erectnipples', 'greenhair', 'wolfgirl', 'catgirl']
module.exports = eue;