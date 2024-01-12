const fs = require('fs');

const writeLogToFile = (logFilePath, logMessage) => {
    fs.appendFile(logFilePath, logMessage + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
};

module.exports = { writeLogToFile };
