/*------------------------------------faire fonctionner le back node.js avec le front reactJS------------------------------------*/

const express = require('express'); //import d'express
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express(); //on créé app pour démarrer express

app.use(express.json()); // on indique à express d'utiliser les fichiers json
app.use(express.static('frontend/build')); // on indique que l'on va utiliser des fichiers static

// pour faire en sorte que toutes les adresses etc en dehors des APIs au dessus renvoient sur index.js de react
app.get('/*', (req, res) => {
    //pour etre sûre que l'adresse relative est toujours bonne en utilisant path fournit par node avec join qui permet de joindre plusieurs adresses, on lui dit "depuis __dirname (qui est dynamique et permet de cibler automatiquement) tu envoies tout sur l'ondex html du build de react"
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`serveur lancé sur: http://localhost:${PORT}`)
})
/*------------------------------------BOT DISCORD ------------------------------------*/

const { Client, Intents, Collection } = require('discord.js');
const config = require('./backend/config.json');
require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql');

//on crée un nouveau client discord
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

bot.commands = new Collection();

// const privateMessage = require('./private-message.js')


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
const commandFiles = fs.readdirSync('./backend/commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./backend/commands/${file}`)
    console.log(`La commandes ${file} est chargée avec succès !`)
    bot.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./backend/commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./backend/commands/${folder}/`).filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const props = require(`./backend/commands/${folder}/${file}`)
        console.log(`La commandes ${file} est chargée avec succès depuis ${folder} !`)
        bot.commands.set(props.help.name, props)
    }
})


// Event Handler
const eventFiles = fs.readdirSync('./backend/events/').filter(f => f.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(`./backend/events/${file}`)
    if(event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot))
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot))
    }
}

bot.on('ready', () => {
    console.log('The client is ready!')
    // privateMessage(bot, 'ping', 'Pong!')
    // bot.users.fetch('232187820272386048').then((user) => {
    //     user.send('Hello World!')
    // })
})

//on importe la librairie
const cron = require('cron');

bot.on("ready", () => {
    console.log(`Online as ${bot.user.tag}`);

    const PrivateChannel = bot.users.fetch('828905808674291712');//mon id utilisateur
    const managerChannel = bot.channels.fetch('984126132997746720'); //id serveur manager

    // On le paramètre pour qu'il l'envoie tous les matins du lundi au vendredi à 09:30:00
    let scheduledMessage = new cron.CronJob('00 24 18 * * 1-5', () => {
        console.log("evenement ok")

        //envoie à l'utilisateur un message:
        PrivateChannel.then((user) => {
            user.send('Hello ! n\'oublie pas d\'aller sur le channel de ta team et de lancer start pour lancer ton daily meeting') 
        })
    });
    scheduledMessage.start()

    bot.on('message', msg => {
        

        if (msg.content === 'start') {
            msg.channel.send('Bonjour ! Es-tu prêt pour le point quotidien ? \n Réponse attendue : \n Oui    Non');
        }

        else if (msg.content === 'non') {
            msg.channel.send('Très bien, à bientôt alors !');
        }

        else if (msg.content === 'oui') {
            msg.channel.send('C\'est parti ! \n \n Peux-tu m\'indiquer ton avancée d\'hier, ton planning pour aujourd\'hui et tes éventuelles difficultés ?\n \n (Merci de commmencer votre reponse par le mot : hier)');
        }

        else if (msg.content.startsWith('hier')) {

            var reponse3 = msg.content;
            msg.channel.send('Un grand merci pour ces informations !\n A demain pour le prochain point !')
            // console.log(reponse3)

            managerChannel.then((user) => {

                user.send('Hello ! Voici ce que ' + user + ' à repondu pour aujourd\'hui :\n ' + reponse3); 
            });
        };
    });
});

bot.login(process.env.DISCORD_BOT_TOKEN)

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
});

const web = new WebClient(process.env.SLACK_BOT_TOKEN,{ logLevel: LogLevel.DEBUG});
const channelId = process.env.SLACK_CHANNEL;


//on lance le bot avec la methode start sur le port 3000 ou 5000 et on prevoit d'afficher le details de l'erreur dans le console
(async () => {
    await botSlack.start(process.env.PORT || 3000)
    .catch(console.error)
    //si tout fonctionne bien:
    console.log("Slacki ok")
    /*sendMessage(process.env.SLACK_CHANNEL, 'Bonjour !')*/
})();


/*
async function publishMessage() {  
    console.log("test1")
    if (botSlack.message === 'hello') {
        sendMessage (channelId, 'Comment puis-je t\'aider ?')
    }
    try {
        console.log("test2")
        const result2 = await web.chat.postMessage({
            channel : channelId,
            text : `Bonjour jeune Padawan`
        });
        // console.log(result2)
        console.log("test3")
    }
    catch (error) {
        console.error(error);
    }
}

publishMessage(channelId, "");
*/


//on crée la fonction permettant d'envoyer un message lorsque le bot se connecte (est lancé)
async function sendMessage (channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}