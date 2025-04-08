// Archivo: plugins/chisme.js

const handler = async (m, { conn }) => {
  const chismes = [
    "Dicen que alguien del grupo habla solo con stickers porque no sabe escribir.",
    "Me contaron que uno de aquí se enamoró de su bot de WhatsApp.",
    "Rumores dicen que alguien ve videos de gatitos a escondidas en el trabajo.",
    "Alguien del grupo fue visto llorando porque lo banearon del Uno.",
    "Se dice por ahí que uno de ustedes usa dos cuentas para ganar en los juegos del bot.",
    "Hay un miembro que se ríe solo leyendo stickers viejos... y no diré quién.",
    "Kira me contó que alguien aquí está en su lista... por spamear comandos.",
    "Ryuk vio a alguien del grupo comiéndose un taco sin tortilla.",
    "L descubrió que uno de ustedes manda memes malos a propósito.",
    "Se dice que alguien aquí juega a piedra, papel o tijera consigo mismo... y pierde."
  ];

  const chisme = chismes[Math.floor(Math.random() * chismes.length)];
  conn.reply(m.chat, `*Último chisme:* ${chisme}`, m);
};

handler.help = ['chisme'];
handler.tags = ['diversión'];
handler.command = ['chisme', 'rumor', 'salseo'];
handler.fail = null;

export default handler;