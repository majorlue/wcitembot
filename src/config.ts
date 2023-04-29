require('newrelic');

import {version} from '../package.json';
const isProd = process.env.NODE_ENV === 'production';
// TODO: explain each config setting and section in more detail
const envVars: Record<string, string | number | undefined> = {
  // Bot Config
  BOT_TOKEN: process.env.BOT_TOKEN,
  ITEM_API_TOKEN: process.env.ITEM_API_TOKEN,
  PRESENCE_TIMER: process.env.PRESENCE_TIMER || 3,

  // Bot Commands
  EMBED_COLOUR: process.env.EMBED_COLOUR || 'DarkPurple',
  FOOTER_MESSAGE: `Wynncraft Item Team Tool`,

  // Project Info
  VERSION: version,
};

const config: Record<string, string> = {};
// assert all env vars as non-null and populate config with only strings
Object.keys(envVars).forEach(key => {
  const value = envVars[key];
  if (value === undefined)
    throw new Error(`${key} environment variable required!`);

  config[key] = value as string;
});

// export config var
export {config, isProd};
