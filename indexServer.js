/*------------------------------------faire fonctionner le back node.js avec le front reactJS------------------------------------*/
const express = require('express'); //import d'express
const path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express(); //on créé app pour démarrer express

app.use(express.json()); // on indique à express d'utiliser les fichiers json
app.use(express.static('frontend/build')); // on indique que l'on va utiliser des fichiers static

//Pour sécuriser les échanges
app.use(cookieParser()); //on parse les cookies
app.use(express.urlencoded({extended: false}));

// pour faire l'API; on indique que quand on appel /api/discord, il va me répondre un objet en json et le message Hello
app.get('/api/discord', (req, res) => {
    res.send({
        message: 'Coucou Disco'
    })
})

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
    console.log('Cookies: ', req.cookies)
   // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
})

app.listen(PORT, () => {
    console.log(`serveur lancé sur: http://localhost:${PORT}`)
})
/*------------------------------------BOT DISCORD------------------------------------*/

/* ATTENTION: NE PAS ETRE CONNECTE AVEC UN VPN POUR POUVOIR LANCER */

// const Discord = require('discord.js')
// const bot = new Discord.Client({intents: []})
// require('dotenv').config();

// console.log('bot opé')

// bot.on('ready', function() {
//     console.log("le bot fonctionne")
//     bot.user.setAvatar('./frontend/public/icon.png')
//         .then(() => console.log('avatar en place'))
//         .catch(console.error)
//     bot.user.setStatus('online')
// })

// bot.on('message', (msg) => {
//     if (msg.content === 'Hello') {
//         msg.channel.send('Bonjour jeune Padawan')
//     }
// })

// bot.login(process.env.DISCORD_BOT_TOKEN)

/*------------------------------------BOT SLACK------------------------------------*/
//une fois l'application montée, le bot est connecté et communique avec le serveur
const {App} = require('@slack/bolt');
const { WebClient, LogLevel } = require('@slack/web-api');
// const { FileInstallationStore } = require('@slack/oauth');

require('dotenv').config();

const botSlack = new App ({
    token : process.env.SLACK_ACCESS_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode : true, //initialisation du socket mode pour recevoir
    appToken : process.env.SOCKET_TOKEN,
    // clientId : process.env.SLACK_CLEINT_ID,
    // clientSecret : process.env.SLACK_CLIENT_SECRET,
    // stateSecret : 'my-state-secret',
    // scopes : ['channels:read', 'chat:write', 'app_mentions:read', 'commands', 'channels:history'],
    // installationStore: new FileInstallationStore(),
});

const web = new WebClient(process.env.SLACK_BOT_TOKEN,{ logLevel: LogLevel.DEBUG});
const channelId = process.env.SLACK_CHANNEL;





async function publishMessage() {  
    console.log("test1")
    if (botSlack.message === 'hello') {
        sendMessage (channelId, 'Comment puis-je t\'aider ?')
    }

    try {
        // const result = await botSlack.message === 'hello'({
        //     text : `Comment puis-je t'aider ?`
        // });
        // console.log(result)

        console.log("test2")
        const result2 = await web.chat.postMessage({
            channel : channelId,
            text : `Bonjour , nouveau Padawan tu es maintenant`
        });
        console.log(result2)
        console.log("test3")
    }
    catch (error) {
        console.error(error);
      }

    }

publishMessage(channelId, "");


//on paramètre le bot pour qu'il écoute un message posté sur le channel et pour qu'il reponde via say()
botSlack.message('hello', async ({ message, say }) => {
    /*si on resout hello alors say dit: */
    await web.chat.postMessage(`Bonjour <@${message.user}>, nouveau Padawan tu es maintenant`)
  });

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

//on lance le bot avec la methode start sur le port 3000 ou 5000 et on prevoit d'afficher le details de l'erreur dans le console
(async () => {
    await botSlack.start(process.env.PORT || 3000)
    .catch(console.error)
    //si tout fonctionne bien:
    console.log("Slacki ok")
    /*sendMessage(process.env.SLACK_CHANNEL, 'Bonjour !')*/
})();

//on crée la fonction permettant d'envoyer un message lorsque le bot se connecte (est lancé)
async function sendMessage (channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}

