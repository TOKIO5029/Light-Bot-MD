  // Enviar solo el audio de Pikachu
  await conn.sendMessage(m.chat, {
    audio: { url: 'https://qu.ax/QeWmL.mp3' }, // Audio
    mimetype: 'audio/mpeg',
    ptt: true, // Cambia a true si prefieres enviarlo como nota de voz
  }, { quoted: m });
};

// Hacer que funcione sin prefijo
handler.customPrefix = /^(jajaja)$/i;
handler.command = new RegExp;

export default handler;