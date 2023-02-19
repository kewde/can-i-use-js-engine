const fs = require('fs');
const { spawn } = require("child_process");

const { writeToTempFile, deleteFile } = require("./tempfile")

const executeJavaScript = async (codeToExecute, sendLogs) => {
    const setupJS = getSetupJavaScriptGlobal()
    const filePath = await writeToTempFile(`${setupJS};${codeToExecute}`)
    const executor = new Promise((resolve, reject) => {
        const jsc = spawn("./jsc", [filePath], { cwd: __dirname });
        jsc.stdout.on("data", sendLogs);
        jsc.stderr.on("data", sendLogs);
        jsc.on('error', sendLogs);
        jsc.on("close", code => {
            resolve();
            sendLogs(`child process exited with code ${code}`);
        });
    })
    executor.finally(() => deleteFile(filePath))
    return executor;
}

const getSetupJavaScriptGlobal = () => {
    const data = fs.readFileSync('./src/jsc/setupJavaScriptGlobal.js', 'utf8');
    return data
}

module.exports = { executeJavaScript }