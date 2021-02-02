const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.config();

const discord = require('discord.js');
const Client = discord.Client;
const client = new Client({ partials: [ 'MESSAGE', 'CHANNEL', 'REACTION', 'USER' ]});
const REACTION_NAME = process.env.REACTION_NAME;
const REACTION_COUNT = parseInt(process.env.REACTION_COUNT)
const debug = process.env.DEBUG.toLowerCase() == 'true';

client.once('ready', () => {
    console.log(chalk.green('Ready!'));
});

client.on('messageReactionAdd', async (reaction, _) => {
    debugLog(chalk.yellow(`Got a reaction.`))
    if (reaction.partial) {
        debugLog(chalk.yellow(`It was a partial. Loading...`));
        try {
            await reaction.fetch();
            debugLog(chalk.green("Partial loaded!"));
        }
        catch (error) {
            console.error("Failed to fetch full reaction.");
            console.error(error);
            return;
        }
    }
    debugLog(chalk.yellow(`Got reaction: ${reaction.emoji}`));
    const message = reaction.message;
    if (reaction.emoji.name != REACTION_NAME) {
        debugLog(chalk.red(`Reaction ${reaction.emoji.name} != ${REACTION_NAME}`));
        return;
    }
    if (reaction.count >= REACTION_COUNT) {
        console.log(chalk.gray(`Pinning message ${message.id}.`));

        await pinNewMessage(message);
    }
})


/**
 * @param {discord.Message} message The discord message to pin.
 */
let pinNewMessage = async function(message) {
    if (message.channel.type == "text") {
        debugLog(chalk.cyan(`Pinning message ${message.id}`));
        const pinned = await message.channel.messages.fetchPinned();
        if (pinned.size == 50) {
            const oldest = pinned.reduce((a, i) => i.createdTimestamp < a.createdTimestamp ? i : a, message);
            await oldest.unpin();
        }
        await message.pin();
    }
}

/**
 * @param {string} message The message to print if the debug flag is set.
 */
let debugLog = function(message) {
    if (debug) {
        console.log(message);
    }
}

const token = process.env.TOKEN;
client.login(token);
