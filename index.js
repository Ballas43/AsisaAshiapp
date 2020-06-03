const {Client, MessageAttachment} = require("discord.js");
const emd = require('discord.js');
const bot = new Client();
const ig = require('instagram-posts')
const image_search = require('g-i-s')
const yts = require( 'yt-search' )
const request = require("request")
const ytdl = require("ytdl-core")
const prefix = "tod";
const token = "NzAxNDAyNDkwNzQ2MzA2NTcw.Xq1Eaw.dHl3Cnwe1Jj4UnKaRB56oh2miYk"


const queue = [];
var isplaying = "";
pos = 0

bot.on("guildMemberAdd", member=>{
    const channel = member.guild.channels.find(channel => channel.name === "anything");
    if(!channel) return;
    
    channel.send(`Selamat datang asu, kita masih setay disini anj, ${member}. Ngeteh yu asu`)
});

bot.on("ready", () =>{
    console.log("Saya hidup hehe");
})

bot.on("disconnect", () =>{
    console.log("Inet bucat");
})

bot.on('message', async message => {
    let args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case 'image':
            message.delete()
            var keyword = args.slice(1).join(" ")
            image(message, keyword)
        break;
        case 'doge':
            message.delete()
            message.channel.send("Bacot")
        break;

        case 'igeh':
            message.delete()
            var keyword = args.slice(1).join(" ")
            ig_scrape(message, keyword)
        break;

        case 'bodoamat':

            if (isplaying === "playing"){
                message.channel.send("Ini lagi ngeplay jir")
                return;
            }

            if (message.member.voice.channel) {
                message.delete();
                const connect = await message.member.voice.channel.join();
                const dispatcher = connect.play('bodoamat.mp3')
                message.channel.send("Bodo amat ￣へ￣")
                isplaying = "playing"
                dispatcher.on('finish', () => {
                    console.log('Beres');
                    connect.disconnect();
                    isplaying = "stopped"
                });

            } else {
                message.delete();
                message.reply('Masuk dulu ke voice bangke >:(');
            }
        
        break;

        case 'barbaryu':

            if (isplaying === "playing"){
                message.channel.send("Ini lagi ngeplay jir")
                return;
            }    

            if (message.member.voice.channel) {
                message.delete();
                const connect = await message.member.voice.channel.join();
                const dispatcher = connect.play('barbaryu.mp3')
                message.channel.send("BARBAR YU ANJ! (╯‵□′)╯︵┻━┻")
                isplaying = "playing"
                dispatcher.on('finish', () => {
                    console.log('Beres');
                    connect.disconnect();
                    isplaying = "stopped"
                });

            } else {
                message.delete();
                message.reply('Masuk dulu ke voice bangke >:(');
            }
        
        break;

        case 'basrenganj':

            if (isplaying === "playing"){
                message.channel.send("Ini lagi ngeplay jir")
                return;
            }
        
            if (message.member.voice.channel) {
                message.delete();
                const connect = await message.member.voice.channel.join();
                const dispatcher = connect.play('basrenganj.mp3')
                message.channel.send("Basreng ANJ! (╯‵□′)╯︵┻━┻")
                isplaying = "playing"
                dispatcher.on('finish', () => {
                    console.log('Beres');
                    connect.disconnect();
                    isplaying = "stopped"
                });

            } else {
                message.delete();
                message.reply('Masuk dulu ke voice bangke >:(');
            }
        
        break;
        
        case 'ngetehasu':

            if (isplaying === "playing"){
                message.channel.send("Ini lagi ngeplay jir")
                return;
            }
        
            if (message.member.voice.channel) {
                message.delete();
                const connect = await message.member.voice.channel.join();
                const dispatcher = connect.play('ngetehasu.mp3')
                message.channel.send("Ngeteh Asu (～￣▽￣)～")
                isplaying = "playing"
                dispatcher.on('finish', () => {
                    console.log('Beres');
                    connect.disconnect();
                    isplaying = "stopped"
                });

            } else {
                message.delete();
                message.reply('Masuk dulu ke voice bangke >:(');
            }
        
        break;

        case 'bijigue':

            if (isplaying === "playing"){
                message.channel.send("Ini lagi ngeplay jir")
                return;
            }
        
            if (message.member.voice.channel) {
                message.delete();
                const connect = await message.member.voice.channel.join();
                const dispatcher = connect.play('bijigue.mp3')
                message.channel.send(".......")
                isplaying = "playing"
                dispatcher.on('finish', () => {
                    console.log('Beres');
                    connect.disconnect();
                    isplaying = "stopped"
                });

            } else {
                message.delete();
                message.reply('Masuk dulu ke voice bangke >:(');
            }
        
        break;

        case 'mulai':

            async function putar(){
                
                if (!args[1]){
                    message.reply("Judulna naon bangke >:(");
                    return;
                }
                
                var keyword = args.slice(1).join(" ")

                const r = await yts(keyword);
                const videos = r.videos;
                const vid = videos[0];

                if (!queue[0]){
                    
                    pos = pos + 1

                    queue.push({
                        tautan: vid["url"],
                        judul: vid["title"],
                        durasi: vid["timestamp"],
                        ikon: vid["thumbnail"]
                    })
                    
                    const lagu = queue[0];
                    
                    const Embed = new emd.MessageEmbed()
                    .setThumbnail(lagu["ikon"])
                    .setDescription("Playing Music")
                    .setTitle(lagu["judul"])
                    .setAuthor("Added Music", message.author.displayAvatarURL())
                    .setURL(lagu["tautan"])
                    .addField("Duration", lagu["durasi"], true)
                    .addField("Position", pos, true)
                    .setColor(0x00FFFF)

                    message.channel.send(Embed)

                    music(message);

                } else {
                    

                    queue.push({
                        tautan: vid["url"],
                        judul: vid["title"],
                        durasi: vid["timestamp"],
                        ikon: vid["thumbnail"]
                    })

                    const lagu = queue[pos];
                    pos = pos + 1
                    
                    const Embed = new emd.MessageEmbed()
                    .setThumbnail(lagu["ikon"])
                    .setDescription("Playing Music")
                    .setTitle(lagu["judul"])
                    .setAuthor("Added Music to Queue", message.author.displayAvatarURL())
                    .setURL(lagu["tautan"])
                    .addField("Duration", lagu["durasi"], true)
                    .addField("Position", pos, true)
                    .setColor(0x00FFFF)

                    message.channel.send(Embed)
                }
            }
            
            if (message.member.voice.channel) {
                putar();

            } else {
                message.reply('Masuk dulu ke voice bangke >:(');
            }


            
        break;

        case 'sekip':
            
            if(!message.member.voice.channel){
                message.reply('Masuk dulu ke voice bangke >:(');
                return;
            }

            if(isplaying === "stopped"){
                message.reply("Puter dulu musik bangke >:(")
            }

            pos = pos - 1
            if(pos === 0){
                message.member.voice.channel.leave();
                isplaying = "stopped"
                queue.shift();
                pos = 0
            } else {
                queue.shift();
                music(message);
            }
        
        break;

        case 'soundboard':
            message.delete()
            if(args[1] === 'info'){
                message.channel.send("List: \n\ntodbarbaryu\ntodbasrenganj\ntodbijigue\ntodbodoamat\ntodngetehasu")
            }
        break;

        case 'paeh':

            if(isplaying === "stopped"){
                message.reply("Puter dulu musik bangke >:(")
            }
        
            message.delete()
            for (var i = queue.length; i > 0; i--) {
                queue.pop();
            }
            pos = 0
            message.member.voice.channel.leave();
            isplaying = "stopped"
            message.channel.send("Kaburrrr")
        break;

        case 'commandlist':
            message.delete()
            const Embed = new emd.MessageEmbed()
            .setTitle("Command List")
            .addField("todimage + image name", "Search any image on google", true)
            .addField("toddoge", "Bacot", true)
            .addField("todpaeh", "Leave Voice Channel", true)
            .addField("todsoundboardinfo", "List of soundboard that available", true)
            .addField("todcommandlist", "Show help", true)
            .setColor(0x00FFFF)
            message.channel.send(Embed);
        break;
    }
}); 

async function music(message){
    const lagu = queue[0]
    isplaying = "playing"
    
    const connect = await message.member.voice.channel.join();
    const dispatcher = connect.play(ytdl(lagu["tautan"], {filter: 'audioonly'}));

    dispatcher.on('finish', () => {
        if(!queue[1]){
            queue.shift();
            console.log('Beres');
            connect.disconnect();
            isplaying = "stopped"
        } else {
            queue.shift();
            pos = pos - 1
            music();
        }
    });
}

function image(message, keyword){
 
    image_search(keyword, logResults)
    
    function logResults(error, results) {
        if (error) {
          console.log(error);
        }
        else {
          message.channel.send(results[Math.floor(Math.random() * results.length)].url);
        }
        results=[]
    }
}

async function ig_scrape(message, keyword){
    try{
        imageig = await ig(keyword);
        message.channel.send(imageig[Math.floor(Math.random() * imageig.length)].media);
        imageig=[];
    } catch(error){
        message.channel.send("IG nya di private/salah username cuy. Gagal ngestalk deh hiya hiya :v");
    }
}

bot.login(token);
