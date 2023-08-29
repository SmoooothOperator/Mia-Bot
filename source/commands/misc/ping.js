module.exports = {
  name: "ping",
  description: "ping",
  devOnly: true,
  //testOnly; Boolean,
  //options:

  callback: (client, interaction) => {
    interaction.reply(`${client.ws.ping}ms`);
  },
};
