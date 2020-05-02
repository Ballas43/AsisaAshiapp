const {Client, MessageAttachment} = require("discord.js");
const emd = require('discord.js');
const bot = new Client();
const cheerio =  require("cheerio")
const yts = require( 'yt-search' )
const request = require("request")
const ytdl = require("ytdl-core")
const prefix = "tod";


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

                    music();

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

                async function music(){
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
                async function music(){
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
    
                queue.shift();
                music();
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




function image(message, keyword){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + keyword,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
    
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}

bot.login(process.env.TOKEN);
