const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const mongoUtil = require("./DB/db");

const Discord = require("discord.js");

const Client = Discord.Client;

const bot = new Client();

mongoUtil.connect_to_server((err, client) => {
  if (err) console.log(err);

  const Add = require("./commands/add");

  bot.login(TOKEN);

  bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}`);
  });

  bot.on("message", async (msg) => {
    if (msg.author.bot) return;

    let content = msg.content;
    let indexOfSpace = content.indexOf(" ");
    let command = content.substr(0, indexOfSpace).trim();

    content = content.replace(command, "");

    const args = content.split("||");

    if (command === "-add") {
      const link = args[0].trim();
      const message = args[1].trim();
      try {
        await Add.add(link, message);
      } catch (ex) {}
    }
  });

  bot.on("guildMemberAdd", async (member) => {
    const db = mongoUtil.getDB();
    try {
      const guild = member.guild;
      const channel = guild.channels.cache.find((c) => c.id === CHANNEL_ID);
      let result, actualResult;
      actualResult = await db.collection("Messages").find().toArray();
      let length = actualResult.length;
      result = actualResult[getRandomInt(0, length - 1)];
      // channel.send(result.link);
      // channel.send(result.message + ` <@${member.id}>`);
      // channel.send("");

      const embed = new Discord.MessageEmbed();
      embed.setColor(Math.floor(Math.random() * 16777214) + 1);
      embed.setTitle("WELCOME _/\\_ വണക്കം");
      embed.setDescription(result.message + `<@${member.id}>`);
      embed.setImage(result.link);
      embed.setFooter(
        "Also check out the #get-a-role-here channel to get yourselves roles and more privilages!",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpWAxNhD-0dogjiXXzDtjJ_FRl8neySpvlOA&usqp=CAU"
      );
      channel.send(embed);
    } catch (ex) {}
  });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const http = require("http");

http
  .createServer((req, res, next) => {
    res.end();
  })
  .listen(process.env.PORT || 3000);
