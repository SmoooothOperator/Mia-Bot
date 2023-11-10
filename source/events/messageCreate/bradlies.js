const bradmoji = ["pufferfish", "brad"];
const catMemes = [
  ":Zyessir:",
  ":sad:",
  ":nooo:",
  ":sadthumbsup:",
  ":Catting:",
  ":CatPray:",
  ":CA100RJI_popcatblankie:",
  ":ForYou:",
  ":CA100RJI_happycat:",
  ":CA100RJI_trollcatlaugh:",
  ":smugcat:",
  ":EatEatEat:",
  ":sadfistcat:",
  ":CA100RJI_2_Sadcatgun:",
  ":catnobanana:",
  ":CatDance:",
  ":CA100RJI_CatVibin:",
  ":balls:",
  ":NerdCat:",
  ":rat_jump:",
  ":rat_pat:",
  ":copdootbear:",
  ":pog_rat:",
  ":rat_rolled_newspaper:",
  ":rat_menacing:",
  ":CB_duck_kisses:",
  ":bonk:",
];
const bradmessage = ["cat", "rat"];
const replyTargets = ["307977164240846849", "551279669979119616"];
let bradCatCounter = 0;

module.exports = async (client, message) => {
  //Get the message the user sent
  console.log(message.content);

  messageContent = message.content.toString();
  //See if the message includes any stings in catMemes[]
  catDetected = catMemes.some((catMeme) => messageContent.includes(catMeme));
  //if target includes the message sender id
  if (replyTargets.includes(message.author.id) && catDetected === true) {
    console.log(message.content);
    bradCatCounter++;
    try {
      //get all emojis that matches the name in randmoji
      const emojis = client.emojis.cache.filter((emoji) =>
        bradmoji.includes(emoji.name)
      );
      //if the emojis array is not null or empty
      if (emojis) {
        //for every element of emojis
        for (const emoji of emojis) {
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
      `Bradley's Illegal Emoji detected, incrementing counter... Bradley now has ${bradCatCounter} warnings. Bradley will be timed out at 50 warnings.`
    );
  } else if (
    (replyTargets.includes(message.author.id) &&
      message.content.toLowerCase().includes("cat")) ||
    (replyTargets.includes(message.author.id) &&
      message.content.toLowerCase().includes("rat"))
  ) {
    message.reply(
      `Bradley's message related to cat or rat, incrementing counter... Bradley now has ${bradCatCounter} warnings. Bradley will be timed out at 50 warnings.`
    );
    bradCatCounter++;
  }
};
