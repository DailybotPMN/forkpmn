/*------------------------------------faire fonctionner le back node.js avec le front reactJS------------------------------------*/
const express = require('express'); //import d'express
const path = require('path');
require('dotenv').config();
// var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const app = express(); //on créé app pour démarrer express

app.use(express.json()); // on indique à express d'utiliser les fichiers json
app.use(express.static('frontend/build')); // on indique que l'on va utiliser des fichiers static

//Pour sécuriser les échanges
// app.use(cookieParser()); //on parse les cookies
// app.use(express.urlencoded({extended: false}));

// pour faire l'API; on indique que quand on appel /api/discord, il va me répondre un objet en json et le message Hello
// app.get('/api/discord', (req, res) => {
//     res.send({
//         message: 'Coucou Disco'
//     })
// })

//pas necessaire pour slack car le bouton fournit fait le boulot
// app.get('https://www.slackdailypmn.com', (req, res) => {
//     res.send({
//         message: 'Coucou Slacki'
//     })
//     console.log(res)
// })

// pour faire en sorte que toutes les adresses etc en dehors des APIs au dessus renvoient sur index.js de react
app.get('/*', (req, res) => {
    //pour etre sûre que l'adresse relative est toujours bonne en utilisant path fournit par node avec join qui permet de joindre plusieurs adresses, on lui dit "depuis __dirname (qui est dynamique et permet de cibler automatiquement) tu envoies tout sur l'ondex html du build de react"
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
    // Cookies that have not been signed
//     console.log('Cookies: ', req.cookies)
//    // Cookies that have been signed
//     console.log('Signed Cookies: ', req.signedCookies)
})

app.listen(PORT, () => {
    console.log(`serveur lancé sur: http://localhost:${PORT}`)
})
/*------------------------------------BOT DISCORD ------------------------------------*/

/* ATTENTION: NE PAS ETRE CONNECTE AVEC UN VPN POUR POUVOIR LANCER */
// const Discord = require('discord.js')
// const bot = new Discord.Client({intents: []})
// require('dotenv').config();

// bot.login(process.env.DISCORD_BOT_TOKEN)

// console.log('bot opé')

// bot.on('ready', function() {
//     console.log("le bot fonctionne")
//     bot.user.setAvatar('./frontend/public/icon.png')
//         .then(() => console.log('avatar en place'))
//         .catch(console.error)
//     bot.user.setStatus('online')
// })

// // bot.on('message', (msg) => {
// //     if (msg.content === 'Hello') {
// //         msg.channel.send('Bonjour jeune Padawan')
// //     }
// // })

const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const config = require('./config.json');
require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql');
bot.commands = new Collection();
const privateMessage = require('./private-message.js')

// Connexion DB
const db = new mysql.createConnection({
    host: config.BDD.host,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database,
    port: config.BDD.port
});

db.connect(function (err) {
    if(err) throw err;

    console.log(`Connection à la database ${config.BDD.database} réussi !`)
})

// Command Handler
const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)

    console.log(`La commandes ${file} est chargée avec succès !`)
    bot.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        console.log(`La commandes ${file} est chargée avec succès depuis ${folder} !`)
        bot.commands.set(props.help.name, props)
    }
})


// Event Handler
const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot))
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot))
    }
}

bot.on('ready', () => {
    console.log('The client is ready!')
  
    privateMessage(bot, 'ping', 'Pong!')
  
    bot.users.fetch('232187820272386048').then((user) => {
      user.send('Hello World!')
    })
  })

  bot.on('messageCreate', msg => {
    if(msg.content === "Hi") {
        msg.channel.send('Hello')
    }
})

bot.login(process.env.DISCORD_BOT_TOKEN)



/*------------------------------------BOT SLACK------------------------------------*/

//une fois l'application montée, le bot est connecté et communique avec le serveur
// const {App} = require('@slack/bolt');
// const { WebClient, LogLevel } = require('@slack/web-api');
// const { FileInstallationStore } = require('@slack/oauth');

// require('dotenv').config();

// const botSlack = new App ({
//     token : process.env.SLACK_ACCESS_TOKEN,
//     signingSecret: process.env.SLACK_SIGNING_SECRET,
//     socketMode : true, //initialisation du socket mode pour recevoir
//     appToken : process.env.SOCKET_TOKEN,
// });

// const web = new WebClient(process.env.SLACK_BOT_TOKEN,{ logLevel: LogLevel.DEBUG});
// const channelId = process.env.SLACK_CHANNEL;

// async function publishMessage() {  

//     console.log("test1")

/*------------------------
        Ne fonctionne pas:
    if (botSlack.message === 'hello') {
        sendMessage (channelId, 'Comment puis-je t\'aider ?')
    }
-------------------------*/

    // try {

/*------------------------
        Ne fonctionne pas:

        const result = await botSlack.message === 'hello'({
            text : `Comment puis-je t'aider ?`
        });
        
        console.log(result)
-------------------------*/

//         console.log("test2")
//         //fonctionne:
//         const result2 = await web.chat.postMessage({
//             channel : channelId,
//             text : `Hello`
//         });

//         console.log(result2)

//         console.log("test3")
//     }
//     catch (error) {
//         console.error(error);
//     }
// }
// publishMessage(channelId, "");

/*------------------------
Ne fonctionne pas:

//on paramètre le bot pour qu'il écoute un message posté sur le channel et pour qu'il reponde via say()
botSlack.message('hello', async ({ message, say }) => {
    //si on reçoit hello alors say dit:
    await web.chat.postMessage(`Bonjour <@${message.user}>, nouveau Padawan tu es maintenant`)
});
------------------------*/


/*------------------------
Ne fonctionne pas:

//on paramètre la rep du bot quand il est mentionné
// botSlack.event('app_mention', async ({event, web}) => {
//     try {
//         //on appelle la methode chat.postMessage pr param rep dans channel
//         await web.chat.postMessage({
//             channel: event.channel,
//             text: `Que puis-je faire pour toi <@${event.user} ?`
//         });
//     }
//     catch (error) {
//         console.log(error);
//     }
// });

------------------------*/


//on lance le bot avec la methode start sur le port 3000 ou 5000 et on prevoit d'afficher le details de l'erreur dans le console
// (async () => {
//     await botSlack.start(process.env.PORT || 3000)
//     .catch(console.error)
//     //si tout fonctionne bien:
//     console.log("Slacki ok")
//     // sendMessage(process.env.SLACK_CHANNEL, 'Bonjour !')
// })();

//on crée la fonction permettant d'envoyer un message lorsque le bot se connecte (est lancé)
// async function sendMessage (channel, message) {
//     await web.chat.postMessage({
//         channel: channel,
//         text: message,
//     })
// }