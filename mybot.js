
//This is a specific part for glitch to keep the bot alive
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(new Date().toLocaleString() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 250000);


const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
const config = require("/app/config.json");

client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  var channel = member.guild.channels.find("name", "greeting");
  var logchannel = member.guild.channels.find("name", "logs");
  var roleschannel = member.guild.channels.find("name", "roles");
  var ruleschannel = member.guild.channels.find("name", "discord-server-rules");
  logchannel.send(`:white_check_mark: ${member} has joined HypeFuse!`);
  channel.send({embed: {
    "title": "Explore our Discord Server to meet new people and participate in the biggest tournaments!",
    "url": "https://hypefuse.wixsite.com/gaming",
    "description": `:arrow_right: Welcome! ${member} \n:arrow_right: On behalf of everyone here at HypeFuse, I would like to welcome you to this amazing E-Sports organization\n:one: Go to ${roleschannel} to assign the role that corresponds to what tournament you are in\n:two: Please read the ${ruleschannel}\n:arrow_right: If you have any issues please feel free to use the command !mod and explain the issue and it will be resolved`,
    "author": {
      "name": "Welcome to HypeFuse!",
      "icon_url": "https://image.ibb.co/nsGR0S/test.png"
    },
    "color": 431075,
    "thumbnail": {
      "url": "https://image.ibb.co/nsGR0S/test.png"
    },
    "footer": {
      "text": "Stay Hyped!",
      "icon_url": "https://image.ibb.co/nsGR0S/test.png"
    }
  }}).then(msg => {
    msg.delete(7200000)
    // 10000 for testing
  })
  .catch();
});

client.on("guildMemberRemove", (member) => {
  var logchannel = member.guild.channels.find("name", "logs");
  logchannel.send(`:no_entry_sign: ${member.displayName} has left HypeFuse :(`);
});

client.on("ready", () => {
  var logchannel = client.channels.find("name", "logs");
  console.log("Bot has booted up at " + new Date().toLocaleString());
  client.user.setActivity("HypeFuse Tournaments");
  logchannel.send("Hyper has booted up! **Playing HypeFuse Tournaments**");
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "say")
  {
    let myRole = message.guild.roles.find("name", "Staff");
    let myRole2 = message.guild.roles.find("name", "news");
    if (!message.member.roles.has(myRole.id) && !message.member.roles.has(myRole2.id))
    return message.channel.send("Sorry, but you need to be **Staff** or **news** to use the *say*-command!").then(msg => {
      message.delete(10000)
      msg.delete(10000)
    });
    message.delete();
    message.channel.send(message.content.slice(config.prefix.length + 3));
  }else
  if(command === "shutdown")
  {
    if(message.author.id !== config.ownerID) return;
    var logchannel = client.channels.find("name", "logs2");
    logchannel.send("Hyper has shutdown!");
    client.destroy((err) => {
        console.log(err);
    });
  }else
  if(command === "ping")
  {
    let myRole = message.guild.roles.find("name", "Staff");
    if (!message.member.roles.has(myRole.id))
    return message.channel.send("Sorry, but you need to be **Staff** to use the *ping*-command!").then(msg => {
      message.delete(10000)
      msg.delete(10000)
    });
    message.channel.send(":ping_pong: Ponged in " + Math.round(client.ping) + "ms.").catch(console.error);
  }else
  if(command === "embed")
  {
    if(args[0] === "1")
    {
    message.channel.send({embed: {
      "title": "News",
      "description": `:busts_in_silhouette: @here :busts_in_silhouette: \n  :arrow_right: The Guild Wars tournament will be this weekend 31st of March to the 8th of April\n:arrow_right:May all Guild Leaders please sign up using the link https://hypefuse.ga/ where the sign up forms are`,
      "author": {
        "name": "HypeFuse!",
        "icon_url": "https://image.ibb.co/nsGR0S/test.png"
      },
      "color": 431075,
      "thumbnail": {
        "url": "https://image.ibb.co/nsGR0S/test.png"
      },
      "footer": {
        "text": "Stay Hyped!",
        "icon_url": "https://image.ibb.co/nsGR0S/test.png"
      }
    }});
  }
  }else
  if(command === "tconvert") {
    if(args[0] === "PST") {
      message.channel.send("Pacific Standard Time has an offset to GMT by **-8:00** hours.");
    }else
    if(args[0] === "WST") {
      message.channel.send("West Samoa Time has an offset to GMT by **+14:00** hours.");
    }else
    if(args[0] === "CEST") {
      message.channel.send("Central European Summer Time has an offset to GMT by **+2:00** hours.");
    }else
    if(args[0] === "CET") {
      message.channel.send("Central European Time has an offset to GMT by **+1:00** hour.");
    }else
    if(args[0] === "IST") {
      message.channel.send("India Standard Time has an offset to GMT by **+5:30** hours.");
    }else
    if(args[0] === "MST") {
      message.channel.send("Mountain Standard Time has an offset to GMT by **-7:00** hours.");
    }else
    if(args[0] === "PDT") {
      message.channel.send("Pacific Daylight Time has an offset to GMT by **-7:00** hours.");
    }else
    if(args[0] === "A") {
      message.channel.send("Alpha Time Zone has an offset to GMT by **+1:00** hour.");
    }else {
      message.channel.send("Sorry, but I was unable to recognize this time zone. Please use PST, WST, CEST, CET, IST, MST, PDT or A.");
    }
  }
});

//The token is stored in an env file located on glitch
client.login(process.env.TOKEN);