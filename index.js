const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "!";

client.login("process.env.BOT_TOKEN");

client.on("ready", () => {
    console.log("---------------------------")
    console.log("[!] Connexion établie [!]")
    console.log("---------------------------")
    client.user.setActivity(`!help | ${client.guilds.size} serveur`);
});

client.on(`message`, async message => {
    if(message.content === prefix + "reboot") {
        if (message.author.id === "463709053298802691") {
            message.channel.send(":gear: Redemarrage en cours...")
            client.destroy()
            
            client.login('NTE1MjQyNDIzNTIyMjk1ODI5.Dtsv8A.fD5pFcyT8o1oWipSlY5Gn3Z2kgU')
            message.channel.send(":gear: Redemarrage terminé !")}
            else {
                message.channel.send(':x: Vous ne disposez pas des permissions nécessaires pour effectuer cette commande !')
        }
    console.log("Redémarrage terminé !")
    }
});

client.on(`message`, message => {

    if (message.content === "Bonjour") {
        message.reply("Salut");
        console.log("Le bot dit bonjour");
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission ! :x:")

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur ! :x:')
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il existe pas ! :x:")
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission ! :x:")
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute ! :white_check_mark:`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission ! :x:")

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur ! :x:')
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il existe pas ! :x:")
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission ! :x:")
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute ! :white_check_mark:`);
        })
    }

    if(message.content === prefix + "invite"){
        let inviteEmbed = new Discord.RichEmbed()
        .setDescription(":computer: Invitation du bot :computer:")
        .setColor('#1CFF1C')
        .addField("Lien d'invitation :", "https://discordapp.com/oauth2/authorize?client_id=515242423522295829&scope=bot&permissions=2146958839")
        .setFooter("Invitation - SuperBot-Game")
        message.author.send({embed: inviteEmbed});
        console.log("Une personne a utiliser la commande !invite");
    }

    if(message.content === prefix + "info"){

        
    let infoEmbed = new Discord.RichEmbed()
        .setDescription(":white_check_mark: Informations :white_check_mark:")
        .setColor('#1CFF1C')
        .addField("Créateur du bot", "Zafox#1955")
        .addField("Date de création du bot", "22/11/2018")
        .addField("Discord du créateur", "https://discord.gg/8VESbhc")
        .setFooter('Informations du bot')
        message.channel.send(infoEmbed)
        console.log("Une personne a utiliser la commande !info")
    }

    if(message.content === prefix + "server"){
        let server_name = message.guild.name
        let server_size = message.guild.members.size
        let serverEmbed = new Discord.RichEmbed()
        .setTitle(":white_check_mark: Informations du serveur :white_check_mark:")
        .setColor('#1CFF1C')
        .addField("Nom du serveur :", server_name, true)
        .addField("Nombre de personne sur le serveur :", server_size, true)
        message.channel.send(serverEmbed)
        console.log("Une personne a utiliser la commande !server")
    }

    if (message.content.startsWith(prefix + "ping")) {
        const startTime = Date.now();
        message.channel.send(`Pong`)
        .then(msg => {
          const endTime = Date.now();
          msg.edit(`Pong (${endTime - startTime}ms)`);
        });
        console.log("Une personne a utiliser la commande !ping")
      }

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "stats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#FCDC12")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField(`Date de création de l'utilisateur :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages privés ! Tu vien de recevoir tes statistiques !")
        message.author.send({embed: stats_embed});
        console.log("Une personne a utiliser la commande !stats")
        break;
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas les permissions ! :x:")

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur ! :x:")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe :x:")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour kick :x:")
        }

        kick.kick().then(member => {
            message.channel.send(`${member.user.username} est kick par ${message.author.username} :white_check_mark:`)
            console.log("Une personne à kick une personne avec !kick")
        });

    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission :x:")

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur :x:");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission de ban :x:");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} à été banni par ${message.author.username} ! :white_check_mark:`)
            console.log("Une personne à ban une personne avec !ban")
        }

        )
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission :x:");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer ! :x:")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés ! :white_check_mark:`);
            console.log("Une personne a utiliser la commande !clear")
        })
    }

});

client.on(`message`, message => {

    if(message.content === prefix + "help"){
        let testEmbed = new Discord.RichEmbed()
        .setTitle("**:gear: Toutes les commande :gear:**")
        .setColor('#1CFF1C')
        .addField("Commandes utiles : :desktop:", "!help !server !ping !info !stats")
        .addField("Commandes de modérations : :rotating_light:", "!kick !ban !clear !reboot !warns")
        .addField("Commandes divers : :clipboard:", "!invite")
        .setFooter('Commandes - !help')
        message.channel.send(testEmbed)
        console.log("Une personne a utiliser la commande !help")
    }

    var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
  
});
