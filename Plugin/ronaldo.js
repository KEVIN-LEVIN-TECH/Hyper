const axios = require('axios');
const { cmd } = require('../command');

// ====== RONALDO COMMAND ======
cmd({
    pattern: "ronaldo",
    desc: "Fetch a random Ronaldo image and provide options for viewing.",
    category: "fun",
    react: "⚽",
    filename: __filename
},
async (conn, mek, m, { from, reply, pushname }) => {
    try {
        const apiUrl = `https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/CristianoRonaldo.json`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Ronaldo Image Menu
        const ronaldoMenu = `
⚽ Hello, ${pushname || "User"}

Here is a Ronaldo image. Choose an option below:

1 || Send Image in Normal Type
2 || Send Image as a Document

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        // Send the Menu
        const sentMsg = await conn.sendMessage(
            from,
            {
                image: { url: data.url },
                caption: ronaldoMenu,
            },
            { quoted: mek }
        );

        // Listen for User Response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userMsg = msgUpdate.messages[0];
            if (!userMsg.message || !userMsg.message.extendedTextMessage) return;

            const selectedOption = userMsg.message.extendedTextMessage.text.trim();

            // Match the context to ensure it's replying to the Ronaldo menu
            if (
                userMsg.message.extendedTextMessage.contextInfo &&
                userMsg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id
            ) {
                switch (selectedOption) {
                    case '1': {
                        // Option 1: Normal Type Image
                        await conn.sendMessage(
                            from,
                            {
                                image: { url: data.url },
                                caption: '⚽ Cristiano Ronaldo Image (Normal Type) ⚽\n> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ',
                            },
                            { quoted: userMsg }
                        );
                        break;
                    }
                    case '2': {
                        // Option 2: Document Type Image
                        await conn.sendMessage(
                            from,
                            {
                                document: { url: data.url },
                                mimetype: 'image/jpeg',
                                fileName: 'Cristiano_Ronaldo_Image.jpg',
                                caption: '⚽ Cristiano Ronaldo Image (Document Type) ⚽',
                            },
                            { quoted: userMsg }
                        );
                        break;
                    }
                    default: {
                        // Invalid Option
                        await conn.sendMessage(
                            from,
                            { text: "❌ Invalid option. Please select either 1 or 2." },
                            { quoted: userMsg }
                        );
                        break;
                    }
                }
            }
        });
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request.");
    }
});
