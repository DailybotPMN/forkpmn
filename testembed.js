// const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
// const bot = require("indexServer.js")

// module.exports = {
//   name: "testembed",
//   description: "Test embed",
//   run: async (bot, message, args) => {
//     const embed = new MessageEmbed()
//       .setTitle("Test Embed")
//       .setDescription("This is a test embed")
//       .setColor("BLACK")
//       .setFooter({ text: `Test Embed` })

//       const row = new MessageActionRow().addComponents(
//         new MessageButton()
//         .setLabel("Button 1")
//         .setStyle("SUCCESS") //green button
//         .setCustomId("button1"), //this is very much required!

//         new MessageButton()
//         .setLabel("Button 2")
//         .setStyle("DANGER") //red button
//         .setCustomId("button2") //this is very much required!
//       )

//       return message.channel.send({ embeds: [embed], components: [row] })
//   },
// };


// bot.on("interactionCreate", async(interaction) => {
//   if(interaction.customId == "button1") {
//     interaction.reply("You clicked the button 1!")
//   } else if(interaction.customId == "button2") {
//     interaction.reply("You clicked the button 2!")
//   }
// })