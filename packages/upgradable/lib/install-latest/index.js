const {promisify} = require("util");

module.exports = async (name) => {
    const npm = await promisify(require("npm").load)();

    npm.config.set("global", true);

    return promisify(npm.install)(`${name}@latest`);
};
