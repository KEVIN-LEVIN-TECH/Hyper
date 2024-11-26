const { cmd } = require('../command');
const axios = require('axios');
const { Buffer } = require('buffer');

// Replace these with your API Key and Custom Search Engine ID
const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; 
const GOOGLE_CX = '45b94c5cef39940d1'; 

cmd({
    pattern: "img",
    desc: "Search and send images from Google (Normal & Document Type).",
    react: "🖼️",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a search query for the image.\nExample: .img cat");
        }

        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;

        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("❌ No images found for your query.");
        }

        // Display options to the user
        let optionsMessage = `
╭────❮ Image Search Options ❯───●●►

│
│ 🔎 Query: ${q}
│ 
│ 1 || Normal Type (Single Image)
│ 2 || Document Type (All Images)
│
╰───────────────────────────●●►

💡 Reply with the number to choose your option.

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const sentMessage = await conn.sendMessage(from, { text: optionsMessage }, { quoted: mek });

        // Wait for user response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
                switch (selectedOption) {
                    case '1': // Normal Type (Send the first image)
                        const firstImageUrl = data.items[0].link;

                        const imageResponse = await axios.get(firstImageUrl, { responseType: 'arraybuffer' });
                        const imageBuffer = Buffer.from(imageResponse.data, 'binary');

                        await conn.sendMessage(from, {
                            image: imageBuffer,
                            caption: `🌟 Search Result: ${q}\nNormal Type Image Sent Successfully. 📸`,
                        }, { quoted: mek });
                        break;

                    case '2': // Document Type (Send all images as a document)
                        let imagesDocument = [];

                        for (let i = 0; i < data.items.length; i++) {
                            const imageResponse = await axios.get(data.items[i].link, { responseType: 'arraybuffer' });
                            imagesDocument.push({ filename: `Image_${i + 1}.jpg`, content: Buffer.from(imageResponse.data, 'binary') });
                        }

                        await conn.sendMessage(from, {
                            document: imagesDocument[0], // This sends as document
                            mimetype: 'application/zip',
                            caption: `🌟 Search Result: ${q}\nDocument Type Images Sent Successfully. 📁`,
                        }, { quoted: mek });
                        break;

                    default:
                        reply("❌ Invalid option. Please reply with a valid number.");
                }
            }
        });
    } catch (e) {
        console.error(e);
        reply(`❌ Error occurred: ${e.message}`);
    }
});
