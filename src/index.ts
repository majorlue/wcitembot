import {config} from './config';
import {onInteraction, onReady} from './events';
import {client} from './handlers';

// extracting required config vars
const {BOT_TOKEN} = config;

const start = async () => {
  // run startup scripts
  client.on('ready', async () => await onReady(client));

  // handle user interactions (eg. commands)
  client.on(
    'interactionCreate',
    async interaction => await onInteraction(interaction)
  );

  await client.login(BOT_TOKEN);
};

start();
