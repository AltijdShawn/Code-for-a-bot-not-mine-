const discord = require("discord.js");
const botConfig = require("./botConfig.json");

const bot = new discord.Client();

bot.on("ready", async () => {

    console.log(`${bot.user.username} Is Verbonden Met Deze Bot!`);

    bot.user.setActivity("Prefix * !", { type: "PLAYING" });

});



bot.on("message", async message => {

    //als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    let arguments = message.content.slice(prefix.length).trim().split(/ +/g);

    var messageArray = message.content.split(" ");

    var command = messageArray[0];



    if (command === `${prefix}hallo`) {

        return message.channel.send("hoi ik ben kees")
    }


    if (command === `${prefix}info`) {

        var BotIcon = bot.user.displayAvatarURL;

        var botEmbed = new discord.RichEmbed()
            .setDescription("discord bot info")
            .setColor("#29e53f")
            .setThumbnail(BotIcon)
            .addField("bot naam", bot.user.username)
            .addField("Gemaakt op", bot.user.createdAt);

        return message.channel.send(botEmbed);


    }

    if (command === `${prefix}serverinfo`) {

        var icon = message.guild.iconURL

        var serverEmbed = new discord.RichEmbed()
            .setDescription("server info")
            .setColor("#29e53f")
            .setThumbnail(icon)
            .addField("bot naam", bot.user.username)
            .addField("je bent gejoind op", message.member.joinedAt)
            .addField("Totaal members", message.guild.memberCount);


        return message.channel.send(serverEmbed);


    }

    if (command === `${prefix}kick`) {

        // !kick @IliasPlayz#7215 redenen hier.

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

        if (!kickUser) return message.channel.send("Dit gebruiker is niet gevonden!");

        var reasen = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("sorry jij kan dit niet doen");

        if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("deze gebruiker kan je niet kicken");

        var kick = new discord.RichEmbed()

            .setDescription("Kick")
            .setColor("#ee0000")
            .addField("Kickt gebruiker", kickUser)
            .addField("Gekickt door", message.author)
            .addField("Reden", reasen)

        var kickChannel = message.guild.channels.find(`name`, "straffen");
        if (!kickChannel) return message.channel.send("kan het kanaal niet vinden");

        message.guild.member(kickUser).kick(reasen);

        kickChannel.send(kick);

        return;

    }

    if (command === `${prefix}ban`) {
    
    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (!banUser) return message.channel.send("Gebruiker is niet gevonden");

    var reasen = arguments.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("sorry jij kan dit niet doen");

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("deze gebruiker kan je niet bannen");

    var ban = new discord.RichEmbed()

        .setDescription("ban")
        .setColor("#ee0000")
        .addField("Verbanned gebruiker", banUser)
        .addField("Gebant door", message.author)
        .addField("Reden", reasen)

    var banChannel = message.guild.channels.find(`name`, "straffen");
    if (!banChannel) return message.channel.send("kan het kanaal niet vinden");

    message.guild.member(banUser).ban(reasen);

    banChannel.send(ban);



    return;





}
 });

bot.login(botConfig.token);
