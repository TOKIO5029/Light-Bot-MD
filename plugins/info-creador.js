import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let pp = await conn.profilePictureUrl(who).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')

    let bio1 = await conn.fetchStatus('50248019799@s.whatsapp.net').catch(_ => 'Sin Biografía')
    let bio2 = await conn.fetchStatus('51935016869@s.whatsapp.net').catch(_ => 'Sin Biografía')
    let bioBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}@s.whatsapp.net`).catch(_ => 'Sin Biografía')

    let name = await conn.getName(who)

    await sendContactArray(conn, m.chat, [
        ['50248019799', ' creador del bot y staff', '?NeoTokyo Beats', 'creador', 'albertodovi100@example.com', 'MX', 'https://youtube.com/', bio1.status?.toString() || 'Sin Biografía'],
        ['51984368849', 'owner1', 'EMER ??', 'owner Emer', 'Elmerloayza819@gmail.com', 'NI', 'https://github.com/TOKIO5025', bio2.status?.toString() || 'Sin Biografía'],
        [`${conn.user.jid.split('@')[0]}`, '🌸 Es el Bot', 'Bot Oficial', '📵 No Hacer Spam', 'correo@example.com', 'MX', 'https://github.com', bioBot.status?.toString() || 'Sin Biografía']
    ], m)
} 

handler.command = ['creador', 'owner']
handler.before = async (m, { conn }) => {
    let text = m.text?.toLowerCase()?.trim();
    if (text === 'creador' || text === 'owner') {
        return handler(m, { conn });
    }
}

export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
    if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
    let contacts = []
    for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
        number = number.replace(/[^0-9]/g, '')
        let njid = number + '@s.whatsapp.net'
        let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
        let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel: 🌍 Ubicación
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim()
        contacts.push({ vcard, displayName: name })
    }
    return await conn.sendMessage(jid, {
        contacts: {
            displayName: contacts.length > 1 ? `${contacts.length} contactos` : contacts[0].displayName,
            contacts,
        }
    }, { quoted, ...options })
}