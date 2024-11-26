const {cmd , commands} = require('../command')
cmd({
    pattern: "scloud",
    desc: "downlode scloud",
    category: "download",
    react: "📡",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("_please give me a valid url ❗_")
if (!q.includes('soundcloud.com')) return reply("_That's is not soundcloud url ❕_")
const response = await fetch(`https://prabath-md-api.up.railway.app/api/sclouddl?url=${q}`)
const data = await response.json()
const fbvid = data.data.sd
reply("_Downloading your SOUND CLOUD AUDIO＿＿📥_")
reply("_Uploading your SOUND CLOUD AUDIO ＿＿📤_")
await conn.sendMessage(from,{video : {url : sclouddl },caption : `┌────────────\nSOUND CLOUD ᴅᴏᴡɴʟᴏᴀᴅᴇʀ..✅\n> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ \n└─────────────`, mimetype:"audio/mpeg"},{quoted:mek})

}catch(e){
    console.log(e)
    reply("_*SCLOUD downloader sever are busy now 🛜_\n_please wait few minutes and try again 🔄_")
}
}
)
