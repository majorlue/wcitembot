import {CommandInteraction} from 'discord.js';
import {Command} from '../interfaces';

const commandList: Command[] = [];

const commandHash: Record<
  string,
  (interaction: CommandInteraction) => Promise<void>
> = {};
for (const command of commandList) commandHash[command.data.name] = command.run;

// cycle through non-admin commands as status
const presenceCmds = Object.keys(commandHash).map(x => `/${x}`);

// commands to offer monster autocomplete suggestions for
const monsterAutoCmds = ['encounter', 'set', 'submit'];

export {commandList, commandHash, presenceCmds, monsterAutoCmds};
