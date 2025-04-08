import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let Styles = (text, style = 1) => {
  let xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  let yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  let replacer = [];
  xStr.forEach((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  return text
    .toLowerCase()
    .split('')
    .map(v => (replacer.find(x => x.original === v) || { convert: v }).convert)
    .join('');
};

let tags = {
  'main': '𝙄𝙉𝙁𝙊-𝘽𝙊𝙏',
  'buscador': '𝘽𝙐𝙎𝘾𝘼𝘿𝙊𝙍𝙀𝙎',
  'fun': '𝙅𝙐𝙀𝙂𝙊𝙎',
  'jadibot': '𝙎𝙀𝙍𝘽𝙊𝙏',
  'rpg': 'RPGñ',
  'rg': '𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝙊',
  'xp': 'exp',
  'sticker': '𝙎𝙏𝙄𝘾𝙆𝙀𝙍',
  'anime': '𝘼𝙉𝙄𝙈𝙀𝙎 ',
  'database': '𝘿𝘼𝙏𝘼𝘽𝘼𝙎𝙀',
  'fix': '𝙁𝙄𝙓𝙈𝙀𝙉𝙎𝘼𝙅𝙀𝙎',
  'grupo': '𝙂𝙍𝙐𝙋𝙊𝙎',
  'nable': '𝙊𝙉 / 𝙊𝙁𝙁', 
  'descargas': '𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎',
  'youtube': '𝙔𝙊𝙐𝙏𝙐𝘽𝙀 ',
  'tools': '𝙃𝙀𝙍𝙍𝘼𝙈𝙄𝙀𝙉𝙏𝘼𝙎',
  'info': '𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊𝙉',
  'nsfw': '𝙉𝙎𝙁𝙒', 
  'owner': '𝘾𝙍𝙀𝘼𝘿𝙊𝙍', 
  'mods': '𝙎𝙏𝘼𝙁𝙁',
  'audio': '𝘼𝙐𝘿𝙄𝙊𝙎', 
  'ai': 'la',
  'transformador': '𝘾𝙊𝙉𝙑𝙀𝙍𝙏𝙄𝘿𝙊𝙍𝙀𝙎',
}

const defaultMenu = {
  before:`....
 囧𔓕꯭⌑(꯭𝐄).꯭𝑾𝑬𝑳𝑪𝑶𝑴𝑬⌑
 __________________________

『*𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊 𝙖𝙡 𝙢𝙚𝙣𝙪 𝙙𝙚 𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩*』

“ hola *%name* soy *𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩*, %greeting ”


*╔═══❖•ೋ°INFO-BOTೋ•❖═══╗*
├ׁ̟̇👑 *,cʀᴇᴀᴅᴏʀ:*  🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
├ׁ̟̇🌵*𝙢𝙤𝙙𝙤:* Público
├ׁ̟̇💃 *𝘽𝙖𝙞𝙡𝙚𝙮𝙨:* Multi Device
├ׁ̟̇⌚ *Tɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ:* %muptime
├ׁ̟̇👥 *USUARIO:* %totalreg
*╚═══❖•ೋ° °ೋ•❖═══╝*

%readmore
┎━─━─━─━─━─━─━─━─━┒ 
┃֪࣪ 
├ׁ̟̇❍✎ *Cʟɪᴇɴᴛᴇ:* %name
├ׁ̟̇❍✎ *Exᴘ:* %exp
├ׁ̟̇❍✎ *Nɪᴠᴇʟ:* %level
├ׁ̟̇❍✎ *Rᴀɴɢᴏ:* %role
┖━─━─━─━─━─━─━─━─━┚

%readmore
*─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ─*

\t*Lista-DE-COMANDOS* 
`.trimStart(),
      header: '.    ╭─ׅ─ׅ─ׅ─ׅׅ─ׅ─╮\n╭╼݊݊%category         \n┃֪࣪  ╰─ׅ─ׅ࣭ٜ۬☪︎︎︎︎̸─ׅ─ׅ╯',
  body: '├ׁ̟̇❍☃️ %cmd\n',
  footer: '╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬╝\n',
  after: `> ${dev}`,
};

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let tag = `@${m.sender.split("@")[0]}`
    let mode = global.opts["self"] ? "Privado" : "Publico"
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(() => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
          help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: 'customPrefix' in plugin,
          limit: plugin.limit,
          premium: plugin.premium,
          enabled: !plugin.disabled,
        })
      );

    for (let plugin of help) {
      if (plugin && 'tags' in plugin) {
        for (let t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = t;
        }
      }
    }

    let before = conn.menu?.before || defaultMenu.before;
    let header = conn.menu?.header || defaultMenu.header;
    let body = conn.menu?.body || defaultMenu.body;
    let footer = conn.menu?.footer || defaultMenu.footer;
    let after = conn.menu?.after || defaultMenu.after;

    let _text = [
      before,
      ...Object.keys(tags).map(t => {
        return header.replace(/%category/g, tags[t]) + '\n' + [
          ...help
            .filter(menu => menu.tags && menu.tags.includes(t) && menu.help)
            .map(menu => menu.help
              .map(h => body
                .replace(/%cmd/g, menu.prefix ? h : '%p' + h)
                .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                .trim())
              .join('\n')
            ),
          footer
        ].join('\n')
      }),
      after
    ].join('\n');

    let textFinal = typeof conn.menu === 'string' ? conn.menu : _text;
    let replace = {
      "%": "%",
      p: _p,
      uptime,
      muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : "[unknown github url]",
      mode,
      _p,
      tag,
      name,
      level,
      limit,
      totalreg,
      readmore: readMore
    };

    textFinal = textFinal.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name]);

    // Agregamos la indicación y los botones al menú
    let menuText = textFinal.trim() + "\n\n🔹 Selecciona una opción:";

    const buttons = [
      {
        buttonId: `${_p}owner`,
        buttonText: { displayText: "㋚ Owner" },
        type: 1,
      },
      {
        buttonId: `${_p}ping`,
        buttonText: { displayText: "〠 Ping" },
        type: 1,
      },
    ];

    let vid = 'https://files.catbox.moe/tluyb7.mp4';
    await m.react('🌵');

    await conn.sendMessage(
      m.chat,
      {
        image: { url: img },
        caption: menuText,
        buttons: buttons,
        footer: "Selecciona una opción",
        viewOnce: true,
      },
      { quoted: m }
    );
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m);
    throw e;
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu'];
handler.register = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}