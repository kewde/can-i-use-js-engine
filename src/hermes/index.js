const fs = require('fs');
const { spawn } = require("child_process");

const { writeToTempFile, deleteFile } = require("./tempfile")

const executeJavaScript = async (codeToExecute, sendLogs) => {
    const setupJS = getSetupJavaScriptGlobal()
    const filePath = await writeToTempFile(`${setupJS};${codeToExecute}`)
    const executor = new Promise((resolve, reject) => {
        const hermes = spawn("./src/hermes/hermes", [filePath]);
        hermes.stdout.on("data", sendLogs);
        hermes.stderr.on("data", sendLogs);
        hermes.on('error', sendLogs);
        hermes.on("close", code => {
            resolve();
            sendLogs(`child process exited with code ${code}`);
        });
    })
    executor.finally(() => deleteFile(filePath))
    return executor;
}

const getSetupJavaScriptGlobal = () => {
    const data = fs.readFileSync('./src/hermes/setupJavaScriptGlobal.js', 'utf8');
    return data
}

module.exports = { executeJavaScript }