import {ColorResolvable, CommandInteraction, EmbedBuilder} from 'discord.js';
import {client} from '.';
import {config} from '../config';

const {FOOTER_MESSAGE, EMBED_COLOUR} = config;

export function commandErrorEmbed(interaction: CommandInteraction) {
  return {
    embeds: [
      new EmbedBuilder()
        .setAuthor({
          name: client.user?.tag || '',
          iconURL: client.user?.avatarURL() || undefined,
        })
        .setTitle(`Something Went Wrong )=`)
        .setDescription(
          `There was an issue trying to execute \`/${interaction.commandName}\`! ` +
            `The issue has been logged and will be looked into. Feel free to try again shortly. ` +
            `If the problem persists, please report the issue.`
        )
        .setFooter({text: FOOTER_MESSAGE})
        .setColor(EMBED_COLOUR as ColorResolvable)
        .setTimestamp(),
    ],
  };
}
