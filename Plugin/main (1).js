const { cmd, commands } = require('../command');
const config = require('../config');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson , runtime ,sleep } = require('../DATABASE/functions')
const { checkAccess, isPremiumUser, blacklistedJIDs, premiumJIDs, dataLoaded } = require('../DATABASE/accessControl');
const mono = "```"

    function detectPlatform() {
      if (process.env.REPL_ID) return 'Replit';
      if (process.env.HEROKU_APP_NAME) return 'Heroku';
      if (process.env.KOYEB_PROJECT_ID) return 'Koyeb';
      if (process.env.AWS_LAMBDA_FUNCTION_NAME) return 'AWS Lambda';
      if (process.env.VERCEL) return 'Vercel';
      if (process.env.RENDER) return 'Render';
      if (process.env.NETLIFY) return 'Netlify';
      if (process.env.WORKFLOW) return 'Workflow';
      if (process.env.FLYIO_APP_NAME) return 'Fly.io';
      return 'Unknown Platform';
    }
    const platformName = detectPlatform();

    

cmd({
      pattern: "runtime",
      desc: "Chek Bot Runtime",
      category: "main",
      react: "⏰",
      filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
      try {

          // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }

          // Status message to be sent


          let desc = `🚀 𝖱𝗎𝗇𝗍𝗂𝗆𝖾 : ${uptime}`

          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `Runtime ⏰`,
              body: `https://HYPER-md-main-web.vercel.app/`,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`Error: ${e.message}`);
      }
    });


        




cmd({
      pattern: "alive",
      alias: ["online"],
      desc: "Chek Bot Alive",
      category: "main",
      react: "🧚🏻‍♀️",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{

          // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }

          // Status message to be sent


          let desc = `👋 Hello ${pushname}

👨‍💻🇱🇰 I'm HYPER-MD-V1 Whatsapp Bot

> Platform :  ${os.hostname()}
> Ram Usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> Runtime : ${runtime(process.uptime())} 
> Version : 2.0.0
                                                                                                  
🐼 Have A Nice Day 🐼

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `





          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `I'm Alive Now 👨‍💻`,
              body: `https://HYPER-md-main-web.vercel.app/`,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`Error: ${e.message}`);
      }
    });

















cmd({
      pattern: "allmenu",
      alias: ["panel"],
      desc: "Get Bot Menu",
      category: "main",
      react: "📁",
      filename: __filename
},
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
let menu = {
main: '',
download: '',
movie: '',
group: '',
owner: '',
convert: '',
news: '',
ai: '',
tools: '',
search: '',
fun: '',
voice: '',
other: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `.${commands[i].pattern}\n`;
 }
}

          // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }

          // Status message to be sent


          let desc = `👋 Hello ${pushname}
          
╭─「 ᴄᴏᴍᴍᴀɴᴅ ᴘᴀɴᴇʟ 」
│◈ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}
│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│◈ ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}
│◈ ᴠᴇʀꜱɪᴏɴ : 2.0.0
╰──────────●●►

╭──────────●●►
 📥 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮
  ───────
 ${menu.download}
╰───────────●●►
╭──────────●●►
 🎬 𝐌𝐨𝐯𝐢𝐞 𝐌𝐞𝐧𝐮
  ───────
 ${menu.movie}
╰───────────●●►
╭──────────●●►
 👾 𝐀𝐢 𝐌𝐞𝐧𝐮
  ───────
 ${menu.ai}
╰───────────●●►
╭──────────●●►
 🔧 𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮
  ───────
 ${menu.main}
╰───────────●●►
╭──────────●●►
 🎉 𝐅𝐮𝐧 𝐌𝐞𝐧𝐮
  ───────
 ${menu.fun}
╰───────────●●►
╭──────────●●►
 🔄 𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐌𝐞𝐧𝐮
  ───────
 ${menu.convert}
╰───────────●●►
╭──────────●●►
 🔍 𝐒𝐞𝐚𝐫𝐜𝐡 𝐌𝐞𝐧𝐮
  ───────
 ${menu.search}
╰───────────●●►
╭──────────●●►
 👥 𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮
  ───────
 ${menu.group}
╰───────────●●►
╭──────────●●►
 🔒 𝐎𝐰𝐧𝐞𝐫 𝐌𝐞𝐧𝐮
  ───────
 ${menu.owner}
╰───────────●●►
╭──────────●●►
 ⚙️ 𝐎𝐭𝐡𝐞𝐫 𝐌𝐞𝐧𝐮
  ───────
 ${menu.other}
╰───────────●●►
╭──────────●●►
 🛠️ 𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮
  ───────
 ${menu.tools}
╰───────────●●►
╭──────────●●►
 📰 𝐍𝐞𝐰𝐬 𝐌𝐞𝐧𝐮
  ───────
 ${menu.news}
╰───────────●●►
╭──────────●●►
 🌌 𝐋𝐨𝐠𝐨 𝐌𝐞𝐧𝐮
  ───────
 ${menu.logo}
╰───────────●●►

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `





          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `HYPER-MD All Menu List`,
              body: `https://HYPER-md-main-web.vercel.app/`,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`Error: ${e.message}`);
      }
    });


cmd({
      pattern: "owner",
      desc: "Chek Bot Owner",
      category: "main",
      react: "👨‍💻",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
 
          // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }

          // Status message to be sent


          let desc = `👋 Hello ${pushname}

> 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 

⚡ᴏᴡɴᴇʀ ɴᴀᴍᴇ -: Mr Senesh Amantha (kevin)
⚡ɴᴜᴍʙᴇʀ -: 94784337506
⚡ʏᴏᴜᴛᴜʙᴇ -: 
⚡ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ-: 

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `





          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `HYPER-MD Owner Information`,
              body: `https://HYPER-tech-web.vercel.app/`,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`Error: ${e.message}`);
      }
    });


cmd({
      pattern: "support",
      desc: "To get the bot informations.",
      category: "main",
      react: "⛓",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
 
          // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }

          // Status message to be sent


          let desc = `👋 Hello ${pushname}

👨‍💻HYPER-MD-V1 Support Channels💗

Youtube Channel Link: 

Whatsapp Channel Link: 

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `





          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `HYPER-MD Support Channels`,
              body: `https://HYPER-md-main-web.vercel.app/`,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`Error: ${e.message}`);
      }
    });


cmd({
      pattern: "repo",
      desc: "To get the repo informations.",
      category: "main",
      react: "📡",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
 
          // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }

          // Status message to be sent


          let desc = `👋 Hello ${pushname}
          
📍𝖱𝖾𝗉𝗈 𝖫𝗂𝗇𝗄 ❤️‍🔥👇

👨‍💻◦ 

📍𝖯𝗅𝖾𝖺𝗌𝖾 𝖲𝗎𝖻𝗌𝖼𝗋𝗂𝖻𝖾 𝖬𝗒 𝖸𝗈𝗎𝗍𝗎𝖻𝖾 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 👇

👨‍💻◦ 

📍𝖯𝗅𝖾𝖺𝗌𝖾 𝖥𝗈𝗅𝗅𝗈𝗐 𝖬𝗒 𝖶𝗁𝖺𝗍𝗌𝖺𝗉𝗉 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 👇

👨‍💻◦ 

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `





          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `HYPER-MD Repo Informations`,
              body: ``,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`Error: ${e.message}`);
      }
    });


cmd({
      pattern: "about",
      desc: "To get the bot informations.",
      category: "main",
      react: "ℹ️",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{

          // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }

          // Status message to be sent


          let desc = `👋 𝐇𝐄𝐋𝐋𝐎𝐖 𝐓𝐇𝐄𝐈𝐑 ${senderNumber}

𝐈 𝐀𝐌 𝐒𝐀𝐇𝐀𝐒-𝐌𝐃 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓

𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐒𝐀𝐇𝐀𝐒 𝐓𝐄𝐂𝐇 (𝐒𝐄𝐍𝐄𝐒𝐇 𝐀𝐌𝐀𝐍𝐓𝐇𝐀)..
           
ɢɪᴛʜᴜʙ : 
             
ʏᴏᴜᴛᴜʙᴇ : 
      
ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ : 

THANK FOR USING HYPER-MD`





          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `HYPER-MD About`,
              body: `https://HYPER-md-main-web.vercel.app/`,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`Error: ${e.message}`);
      }
    });


cmd({
      pattern: "system",
      alias: ["status", "botinfo"],
      desc: "Check uptime, RAM usage, CPU info, and more",
      category: "main",
      react: "🧬",
      filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
      try {

          // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }

          // Status message to be sent
        
          
          let desc = `乂 HYPER-MD-V2 SYSTEM INFORMATION

⏰𝖱𝗎𝗇𝗍𝗂𝗆𝖾:-  ${runtime(process.uptime())}    
📟𝖱𝖺𝗆 𝖴𝗌𝖺𝗀𝖾:- ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
⚙️𝖯𝗅𝖺𝗍𝖿𝗈𝗋𝗆:- ${os.hostname()}
👨‍💻𝖮𝗐𝗇𝖾𝗋:- 𝖲𝖺𝗁𝖺𝗌 Tech   
👾𝖵𝖾𝗋𝗌𝗂𝗈𝗇:- 2.0.0

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `

       

          

          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `HYPER-MD System Information`,
              body: `https://HYPER-md-main-web.vercel.app/`,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`Error: ${e.message}`);
      }
    });


cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "🪄",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
 
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '```Pinging To index.js!!!```' });
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the ping response without buttons
        await conn.sendMessage(from, { text: `📍 Pong : ${ping}ms` }, { quoted: message })
    } catch (e) {
        console.error(e);
        reply(`${e}`);
  }
});

//menu cmd

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "menu the bot",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `👋 Hello ${pushname}

╭─「 ᴄᴏᴍᴍᴀɴᴅ ᴘᴀɴᴇʟ」
│◈ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}
│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│◈ ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}
│◈ ᴠᴇʀꜱɪᴏɴ : 1.0.0
╰──────────●●►

╭╼╼╼╼╼╼╼╼╼╼
├ 1 • OWNER
├ 2 • CONVERT
├ 3 • AI
├ 4 • SEARCH
├ 5 • DOWNLOAD
├ 6 • MAIN
├ 7 • GROUP
├ 8 • FUN
├ 9 • MOVIE
├ 10 • OTHER
├ 11 • NEWS
├ 12 • TOOLS
├ 13 • LOGO
╰╼╼╼╼╼╼╼╼╼╼

╭────────❍──────❍❍➣
┝❍ TOTAL COMMANDS : 182
╰────────❍──────❍❍➣

_🌟 Reply with the Number you want to select_

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

                  // Sending the image with caption
          const vv = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'HYPER-MD',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `HYPER-MD Menu List`,
              body: `https://HYPER-md-main-web.vercel.app/`,
              thumbnailUrl: `https://pomf2.lain.la/f/uzu4feg.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        reply(`╭────────────────❍❍➣
 🔒 𝐎𝐰𝐧𝐞𝐫 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .join
┝❍ .restart
┝❍ .shutdown
┝❍ .broadcast
┝❍ .setpp
┝❍ .block
┝❍ .unblock
┝❍ .clearchats
┝❍ .startnews
┝❍ .stopnews
┝❍ .jid
┝❍ .gjid
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
                        break;
                    case '2':               
                        reply(`╭────────────────❍❍➣
 🔄 𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍  .convert
┝❍ .sticker2
┝❍ .tts
┝❍ .qmake
┝❍ .readmore
┝❍ .sticker
┝❍ .vv
┝❍ .circle
┝❍ .crop
┝❍ .round
┝❍ .toaudio
┝❍ .toanime
┝❍ .currency
┝❍ .url
┝❍ .img2url
┝❍ .trt
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
                        break;
                    case '3':               
                        reply(`╭────────────────❍❍➣
 👾 𝐀𝐢 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .ai
┝❍ .bing
┝❍ .copilot
┝❍ .blackbox
┝❍ .bingimgai
┝❍ .gemini
┝❍ .gpt4
┝❍ .laland
┝❍ .obfus
┝❍ .prodia
┝❍ .prodia2
┝❍ .texttoimg1
┝❍ .texttoimg2
┝❍ .texttoimg3
┝❍ .aemtv1
┝❍ .aemtv2
┝❍ .aemtv3
┝❍ .aemtv4
┝❍ .aemtv5
┝❍ .aemtv6
┝❍ .aemtv7
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
                        break;
                    case '4':               
                        reply(`╭────────────────❍❍➣
 🔍 𝐒𝐞𝐚𝐫𝐜𝐡 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .lyric 
┝❍ .yts
┝❍ .srepo
┝❍ .weather1
┝❍ .tiktoksearch
┝❍ .horo
┝❍ .google
┝❍ .couplepp
┝❍ .snumber
┝❍ .weather
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
                        break;
                    case '5':               
                        reply(`╭────────────────❍❍➣
 📥 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .song2
┝❍ .video
┝❍ .fb
┝❍ .tt
┝❍ .gdrive
┝❍ .apkdl
┝❍ .twitter
┝❍ .apk
┝❍ .img
┝❍ .mfire
┝❍ .scloud
┝❍ .song
┝❍ .xnxx
┝❍ .xvideo
┝❍ .mega
┝❍ .gitclone
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
                        break;
                    case '6':               
                        reply(`╭────────────────❍❍➣
 🔧 𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍  .runtime
┝❍ .alive
┝❍ .allmenu
┝❍ .owner
┝❍ .support
┝❍ .repo
┝❍ .about
┝❍ .system
┝❍ .ping
┝❍ .allmenu
┝❍ .menu
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
                        break;
                    case '7':               
                        reply(`╭────────────────❍❍➣
 👥 𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .mute
┝❍ .unmute
┝❍ .promote
┝❍ .demote
┝❍ .del
┝❍ .add
┝❍ .setgoodbye
┝❍ .setwelcome
┝❍ .admins
┝❍ .groupdesc
┝❍ .groupinfo
┝❍ .grouplink
┝❍ .gname
┝❍ .setsubject
┝❍ .tagall
┝❍ .requests
┝❍ .accept
┝❍ .reject
┝❍ .hidetag
┝❍ .kick
┝❍ .unlock
┝❍ .lock
┝❍ .approve
┝❍ .poll
┝❍ .getpic
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
                       break;
                    case '8':               
                        reply(`╭────────────────❍❍➣
 🎉 𝐅𝐮𝐧 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .animegirl
┝❍ .dog
┝❍ .fact
┝❍ .hack
┝❍ .insult
┝❍ .joke
┝❍ .quote
┝❍ .ronaldo
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);

                        break;
                    case '9':               
                        reply(`╭────────────────❍❍➣
 🎬 𝐌𝐨𝐯𝐢𝐞 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .movie
┝❍ .jshare (ꜱɪɴʜᴀʟᴀ ꜱᴜʙ ᴍᴏᴠɪᴇ ᴊɪᴅ ꜱʜᴀʀᴇ)
┝❍ .uploadme
┝❍ .ytsmx
┝❍ .uploadmovie
┝❍ .moviekv
┝❍ .uploadtv
┝❍ .uploadtvm
┝❍ .uploadmoviem
┝❍ .uploadzip
┝❍ .uploadzipn
┝❍ .uploadzipfile
┝❍ .imdb
┝❍ .gdmovie
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);

                    break;
                    case '10':               
                        reply(`╭────────────────❍❍➣
 ⚙️ 𝐎𝐭𝐡𝐞𝐫 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .anime1
┝❍ .anime2
┝❍ .anime3
┝❍ .anime4
┝❍ .anime5
┝❍ .loli
┝❍ .waifu
┝❍ .neko
┝❍ .megumin
┝❍ .maid
┝❍ .awoo
┝❍ .define
┝❍ .githubstalk
┝❍ .gpass
┝❍ .wiki
┝❍ .ss
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);

                    break;
                    case '11':               
                        reply(`╭────────────────❍❍➣
 📰 𝐍𝐞𝐰𝐬 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .hirunews
┝❍ .sirasanews
┝❍ .derananews
┝❍ .lankadeepanews
┝❍ .bbcnews
┝❍ .ios
┝❍ .esananews
┝❍ .technews
┝❍ .wabeta
┝❍ .news
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);

                    break;
                    case '12':               
                        reply(`╭────────────────❍❍➣
 🛠️ 𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .bass
┝❍ .blown
┝❍ .deep
┝❍ .fast
┝❍ .reverse2
┝❍ .calc
┝❍ .translate
┝❍ .reverse
┝❍ .tempmail
┝❍ .checkmail
┝❍ .delmail
┝❍ .encode
┝❍ .decode
┝❍ .npmstalk
┝❍ .iplookup
┝❍ .instastalk
┝❍ .githubuser
┝❍ .password
┝❍ .hijact
┝❍ .antispam
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);

                    break;
                    case '13':               
                        reply(`╭────────────────❍❍➣
 🌌 𝐋𝐨𝐠𝐨 𝐌𝐞𝐧𝐮
┝───────❍❍❍❍❍
┝❍ .logo1
┝❍ .logo2
╰────────────────❍❍➣

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
