const mysql = require('mysql2');

const {
    getConnectionAsync,
    getTitleObject,
    getNameObject,
    getSearchTitleObjects,
    getSearchNameObjects,
} = require('../middlewares/connections-queries');

exports.getTitleRoute = async (req, res) => {
    const titleID = req.params.titleID;

    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const titleObject = await getTitleObject(connection, titleID);

                res.status(200).json({ status: 'OK', data: titleObject});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', data: `Title with ID ${titleID} not found`});
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

    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const nameObject = await getNameObject(connection, nameID);
                
                res.status(200).json({ status: 'OK', data: nameObject});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', data: `Contributor with nameID ${nameID} not found`});
            }
        } else {
            res.status(500).json({ status: 'Failed', data: 'Faulty connection' });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', data: 'Error connecting to the database' });
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

        try {
            const connection = await getConnectionAsync();

            if (connection) {
                try {
                    const titleObjects = await getSearchTitleObjects(connection, titlepart);
                    if (titleObjects.length == 0) {
                        res.status(204).send();
                        return;
                    }
                    res.status(200).json({ status: 'Success', data: titleObjects });
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

        try {
            const connection = await getConnectionAsync();

            if (connection) {
                try {
                    const nameObjects = await getSearchNameObjects(connection, namepart);
                    console.log(typeof nameObjects); // Log the type
                    if (nameObjects && nameObjects.length === 0) {
                        res.status(204).send();
                        return;
                    }

                    res.status(200).json({ status: 'Success', data: nameObjects });
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


