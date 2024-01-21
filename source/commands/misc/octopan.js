const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

const replyTargets = ["613579814095290398"];

module.exports = {
  name: "octopan",
  description: "🐙🥞",
  //devOnly: Boolean,
  // testOnly: false,
  // miaOnly: false,
  options: [
    {
      name: "content",
      description: "enter your message here to translate",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "visable_to_others",
      description: "choose visability",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],

  callback: async (client, interaction) => {
    try {
      if (replyTargets.includes(interaction.user.id)) {
        interaction.reply({
          content: `Use Octopan Steve cannot. For worthy, Steve is not. 🐙🥞`,
          ephemeral: false,
        });
        return;
      }
      let octopan = "";
      const visability = interaction.options.getBoolean("visable_to_others");
      const message = interaction.options.getString("content");
      let toEng = false;
      let toPan = false;
      console.log(message.length);

      //Check translation direction
      if (message.includes("🐙") || message.includes("🥞")) {
        toEng = true;
      } else {
        toPan = true;
      }

      //To Octopan
      if (toPan) {
        //Loop through all chars in message
        for (let i = 0; i < message.length; i++) {
          //Convert to ASCII
          const asciiVal = message.charCodeAt(i);
          //Convert to binary in 8 bits
          let binary = asciiVal.toString(2).padStart(8, "0").trim();
          //Replace with octopan
          binary = binary.replace(/0/g, "🥞").replace(/1/g, "🐙");
          octopan += binary;
        }
      }
      //To English
      if (toEng) {
        let byte = "";
        let counter = 0;
        //Loop through all Octopan chars
        for (let j = 0; j < message.length; j += 1) {
          byte += message[j];
          counter++;
          console.log(counter);
          //Convert at every byte(length 8)
          if (counter % 16 == 0) {
            console.log(byte);
            //Octopan to Binary
            let binary = byte.replace(/🥞/g, "0").replace(/🐙/g, "1");
            //Binary to decimal
            const deci = parseInt(binary, 2);
            //Decimal to Character using ASCII
            const character = String.fromCharCode(deci);
            console.log(character);
            octopan += character;
            byte = "";
          }
        }
      }
      // interaction.reply("no");
      if (visability) {
        interaction.reply(
          `**Original:** ${message}\n**Translation:** ${octopan}`
        );
      } else {
        interaction.reply({ content: octopan, ephemeral: true });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
