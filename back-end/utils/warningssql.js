const getWarningInfo = async (connection) => {
    return new Promise((resolve, reject) => {
        connection.query('SHOW WARNINGS', (err, result) => {
            if (err) {
                reject(err);
            } else {
                // Log the complete result for debugging
                console.log('Complete SHOW WARNINGS result:', result);

                const warningInfo = result.map((warning) => `${warning.Level}: ${warning.Code} '${warning.Message}'`).join(', ');
                resolve(warningInfo);
            }
        });
    });
};

module.exports = { getWarningInfo };
