const {fork} = require("child_process");
const path = require("path");

/**
 * Error code that triggers silent failure
 * @type {Number}
 */
const SILENT_EXIT_CODE = 0;

module.exports = (name, data) => {
    const file = path.join(__dirname, "../", name);
    const forked = fork(file, {"stdio": "ignore"});

    return new Promise((resolve, reject) => {
        forked
            .on("message", (response) => {
                resolve(response);
                forked.disconnect();
            })

            .on("error", (error) => {
                console.log("Error from child process");
                reject(new Error(error));
            })

            .on("exit", (code) => {
                if (code !== SILENT_EXIT_CODE) {
                    reject(new Error(`Child process exited with code ${code}`));
                }
            })

            .send(data);
    });
};
