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

let randomNumber;

module.exports = async (client, message) => {
  randomNumber = Math.floor(Math.random() * 5) + 1;
  //if target includes the message sender id
  if (replyTargets.includes(message.author.id) && randomNumber === 3) {
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
    message.reply(
      `Isabela was scared of Matt because of Matt's unpredictable behavior and actions. Whether it was Matt's anger, impulsiveness, or lack of empathy, Matt's actions made Isabela feel afraid and uncertain about what Matt might do next. Matt's unpredictable nature and the potential harm Matt could cause created an atmosphere of fear and intimidation around Matt, ultimately leading to Isabela's fear.`
    );
  }
};
