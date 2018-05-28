const semver = require("semver");
const boxt = require("boxt");
const fork = require("../fork");
require("colors");

/**
 * Keep the event loop alive for another second until we"ve been there
 * @type {Number}
 */
const EVENT_LOOP = 1000;

/**
 * This operation was already performed
 * @type {Boolean}
 */
let beenthere = false;

/**
 * @typedef  {Info}           Information about the package
 * @type     {Object}
 * @property {String} latest  Package"s latest version
 * @property {String} message Suffix message for the upgrade prompt
 * @property {String} name    Package name
 * @property {String} version Package"s current version
 */

/* eslint-disable max-len */
/**
 * Offer user to upgrade program if there"s a new version available
 * @param  {String}  options.name              Package name
 * @param  {String}  options.version           Current version
 * @param  {Boolean} [options.immediate=false] Should execute immediately (or upon signal termination)
 * @param  {String}  [options.message="I can fix that for you."] Suffix message
 * @return {Boolean} (async)                                     is there an update available
 */
/* eslint-enable max-len */
module.exports = async function init ({
    immediate = false,
    message = "I can fix that for you.",
    name,
    version,
} = {}) {
    if (!name || !version) {
        return false;
    }

    const latest = await fork("latest-version", {name});

    if (!semver.gt(latest, version)) {
        return false;
    }

    /**
     * Package info
     * @type {Info}
     */
    const info = {
        latest,
        message,
        name,
        version,
    };

    if (immediate) {
        await start(info);
    } else {
        later(info);
    }

    return true;
};

/**
 * Perform the checks paralelly, only inform user on signal interrupt
 * @param  {Info} info Information about the package
 * @return {undefined} no return value
 */
function later (info) {
    process.stdin.resume();
    process.on("SIGINT", start.bind(null, info));

    (function wait () {
        if (beenthere) {
            return;
        }

        setTimeout(wait, EVENT_LOOP);
    }());
}

/**
 * Start checking for upgrades
 * @param   {Info} info Information about the package
 * @returns {undefined} No return value
 */
async function start ({latest, message, name, version}) {
    if (beenthere) {
        return;
    }

    beenthere = true;

    console.log(
        box({
            latest,
            message,
            name,
            version,
        })
    );

    const Confirm = require("prompt-confirm");
    const confirmed = await new Confirm(
        `install ${name.yellow} version ${latest.yellow} globally?`
    ).run();

    if (!confirmed) {
        process.exit(); // eslint-disable-line no-process-exit
    }

    await require("../install-latest")(name);
    process.exit(); // eslint-disable-line no-process-exit
}

/**
 * A "boxed" message to user letting them know of our upgrade intentions
 * @param  {Info}   info Information about the package
 * @return {String}      Message to user
 */
function box ({latest, message, name, version}) {
    const lines = [
        `You are running ${name.yellow} version ${version.yellow}`,
        `The latest version is ${latest.green}`,
    ];

    if (message) {
        lines.push(message.bold.italic);
    }

    return boxt(
        lines.join("\n"),
        {
            "align": "left",
            "theme": "round",
        }
    );
}
