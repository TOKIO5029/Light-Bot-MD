// Archivo: plugins/confesion.js

const handler = async (m, { conn }) => {
  const confesiones = [
    "Confieso que me como la pizza con mayonesa.",
    "Confieso que le hablo a mis plantas como si fueran humanos.",
    "Confieso que una vez fingí mi cumpleaños por un pastel gratis.",
    "Confieso que *yo fui quien se robó el WiFi del vecino por 3 años*.",
    "Confieso que me enamoré de un bot de WhatsApp... sí, de ti, Misa Amane.",
    "Confieso que dije 'ya voy saliendo' cuando ni me había bañado.",
    "Confieso que voté en la ruletadelban por error y se fue mi mejor amigo.",
    "Confieso que tengo más stickers de gatos que fotos mías.",
    "Confieso que todavía creo en Santa Claus. Bueno, más o menos.",
    "Confieso que 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 le gusta la bot 𝘼𝙠𝙚𝙣𝙤 𝙝𝙞𝙢𝙚𝙟𝙞𝙢𝙖-𝘽𝙊𝙏.",
    "Confieso que puse a mi ex en la Death Note... solo por si acaso."
  ];

  const confesion = confesiones[Math.floor(Math.random() * confesiones.length)];
  conn.reply(m.chat, `*Confesión anónima:* ${confesion}`, m);
};

handler.help = ['confesión'];
handler.tags = ['diversión'];
handler.command = ['confesion', 'confesión', 'confiesa'];
handler.fail = null;
export default handler;