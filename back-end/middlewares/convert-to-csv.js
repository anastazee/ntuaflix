const { parse } = require('json2csv');

function convertToCSV(data) {
    try {
        const fields = getFields(data[0]);
        // Wrap the single object in an array before passing it to parse
        const csv = parse(data, { fields });
        return csv;
    } catch (error) {
        console.error('Error converting to CSV:', error);
        throw error;
    }
}

function getFields(data) {
    const fields = new Set();

    function extractFields(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                fields.add(key);
            }
        }
    }

    extractFields(data);
    return Array.from(fields);
}

module.exports = { convertToCSV };
