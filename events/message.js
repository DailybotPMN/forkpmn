const mysql = require('mysql');
const config = require('../config.json')

// Connexion DB
const db = new mysql.createConnection({
    host: config.BDD.host,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database,
    port: config.BDD.port
});

module.exports= {
    name: 'messageCreate',
    execute(message) {
        db.query(`INSERT INTO message (guildId, userId, message, username) VALUES ("${message.guild.id}", "${message.author.id}", "${message.content}", "${message.author.username}")`)
    }
}