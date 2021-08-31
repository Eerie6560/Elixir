import * as Discord from "discord.js";
import ElixirHandler from "./ElixirHandler";
import config from "./resources/Config";
import DatabaseManager from "./managers/DatabaseManager";

const client = new Discord.Client({
    allowedMentions: {
        parse: ["users", "roles", "everyone"],
        repliedUser: false,
    },
    partials: ["CHANNEL", "MESSAGE", "REACTION"],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Discord.Intents.FLAGS.GUILD_MESSAGES,
        // Discord.Intents.FLAGS.GUILD_MEMBERS
    ],
});

export default client;

DatabaseManager.createAllTables();
ElixirHandler.initAllInteractions(client);
ElixirHandler.initAllEvents(client);
ElixirHandler.initAllMusicEvents(client);

client.login(config.token).then(() => {});