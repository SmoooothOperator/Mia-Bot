const ismoji = [
  "YouareBanished",
  "emoji_89",
  "emoji_87",
  "RUserious",
  "wtf",
  "Stfu",
  "what",
];
const replyTargets = ["714212640767082537"];

const chance = 1;

let randomNumber;

module.exports = async (client, message) => {
  randomNumber = Math.floor(Math.random() * chance) + 1;
  //if target includes the message sender id
  if (replyTargets.includes(message.author.id) && randomNumber === 1) {
    console.log(message.content);
    try {
      //get all emojis that matches the name in randmoji
      const emojis = client.emojis.cache.filter((emoji) =>
        ismoji.includes(emoji.name)
      );
      //if the emojis array is not null or empty
      if (emojis) {
        //for every element of emojis
        for (const emoji of emojis) {
          //   console.log(emoji.toString());
          //react with the string representation of the emoji object(required by discord)
          await message.react(emoji.toString());
        }
      } else {
        console.log("No emojis found");
      }
    } catch (error) {
      console.error("Error reacting with emoji:", error);
    }

    if (message.content.ToLowerCase().includes("fiesta")) {
      message.reply(`fiesta?`);
    } else {
      message.reply(`Bobaliyaftrt`);
    }
  }
};
