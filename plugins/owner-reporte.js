let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '⚠ *Ingrese el error que desea reportar.*', m)
    if (text.length < 10) return conn.reply(m.chat, '⚠️ *Especifique bien el error, mínimo 10 caracteres.*', m)
    let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
    if (text.length > 1000) return conn.reply(m.chat, '⚠️ *Máximo 1000 caracteres para enviar el error.*', m)
    const teks = `*🔊 \`Reportes de errores\` 🔊*

☁️ Número de usuario:
• Wa.me/${m.sender.split`@`[0]}

🍓 Nombre bot:
• *𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩*

👤 Usuario: 
• ${m.pushName || 'Anónimo'}

💻 Owners support:
• > 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
• > Support emer

💬 Mensaje:
• ${text}`
  await conn.reply('50248019799@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

await conn.reply('50248019799@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

  await conn.reply(global.owner[0][0] + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

await conn.sendMessage(global.idchannel, { text: m.quoted ? teks + m.quoted.text : teks, contextInfo: {
externalAdReply: {
title: "【 🔔 𝐄𝐑𝐑𝐎𝐑 🔔 】",
body: '💤 ¡𝚄𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚑𝚊 𝚛𝚎𝚙𝚘𝚛𝚝𝚊𝚍𝚘 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛!',
thumbnailUrl: perfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })

    m.reply('> ❤️‍🔥 *El reporte se envío a mis desarrolladores.*')
}
handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error']

export default handler