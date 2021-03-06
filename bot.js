const { TOKEN } = require('./config/token.json');

const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION'] });

const userMessageHandler = require('./handlers/message-handler');
const userJoin = require('./activites/userJoin');
const { logger } = require('./utilities/logger');

const sequelize = require('./database/sequelize');
const defineDatabaseConnections = require('./database/connection');

client.once('ready', async () => {
    logger.info(`Bot started`);
    sequelize.databaseConnect();
    await defineDatabaseConnections();
});

client.on('guildMemberAdd', async (member) => {
    try {
        userJoin(member);
    } catch (err) {
        logger.error(err);
    }
});

client.on('message', async (userMessage) => {
    try {
        userMessageHandler(userMessage);
    } catch (err) {
        logger.error(err);
    }
});

client.login(TOKEN);