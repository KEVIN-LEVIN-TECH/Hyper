const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "search",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `     🔍_HYPER-MD GIT STALK_🔎
        
👤 Username: ${data.name || data.login}
🔗 Github Url:(${data.html_url})
📝 Bio: ${data.bio || 'Not available'}
🏙️ Location: ${data.location || 'Unknown'}
📊 Public Repos: ${data.public_repos}
👥 Followers: ${data.followers} | Following: ${data.following}
📅 Created At: ${new Date(data.created_at).toDateString()}
🔭 Public Gists: ${data.public_gists}

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

         // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: userInfo,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `HYPER-MD Github Information`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: data.avatar_url,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`єяяσя ƒєт¢нιηg ∂αтα: ${e.response ? e.response.data.message : e.message}`);
    }
});
