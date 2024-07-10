const verifyChannelID = "902108236713426975";
const boardChannelID = "1248444141122224190";
module.exports = async (client, message) => {
  // Phone number format
  let format = /\d{3}-\d{4}/;
  // Make the message lowercase
  let message_lower = message.content.toLowerCase();
  // Get channel ID
  const channelID = message.channel.id;
  let spam = false;
  if (
    (message_lower.includes("olivia") || message_lower.includes("rodrigo")) &&
    message_lower.includes("ticket") &&
    format.test(message_lower)
  ) {
    spam = true;
  } else if (
    message_lower.includes("ticket") &&
    message_lower.includes("interest") &&
    format.test(message_lower)
  ) {
    spam = true;
  }
  if (spam == true && channelID == verifyChannelID) {
    const member = message.member;
    if (member) {
      try {
        await member.ban({
          reason: "Unauthorized Promotions",
        });
        //Get board channel
        const boardChannel = client.channels.cache.get(boardChannelID);
        //sentMessageID
        let sentMessageID;
        //Send message to boardChannel informing board of manual verification request
        boardChannel.send(
          `I have Banned User ${member} after detecting spam, please verify! \n\n**Message that cause the ban:** ${message.content}`
        );
        message.reply(
          `User ${member} has been banished due to spam/unauthorized promotion!`
        );
      } catch (err) {
        message.reply("I was unable to ban the member");
        console.error(err);
      }
    }
  }
};
