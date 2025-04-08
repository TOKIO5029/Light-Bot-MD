const initHandler = async (m, { conn, usedPrefix }) => {
    const buttons = [
        {
            buttonId: `${usedPrefix}owner`,
            buttonText: { displayText: "ஒ Owner" },
            type: 1,
        },
        {
       
       buttonId: `${usedPrefix}menu`,
            buttonText: { displayText: "menu" },
            type: 1,
        },
        {
            buttonId: `${usedPrefix}ping`,
            buttonText: { displayText: "웃 Ping" },
            type: 1,
        },
    ];

buttonId: `${usedPrefix}infobot`,
            buttonText: { displayText: "웃 infobot" },
            type: 1,
        },
    ];
    


    await conn.sendMessage(
        m.chat,
        {
            text: "🔹 Selecciona una opción:",
            buttons: buttons,
            viewOnce: true,
        },
        { quoted: m }
    );
};

initHandler.command = /^init$/i;

export default initHandler;