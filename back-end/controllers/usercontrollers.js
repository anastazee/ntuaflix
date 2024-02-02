const mysql = require('mysql2');
const { convertToCSV } = require('../middlewares/convert-to-csv');
const {
    getConnectionAsync,
    getTitleObject,
    getNameObject,
    getSearchTitleObjects,
    getSearchNameObjects,
    getByGenreObjects,
} = require('../middlewares/connections-queries');

exports.getTitleRoute = async (req, res) => {
    const titleID = req.params.titleID;
    const format = req.query.format || null;
    if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
        res.status(400).json({ status: 'Bad Request', message: 'format values can be csv or json' })
    }
    try {      
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const titleObject = await getTitleObject(connection, titleID);
                if (!format || format.toLowerCase() === 'json') {
                    res.status(200).json({ status: 'OK', data: titleObject });
                }
                else if (format.toLowerCase() === 'csv') {
                    const csvData = convertToCSV([titleObject]);
                    res.setHeader('Content-Type', 'text/csv');
                    res.status(200).send(csvData);
                }

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', data: `Title with ID ${titleID} not found` });
            }
        } else {
            res.status(500).json({ status: 'Failed', data: 'Faulty connection' });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', data: 'Error connecting to the database' });
    }
};

exports.getNameRoute = async (req, res) => {
    const nameID = req.params.nameID;
    const format = req.query.format || null;
    
    if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
        res.status(400).json({ status: 'Bad Request', message: 'format values can be csv or json' })
    }
    try {      
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const nameObject = await getNameObject(connection, nameID);
                if (!format || format.toLowerCase() === 'json') {
                    res.status(200).json({ status: 'OK', data: nameObject });
                }
                else if (format.toLowerCase() === 'csv') {
                    const csvData = convertToCSV([nameObject]);
                    res.setHeader('Content-Type', 'text/csv');
                    res.status(200).send(csvData);
                }

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Contributor with nameID ${nameID} not found` });
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection' });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database' });
    }
};

exports.getSearchTitle = async (req, res) => {
    try {
        let tqueryObject = req.body;
        if (!tqueryObject || !tqueryObject.titlePart) {
            res.status(400).json({ status: 'Bad Request', message: 'Invalid or missing titlePart in the request body' });
            return;
        }
        const titlepart = tqueryObject.titlePart;
        const format = req.query.format || null;
        if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
            res.status(400).json({ status: 'Bad Request', message: 'format values can be csv or json' })
        }
        try {
            const connection = await getConnectionAsync();

            if (connection) {
                try {
                    const titleObjects = await getSearchTitleObjects(connection, titlepart);
                    if (titleObjects.length == 0) {
                        res.status(204).send();
                        return;
                    }
                    if (!format || format.toLowerCase() === 'json') {
                        res.status(200).json({ status: 'Success', data: titleObjects });
                    } else if (format.toLowerCase() === 'csv') {
                        const csvData = convertToCSV(titleObjects);
                        res.setHeader('Content-Type', 'text/csv');
                        res.status(200).send(csvData);
                    }
                } catch (error) {
                    console.error('Error in getSearchTitleObjects:', error);
                    res.status(500).json({ status: 'Internal Server Error', message: 'Error getting matchng TitleObjects' });
                } finally {
                    connection.release();
                }
            }
            else {
                res.status(500).json({ status: 'Internal Server Error', message: 'Unable to establish database connection' });
            }
        }
        catch (error) {
            console.error('Error getting database connection:', error);
            res.status(500).json({ status: 'Internal Server Error', message: 'Error getting database connection' });
        }
    }
    catch (error) {
        console.error('Error parsing request body:', error);
        res.status(400).json({ status: 'Error', message: 'Invalid request body' });
    }
};

exports.getSearchName = async (req, res) => {
    try {
        let nqueryObject = req.body;
        if (!nqueryObject || !nqueryObject.namePart) {
            res.status(400).json({ status: 'Bad Request', message: 'Invalid or missing namePart in the request body' });
            return;
        }
        const namepart = nqueryObject.namePart;
        const format = req.query.format || null;
        if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
            res.status(400).json({ status: 'Bad Request', message: 'format values can be csv or json' })
        }
        try {
            const connection = await getConnectionAsync();

            if (connection) {
                try {
                    const nameObjects = await getSearchNameObjects(connection, namepart);
                    if (nameObjects.length == 0) {
                        res.status(204).send();
                        return;
                    }
                    if (!format || format.toLowerCase() === 'json') {
                        res.status(200).json({ status: 'Success', data: nameObjects });
                    } else if (format.toLowerCase() === 'csv') {
                        const csvData = convertToCSV(nameObjects);
                        res.setHeader('Content-Type', 'text/csv');
                        res.status(200).send(csvData);
                    }
                } catch (error) {
                    console.error('Error in getSearchNameObjects:', error);
                    res.status(500).json({ status: 'Internal Server Error', message: 'Error getting matchng NameObjects' });
                } finally {
                    connection.release();
                }
            }
            else {
                res.status(500).json({ status: 'Internal Server Error', message: 'Unable to establish database connection' });
            }
        }
        catch (error) {
            console.error('Error getting database connection:', error);
            res.status(500).json({ status: 'Internal Server Error', message: 'Error getting database connection' });
        }
    }
    catch (error) {
        console.error('Error parsing request body:', error);
        res.status(400).json({ status: 'Error', message: 'Invalid request body' });
    }
};

exports.getByGenre = async (req, res) => {
    try {
        let gqueryObject = req.body;
        if (!gqueryObject || !gqueryObject.qgenre || !gqueryObject.minrating) {
            res.status(400).json({ status: 'Bad Request', message: 'Genre and minimum rating are required parameters' });
            return;
        }        
        const format = req.query.format || null;
        if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
            res.status(400).json({ status: 'Bad Request', message: 'format values can be csv or json' })
        }
        const qgenre = gqueryObject.qgenre;
        const minrating = gqueryObject.minrating;
        const yrFrom = gqueryObject.yrFrom;
        const yrTo = gqueryObject.yrTo;

        try {
            const connection = await getConnectionAsync();

            if (connection) {
                try {
                    const titleObjects = await getByGenreObjects(connection, qgenre, minrating, yrFrom, yrTo);
                    if (titleObjects.length == 0) {
                        res.status(204).send();
                        return;
                    }
                    if (!format || format.toLowerCase() === 'json') {
                        res.status(200).json({ status: 'Success', data: titleObjects });
                    } else if (format.toLowerCase() === 'csv') {
                        const csvData = convertToCSV(titleObjects);
                        res.setHeader('Content-Type', 'text/csv');
                        res.status(200).send(csvData);
                    }
                } catch (error) {
                    console.error('Error in getByGenreObjects:', error);
                    res.status(500).json({ status: 'Internal Server Error', message: 'Error getting matchng TitleObjects' });
                } finally {
                    connection.release();
                }
            }
            else {
                res.status(500).json({ status: 'Internal Server Error', message: 'Unable to establish database connection' });
            }
        }
        catch (error) {
            console.error('Error getting database connection:', error);
            res.status(500).json({ status: 'Internal Server Error', message: 'Error getting database connection' });
        }
    }
    catch (error) {
        console.error('Error parsing request body:', error);
        res.status(400).json({ status: 'Error', message: 'Invalid request body' });
    }
};
