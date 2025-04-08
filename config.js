import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botnumber = '' //Ejemplo: +50248019799
global.confirmCode = ''

//• ↳𝑺𝑶𝑳𝑶 𝑫𝑬𝑺𝑨𝑹𝑹𝑶𝑳𝑳𝑨𝑫𝑶𝑹𝑬𝑺 𝑨𝑷𝑹𝑶𝑩𝑨𝑫𝑶𝑺
global.owner = [
['50248019799', '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲', true],
['50248019799', '󠁖󠁖󠁖󠁖󠁖󠁖󠁻󠁻owner', true],
['51935016869', 'emer', true],
['50248019799'],
['50248019799', '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 support', true],
['50248019799'],
['50248019799'],
['50248019799']
]

//• ↳𝑺𝑶𝑳𝑶 𝑴𝑶𝑫𝑬𝑹𝑨𝑫𝑶𝑹𝑬𝑺!
global.mods = []

global.suittag = ['51935016869','50248019799']
global.prems = ['50248019799']

//• ↳ ◜𝑴𝑨𝑹𝑪𝑨𝑺 𝑫𝑬 𝑨𝑮𝑼𝑨◞ • 💌
global.packname = '󠁖󠁖󠁖󠁖󠁖𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩 '
global.author = '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 ϐγ:🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲' 
global.wm = '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩';
global.titulowm = '⍴᥆ᥕᥱ𝒓ᥱძ ᑲᥡ 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨፝︎';
global.titulowm2 = '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩'
global.igfg = '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩'
global.botname = '🐉NeoTokyo Beats🐲'
global.dev = '> © ⍴᥆ᥕᥱ𝒓ᥱძ ᑲᥡ 🐉NeoTokyo Beats🐲'
global.textbot = '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩 : > © ⍴᥆ᥕᥱ𝒓ᥱძ ᑲᥡ 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲︎'
global.gt = '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩';
global.namechannel = '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩'
global.vs = 'V2'
global.vsJB = '5.0'

//___________________________________________________
// Stickers

global.packsticker = `♾━━━━━━━━  
┃ 🤖 ɓσƭ: 𓆩‌۫᷼ ִֶָღ݉͢𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩 ִֶָ𓆪  
┃ 👑 ρяοριєταяιο: 🐉 𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨 🐲  
┃ 📅 ƒєϲнα ∂є ϲяєαϲιόи:  
┃ ⏳ нοяα:  
♾━━━━━━━━`;

global.packsticker2 = `♾━━━━━━━━  
❜︧ 𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩  
🐉 𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨 🐲  
  
📅 ⇝ ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}  
⏳ ⇝ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}  

🎭 ѕτιϲκєя ϐγ: 𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩  
♾━━━━━━━━`;

//___________________________________________________


//• ↳ ◜𝑰𝑴𝑨́𝑮𝑬𝑵𝑬𝑺◞ • 🌇
global.imagen1 = fs.readFileSync('./Menu2.jpg');
global.imagen2 = fs.readFileSync('./src/anime.jpg');
global.imagen3 = fs.readFileSync('./Menu3.jpg');
global.imagen4 = fs.readFileSync('./Menu.jpg');
global.imagen5 = fs.readFileSync('./src/+18.jpg');
global.imagen6 = fs.readFileSync('./Menu3.jpg');
global.imagen7 = fs.readFileSync('./Menu5.jpg');
global.imagen8 = fs.readFileSync('./Menu4.jpg')
global.imagen9 = fs.readFileSync('./src/menu_en.png')
global.imagen10 = fs.readFileSync('./src/nuevobot.jpg')
global.que = fs.readFileSync('./src/ke/que1.jpg')
global.que2 = fs.readFileSync('./src/ke/que2.jpg')
global.que3 = fs.readFileSync('./src/ke/que3.jpg')
global.que4 = fs.readFileSync('./src/ke/que4.jpg')
global.que5 = fs.readFileSync('./src/ke/que5.jpg')
global.que6 = fs.readFileSync('./src/ke/que6.jpg')
global.amor = fs.readFileSync('./src/amor/amor1.webp')
global.amor2 = fs.readFileSync('./src/amor/amor2.webp')
global.amor3 = fs.readFileSync('./src/amor/amor3.webp')
global.amor4 = fs.readFileSync('./src/amor/amor4.webp')
global.amor5 = fs.readFileSync('./src/amor/amor5.webp')
global.miniurl = fs.readFileSync('./src/grupo.jpg');
global.logo2 = fs.readFileSync('./src/logo2.jpg')
global.logo3 = fs.readFileSync('./src/logo3.jpg')
global.catalogo = fs.readFileSync('./src/logo6.png')
global.logo4 = fs.readFileSync('./src/logo4.jpg')
global.logo5 = fs.readFileSync('./src/logo5.jpg')
global.logo7 = fs.readFileSync('./src/Logo7.png')
global.logo8 = fs.readFileSync('./src/Logo8.jpg')
global.rule = fs.readFileSync('./src/rule.jpg')
global.welcome = fs.readFileSync('./media/Welcome.jpg')
global.adios = fs.readFileSync('./media/Bye.jpg')

global.stickeramor = [amor, amor2, amor3, amor4, amor5]
global.sickerque = [que, que2, que3, que4, que5, que6]
global.photoSity = [imagen8, imagen1, imagen4, imagen6]

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.languaje = 'Español'
global.nameqr = '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩'
global.sessions = 'Light-Bot-MD-session'
global.jadi = 'lightjadibots'

global.ch = {
ch1: '120363341523880410@newsletter',
ch2: '120363341523880410@newsletter',
ch3: '120363341523880410@newsletter',
ch4: '120363341523880410@newsletter',
ch5: '120363341523880410@newsletter',
}

//• ↳ ◜𝑭𝑨𝑲𝑬 𝑬𝑺𝑻𝑰𝑳𝑶◞ • 🪩
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '󠁖󠁖󠁖󠁖󠁖󠁖󠁻󠁻𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

global.fakegif2 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '♡٨ﮩ٨ﮩﮩ٨ﮩﮩ٨ﮩ ᗷIEᑎᐯEᑎIᗪO ﮩ٨ﮩﮩ٨ﮩﮩ٨ﮩ٨♡', jpegThumbnail: logo5 }}};

global.fakegif3 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '⚘݄𖠵⃕⁖𝐓𝐨𝐧𝐭𝐨 (￣へ ￣ ) ', jpegThumbnail: logo3 }}};

global.fakegif4 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: '𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: 'ཫ꙳✱( รՇเςкєгร )✱꙳ཀ', jpegThumbnail: logo5 }}};

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '󠁖󠁖󠁖󠁖󠁖󠁖󠁻󠁻𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

global.fgif2 = { key: {participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: {"videoMessage": { "title":`͟͞ 👑 𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩👑͟͞`, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': `Light-Bot-MD\n 👑 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲͟`, 'jpegThumbnail': logo4 }}}

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺◞ • 🌿
global.gp4 = 'https://chat.whatsapp.com/DmaLM7iLSFKKi7RkqUkv71' //💫Grupo Oficial De 𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩
global.gp1 = 'https://chat.whatsapp.com/DmaLM7iLSFKKi7RkqUkv71' //Grupo 
global.gp2 = 'DmaLM7iLSFKKi7RkqUkv71' //Grupo
global.comunidad1 = 'https://chat.whatsapp.com/DmaLM7iLSFKKi7RkqUkv71' //grupo de 𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩
global.channel = 'https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A' //Canal Oficial
global.yt = 'https://youtube.com/@NeoDragon-Beats-BY' //Canal De Youtube
global.md = 'https://github.com/TOKIO5029/Light-Bot-MD/edit/main/config.js' //Github Oficial
global.correo = 'albertodovi100@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A';

var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = 'Linda Mañana'; break; case 1: hour = 'Linda Mañana'; break; case 2: hour = 'Linda Mañana'; break; case 3: hour = 'Linda Mañana'; break; case 4: hour = 'linda mañana'; break; case 5: hour = 'Linda Mañana'; break; case 6: hour = 'Linda Mañana'; break; case 7: hour = 'Linda Mañana'; break; case 8: hour = 'Linda Mañana'; break; case 9: hour = 'Linda Mañana'; break; case 10: hour = 'Lindo Dia'; break; case 11: hour = 'Lindo Dia'; break; case 12: hour = 'Lindo Dia'; break; case 13: hour = 'Lindo Dia'; break; case 14: hour = 'Linda Tarde'; break; case 15: hour = 'Linda Tarde'; break; case 16: hour = 'Linda Tarde'; break; case 17: hour = 'Linda Tarde'; break; case 18: hour = 'Linda Noche'; break; case 19: hour = 'Linda Noche'; break; case 20: hour = 'Linda Noche'; break; case 21: hour = 'Linda Noche'; break; case 22: hour = 'Linda Noche'; break; case 23: hour = 'Linda Noche'; break;}
global.saludo = '🌸' + hour;

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: "120363341523880410@newsletter", serverMessageId: 100, newsletterName: namechannel, }, }, }
//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶◞ • 🕒
global.d = new Date(new Date + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('es', {month: 'long'});
global.año = d.toLocaleDateString('es', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
//* ****************************
global.wm2 = `${dia} ${fecha}\n𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩`;
global.nomorown = '50248019799';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];
global.cmenut = '❖––––––『';
global.cmenub = '┊✦ ';
global.cmenuf = '╰━═┅═━––––––๑\n';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dmenut = '*❖─┅──┅〈*';
global.dmenub = '*┊»*';
global.dmenub2 = '*┊*';
global.dmenuf = '*╰┅────────┅✦*';
global.htjava = '⫹⫺';
global.htki = '*⭑•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•⭑*';
global.comienzo = '• • ◕◕════';
global.fin = '════◕◕ • •';
global.botdate = `${moment.tz('America/Mexico_City').format('DD/MM/YY')}`;
global.bottime = `${moment.tz('America/Mexico_City').format('HH:mm:ss')}`;
global.fgif = {key: {participant: '0@s.whatsapp.net'}, message: {'videoMessage': {'title': wm, 'h': `Hmm`, 'seconds': '999999999', 'gifPlayback': 'true', 'caption': bottime, 'jpegThumbnail': fs.readFileSync('./Menu.jpg')}}};
global.multiplier = 99;
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=',
];
//* ************************

//• ↳ ◜𝑨𝑷𝑰𝑺 𝑭𝑼𝑵𝑪𝑰𝑶𝑵◞ 👑
global.openai_org_id = 'org-3';
global.openai_key = 'sk-0';
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['GataDiosV2']; // ['BrunoSobrino_2']
global.itsrose = ['4b146102c4d500809da9d1ff'];

global.APIs = {
  ApiEmpire: 'https://api-brunosobrino.zipponodes.xyz',
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site',
  vihangayt: 'https://vihangayt.me',
  erdwpe: 'https://api.erdwpe.com',
  xyroinee: 'https://api.xyroinee.xyz',
  nekobot: 'https://nekobot.xyz'
},
global.APIKeys = {
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren',
  'https://api.xyroinee.xyz': 'uwgflzFEh6'
};

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;
