const handler = async (m, { conn }) => {
  // Enviar solo el audio de Pikachu
  await conn.sendMessage(m.chat, {
    audio: { url: 'https://qu.ax/oqNf.mp3' }, // Audio
    mimetype: 'audio/mpeg',
    ptt: true, // Cambia a true si prefieres enviarlo como nota de voz
  }, { quoted: m });
};

// Hacer que funcione sin prefijo
handler.customPrefix = /^(calla fan de bts)$/i;
handler.command = new RegExp;

export default handler;