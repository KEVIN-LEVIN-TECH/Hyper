const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../DATABASE/functions')
const fetch = require('node-fetch')
let wm = `> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `

async function generate(prompt) {
    try {
        const seed = Math.floor(Math.random() * 1e9);
        const params = new URLSearchParams({
            new: "true",
            prompt: prompt,
            model: "absolutereality_v181.safetensors [3d9d4d2b]",
            negative_prompt: "",
            steps: "20",
            cfg: "7",
            seed: seed.toString(),
            sampler: "DPM++ 2M Karras",
            aspect_ratio: "square"
        });

        let res = await fetch(`https://api.prodia.com/generate?${params}`);
        if (!res.ok) return { status: false, msg: 'Failed to initiate image generation' };

        const data = await res.json();
        const jobId = data.job;
        const maxAttempts = 10;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            res = await fetch(`https://api.prodia.com/job/${jobId}`);
            if (!res.ok) {
                return { status: false, msg: 'Failed to check job status' };
            }

            const jobData = await res.json();
            if (jobData.status === 'succeeded') {
                return {
                    status: true,
                    result: {
                        prompt,
                        url: `https://images.prodia.xyz/${jobId}.png?download=1`
                    }
                };
            }

            if (attempt < maxAttempts - 1) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        return { status: false, msg: '*Image Generation Timed Out :(* ' };

    } catch (e) {
        console.error(e);
        return { status: false, msg: e.message };
    }
}

cmd({
    pattern: "prodia2",
    alias: ["logoai","ail","gptlogo"],
    react: '👾',
    category: "ai",
    desc: "It creates ai logos.",
    use: '.ailogo <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please Enter A Query ⌨")
const json = await generate(q);
conn.sendMessage(from, { image: { url: json.result.url }, caption: wm }, { quoted: mek })
} catch (e) {
reply("I Can't Create That Logo 😓")
console.log(e)
}
})
