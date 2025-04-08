let handler = async (m, { conn }) => {
    m.react('🍭');
    
    const message = `━━━✦ *Planes de Bots* ✦━━━\n\n` +
                    `🔹 *Bot Principal*\n` +
                    `✔️ *1 mes:* 10 soles\n` +
                    `✔️ *15 días:* 6 soles\n` +
                    `✔️ *1 año:* 60 soles\n\n` +
                    `🔹 *Ser Premium*\n` +
                    `⭐ *1 mes:* 4 soles\n` +
                    `⭐ *15 días:* 2 soles\n\n` +
                    `📌 ¡Aprovecha y mejora tu experiencia!`;

    const img = 'https://files.catbox.moe/4n2gjp.jpg';

    try {
        await conn.sendMessage(m.chat, { 
            image: { url: img }, 
            caption: message, 
            mimetype: 'image/jpeg' 
        }, { quoted: m });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}

handler.help = ['comprar'];
handler.tags = ['main'];
handler.command = ['comprarbot', 'comprar'];

export default handler;