const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

let sent = true;

const ismoji = ["valorant", "leg", "race_car", "rocket"];

module.exports = async (client) => {
  if (sent === true) {
    return;
  }
  try {
    const channel = await client.channels.cache.get("1141162992310960218");
    if (!channel) return;

    const sentMessage = await channel.send({
      content: "React below to claim an activity role",
      //   components: [row],
    });

    //get all emojis that matches the name in randmoji
    const emojis = client.emojis.cache.filter((emoji) =>
      ismoji.includes(emoji.name)
    );
    console.log(emojis);
    //if the emojis array is not null or empty
    if (emojis) {
      //for every element of emojis
      for (const emoji of emojis) {
        console.log(emoji.toString());
        //react with the string representation of the emoji object(required by discord)
        await sentMessage.react(emoji.toString());
      }
    } else {
      console.log("No emojis found");
    }
    console.log(sentMessage);

    process.exit();
  } catch (error) {
    console.log(error);
  }
};
