const randmoji = ["RANDADDY", "ahhah"];
const replyTargets = ["389306806393896960"];

module.exports = async (client, message) => {
  //if target includes the message sender id
  if (
    replyTargets.includes(message.author.id) &&
    message.content.toLowerCase().includes("toyota")
  ) {
    console.log(message.content);
    try {
      //get all emojis that matches the name in randmoji
      const emojis = client.emojis.cache.filter((emoji) =>
        randmoji.includes(emoji.name)
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
  }
};
