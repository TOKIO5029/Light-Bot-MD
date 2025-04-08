// Archivo: plugins/piropo.js

const handler = async (m, { conn }) => {
  const piropos = [
    "¿Tienes mapa? Porque me perdí en tu mirada.",
    "No eres Google, pero tienes todo lo que busco.",
    "¿Te dolió? Cuando caíste del cielo, digo.",
    "Eres como mi WiFi, ¡me conectas sin pedir clave!",
    "No eres arena, pero contigo todo es playa.",
    "Si fueras canción, serías la que tengo en repeat.",
    "Tu sonrisa debería ser ilegal... porque roba corazones.",
    "¿Tienes espejo? Porque me veo contigo.",
    "Oye... ¿tú eres la causa por la que Misa Amane ya no piensa en Light?",
    "Contigo hasta Ryuk se olvidaría de las manzanas."
  ];

  const piropo = piropos[Math.floor(Math.random() * piropos.length)];
  conn.reply(m.chat, `*Piropo del día:* ${piropo}`, m);
};

handler.help = ['piropo'];
handler.tags = ['diversión'];
handler.command = ['piropo', 'piropear', 'halago'];
handler.fail = null;

export default handler;