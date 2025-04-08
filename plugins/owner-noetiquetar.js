//Codigo por Zahpkiel Ender




let handler = async (m, {conn, text}) => {
  let name = await conn.getName(m.sender);

conn.reply(m.chat, `> [ 💖 ️] No etiquetes a mi owner, si es algo urgente contacta con el a su chat privado para mas informacion` ,m, { contextInfo:{ externalAdReply: {title: '❤️‍🔥 𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩', body: 'ᴇsᴄʀɪʙɪʀʟᴇ ᴀᴘʟᴀsᴛᴀɴᴛᴏ ᴀǫᴜɪ', sourceUrl: 'https://wa.me/50248019799'}}})
}
handler.customPrefix = /@50248019799/i;
handler.command = new RegExp();

export default handler;