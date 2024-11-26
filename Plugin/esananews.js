const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../DATABASE/functions')
const Esana = require('@sl-code-lords/esana-news')
var api = new Esana()

var tmsg = "It Gives WhatsApp Beta News."


cmd({
    pattern: "wabeta",
    alias: ["wabetainfo","betawa"],
    react: "✔️",
    desc: tmsg,
    category: "news",
    use: '.wabeta',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const data = await fetchJson('https://api.maher-zubair.tech/details/wabetainfo')
let info = `🥏 Title : ${data.result.title}
📅 Date : ${data.result.date}
🖥️ Platform : ${data.result.updateFor}
🔗 URL : ${data.result.link}
🗞️ Short Desc :
${data.result.desc}

ℹ️ FAQ

❓ Question : ${data.result.QandA[0].question}
👨🏻‍💻 Answer : ${data.result.QandA[0].answer}

❓ Question : ${data.result.QandA[1].question}
👨🏻‍💻 Answer : ${data.result.QandA[1].answer}

❓ Question : ${data.result.QandA[2].question}
👨🏻‍💻 Answer : ${data.result.QandA[2].answer}

❓ Question : ${data.result.QandA[3].question}
👨🏻‍💻 Answer : ${data.result.QandA[3].answer}

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `
return await conn.sendMessage(from, { image: { url: data.result.image} , caption: info } , { quoted: mek })
} catch (e) {
console.log(e)
}
})

//=============================================================================================================================

cmd({
    pattern: "esananews",
    react: '📰',
    alias: ["newsesana","esana"],
    desc: "To see esana news",
    category: "news",
    use: '.esana',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const latst = await api.latest_id();
            const nws = latst.results.news_id
            let nn = q || nws
            const ress = await api.news(nn);
            const res = ress.results;

            const txt2 = await conn.sendMessage(from, {image: 
	    {url: res.COVER},caption: `\n┃◉⇨ 𝚃𝙸𝚃𝙻𝙴 :${res.TITLE}\n\n┃◉⇨ 𝙳𝙰𝚃𝙴 :${res.PUBLISHED}\n\n┃◉⇨ 𝚄𝚁𝙻 :${res.URL}\n\n┃◉ ⇨ 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽 : ${res.DESCRIPTION}\n\n> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ \n\n`},
			{ quoted: mek });
await conn.sendMessage(from, { react: { text: `🗞️`, key: mek.key }}) 
} catch (e) {
reply()
console.log(e)
}
})       

//================================================================================================================

cmd({
    pattern: "technews",
    alias: ["tech","gadgets360"],
    react: "📡",
    desc: "It gives Tech news.",
    category: "news",
    use: '.technews',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const data = await fetchJson('https://api.maher-zubair.tech/details/tnews')
let info = `📃 Title : ${data.result.title}
⛓️ Link: ${data.result.link}
📚 Description: ${data.result.desc}

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`
return await conn.sendMessage(from, { image: { url: data.result.img} , caption: info } , { quoted: mek })
} catch (e) {
console.log(e)
}
})
