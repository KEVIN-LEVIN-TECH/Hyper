const { cmd } = require('../command');
const fetch = require('node-fetch');

// Store search results to handle selection
let searchResults = [];

// Movie search command
cmd({
    pattern: "ytsmx",
    desc: "Search for a movie and get details.",
    category: "movie",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const input = q.trim();
        if (!input) return reply("Please provide a movie name to search.");

        // Step 1: Search for the movie
        const response = await fetch(`https://www.dark-yasiya-api.site/movie/ytsmx/search?text=${encodeURIComponent(input)}`);
        const result = await response.json();

        // Check if the result and the results array exist
        if (!result.status || !result.result || !result.result.data || result.result.data.length === 0) {
            return reply("No results found.");
        }

        // Store search results
        searchResults = result.result.data;

        let searchMessage = "*Search Results:*\n\n";
        searchResults.forEach((item, index) => {
            searchMessage += `${index + 1}. ${item.title}\n𝖸𝖾𝖺𝗋: ${item.year}\n𝖨𝖣: ${item.id}\n\n`;
        });

        // Step 2: Send the search results to the user with instructions to reply with the number
        searchMessage += "*_Please reply with the number of the movie you want details for...✓_*";
        await conn.sendMessage(from, { text: searchMessage }, { quoted: mek });

        // Wait for the user to select a movie by number
        const movieSelectionListener = async (update) => {
            const message = update.messages[0];

            if (!message.message || !message.message.extendedTextMessage) return;

            const userReply = message.message.extendedTextMessage.text.trim();
            const selectedMovieIndex = parseInt(userReply) - 1;

            // Ensure the user has selected a valid movie index
            if (selectedMovieIndex < 0 || selectedMovieIndex >= searchResults.length) {
                await conn.sendMessage(from, {
                    react: { text: '❌', key: mek.key }
                });
                return reply("❗ Invalid selection. Please choose a valid number...✓");
            }

            const movieId = searchResults[selectedMovieIndex].id;

            // Fetch movie details using the provided movie ID
            const response = await fetch(`https://www.dark-yasiya-api.site/movie/ytsmx/movie?id=${movieId}`);
            const result = await response.json();

            if (!result.status || !result.result) {
                return reply("No details found for the selected movie.");
            }

            // Construct the message with movie details
            const movie = result.result;
            const detailsMessage = `𝖬𝗈𝗏𝗂𝖾 𝖣𝖾𝗍𝖺𝗂𝗅𝗌:\n\n` +
                `𝖳𝗂𝗍𝗅𝖾: ${movie.title}\n` +
                `𝖸𝖾𝖺𝗋: ${movie.year}\n` +
                `𝖱𝖺𝗍𝗂𝗇𝗀: ${movie.rating}\n` +
                `𝖲𝗎𝗆𝗆𝖺𝗋𝗒: ${movie.summary}\n` +
                `𝖫𝗂𝗇𝗄: ${movie.url}\n\n` + 
                `> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

            await conn.sendMessage(from, { text: detailsMessage }, { quoted: mek });

        };

        // Register the movie selection listener
        conn.ev.on("messages.upsert", movieSelectionListener);

        // Clean up the listener after 60 seconds to prevent memory leaks
        setTimeout(() => {
            conn.ev.off("messages.upsert", movieSelectionListener);
        }, 60000);

    } catch (e) {
        console.error('Error:', e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        return reply(`❗ Error: ${e.message}`);
    }
});
