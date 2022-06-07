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
const config = require('./config.json');
require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql');

//on crée un nouveau client discord
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

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