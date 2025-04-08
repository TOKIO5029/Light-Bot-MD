const handler = async (m, { conn }) => {
  // Enviar solo el audio de Pikachu
  await conn.sendMessage(m.chat, {
    audio: { url: 'https://qu.ax/hRuU.mp3' }, // Audio
    mimetype: 'audio/mpeg',
    ptt: true, // Cambia a true si prefieres enviarlo como nota de voz
  }, { quoted: m });
};

// Hacer que funcione sin prefijo
handler.customPrefix = /^(Gol!)$/i;
handler.command = new RegExp;

export default handler;