const vm = require('vm');

const executeJavaScript = async (codeToExecute, sendLogs) => {
    try {
        const logs = vm.runInNewContext(codeToExecute, {
            console: {
                log: sendLogs,
                error: sendLogs,
            }
        })
        sendLogs(logs)
    } catch (e) {
        sendLogs(e.toString())
    }
}

module.exports = { executeJavaScript }