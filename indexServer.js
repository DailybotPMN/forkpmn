const express = require('express'); //import d'express
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express(); //on créé app pour démarrer express

app.use(express.json()); // on indique à express d'utiliser les fichiers json

app.use(express.static('frontend/build')); // on indique que l'on va utiliser des fichiers static

app.get('/api/discord', (req, res) => {
    res.send({
        message: 'Coucou Disco'
    })
})// pour faire l'API; on indique que quand on appel /api, il va me répondre un objet en json et le message Hello
app.get('/api/slack', (req, res) => {
    res.send({
        message: 'Coucou Slacki'
    })
})

// pour faire en sorte que toutes les adresses etc en dehors des API au dessus sur index.js de react
app.get('/*', (req, res) => {
    //pour etre sûre que l'adresse relative est toujours bonne en utilisant path fournit par node avec join qui permet de joindre plusieurs adresses, on lui dit "depuis __dirname (qui est dynamique et permet de cibler automatiquement) tu envoies tout sur l'ondex html du build de react"
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`serveur lancé sur: http://localhost:${PORT}`)
})
/*------------------------BOT DISCORD------------------------------------*/

/* ATTENTION: NE PAS ETRE CONNECTE AVEC UN VPN POUR POUVOIR LANCER */

const Discord = require('discord.js')
const bot = new Discord.Client({intents: []})
require('dotenv').config();

console.log('bot opé')

bot.on('ready', function() {
    console.log("le bot fonctionne")
    bot.user.setAvatar('./frontend/public/icon.png')
        .then(() => console.log('avatar en place'))
        .catch(console.error)
    bot.user.setStatus('online')
})

bot.on('message', (msg) => {
    if (msg.content === 'Hello') {
        msg.channel.send('Bonjour jeune Padawan')
    }
})

bot.login(process.env.DISCORD_BOT_TOKEN)

/*------------------------BOT SLACK------------------------------------*/
const {App} = require('@slack/bolt');
require('dotenv').config();

const botSlack = new App ({
    token : process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode : true, //initialisation du socket mode pour recevoir
    appToken : process.env.SOCKET_TOKEN
});

//on paramètre le bot pour qu'il écoute un message posté sur le channel et pour qu'il reponde via say()
botSlack.message('hello', async ({ message, say }) => {
    await say(`Bonjour <@${message.user}>, nouveau Padawan tu es maintenant`);
  });

  (async () => {
    await botSlack.start(process.env.PORT || 3000);
    console.log("Slacki ok")
})();