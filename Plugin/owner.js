const { exec } = require('child_process');
const config = require('../config');
const {cmd , commands} = require('../command')
const {sleep} = require('../DATABASE/functions')

cmd({
    pattern: "restart",
    react: "♻",
    desc: "restart the bot",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return
const {exec} = require("child_process")
reply("*Restarting...*")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})

// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    if (args.length === 0) return reply("📢 ρℓєαѕє ρяσνι∂є α мєѕѕαgє тσ вяσα∂¢αѕт.");

    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    reply("📢 мєѕѕαgє вяσα∂¢αѕтє∂ тσ αℓℓ gяσυρѕ.");
});

// 3. Set Profile Picture
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ ρℓєαѕє яєρℓу тσ αη ιмαgє.");

    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("🖼️ ρяσƒιℓє ρι¢тυяє υρ∂αтє∂ ѕυ¢¢єѕѕƒυℓℓу!");
    } catch (error) {
        reply(`❌ єяяσя υρ∂αтιηg ρяσƒιℓє ρι¢тυяє: ${error.message}`);
    }
});

// 4. Block User
cmd({
    pattern: "block",
    desc: "🚫 Block a user or quoted user",
    fromMe: true,
    react: "🚫",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    try {
           if (!isOwner) return reply("You do not have permission to use this command.");
        const userToBlock = m.quoted 
            ? m.quoted.sender 
            : args[0]?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

        if (!userToBlock || !userToBlock.endsWith("@s.whatsapp.net")) {
            return reply("Please specify a valid user to block.");
        }

        await conn.updateBlockStatus(userToBlock, "block");
        reply(`Successfully blocked ${userToBlock}`);

    } catch (error) {
        console.error("Error blocking user:", error);
        reply("An error occurred while trying to block the user.");
    }
});

// 5. Unblock User

cmd({
    pattern: "unblock",
    desc: "✅ Unblock a user or quoted user",
    fromMe: true,
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    try {
        if (!isOwner) return reply("You do not have permission to use this command.");
        const userToUnblock = (m.quoted ? m.quoted.sender : args[0]?.replace(/[^0-9]/g, "")) + "@s.whatsapp.net";
        if (!userToUnblock || !userToUnblock.endsWith("@s.whatsapp.net")) {
            return reply("Please specify a valid user to unblock.");
        }
        await conn.updateBlockStatus(userToUnblock, "unblock");
        reply(`Successfully unblocked ${userToUnblock}`);

    } catch (error) {
        console.error("Error unblocking user:", error);
        reply("An error occurred while trying to unblock the user.");
    }
});
// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 αℓℓ ¢нαтѕ ¢ℓєαяє∂ ѕυ¢¢єѕѕƒυℓℓу!");
    } catch (error) {
        reply(`❌ єяяσя ¢ℓєαяιηg ¢нαтѕ: ${error.message}`);
    }
});

// 8. Group JIDs List
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");

    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 Group JIDs:\n\n${groupJids}`);
});



//=======
cmd({
    pattern: "ss",
    react: "🌍",
    alias: ["ssweb"],
    desc: "delete message",
    category: "other",
    use: '.del',
    filename: __filename
},
async(conn, mek, m, {from, mnu, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
 
    try{
if (!q) return reply(`• Example: .ss <URL>`);   
await conn.sendMessage(m.chat, { react: { text: "⏱️",key: m.key,}})
await conn.sendMessage(from,{image :{ url: `https://image.thum.io/get/fullpage/${q}` },caption: '> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//=======Jid
cmd({
    pattern: "jid",
    react: "💻",
    alias: ["jids"],
    desc: "Check bot\'s ping",
    category: "owner",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m, {from, mnu, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
	
reply(from)
	
} catch (e) {
reply(`${e}`)
console.log(e)
}
})
