import {Interaction} from 'discord.js';
import {commandErrorEmbed, logger} from '../handlers';
import {commandHash} from '../commands';

// define function for handling user interactions with the bot
const onInteraction = async (interaction: Interaction) => {
  // verify intertaction type here and run the approriate function
  if (interaction.isCommand()) {
    // wrap ALL commands for error handling -- gives user feedback if there's an issue
    try {
      // we do a little instrumentation
      const start = Date.now();
      // Discord requires acknowledgement within 3 seconds, so just defer reply for now
      await interaction.deferReply({
        ephemeral: false,
      });

      await commandHash[interaction.commandName](interaction);

      const time = `${Date.now() - start}ms`;
      logger.info(`Executed command /${interaction.commandName} in ${time}`, {
        time,
        command: interaction.commandName,
        type: 'command',
        user: interaction.user.tag,
      });
      return;
    } catch (err) {
      // typecasting for safety. we know it's a type of error
      const error = err as Error;
      // TODO: handle other error types explicitly. main ones are prisma and discordjs

      // edit interaction response to notify players error happened and log error
      await interaction.editReply(commandErrorEmbed(interaction));

      // log error with level 'error' and include additional context in log obj
      logger.error(error.message, {
        command: interaction.commandName,
        args: interaction.options.data,
        user: interaction.user.tag,
        guild: interaction.guildId,
        ...error,
      });
    }
  }
};

export {onInteraction};
