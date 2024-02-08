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
    // #swagger.tags = ['user']
    // #swagger.description = 'Get information about a specific title.'
    const titleID = req.params.titleID;
    const format = req.query.format || null;
    if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
    /*#swagger.responses[400] = {
   description: "Wrong format type. Format can only be 'csv' or 'json'.",
   content: {
       'application/json': {
           schema: {
               type: 'object',
               properties: {
                   message: {
                       type: 'string'
                   }
               }
           }
       }
   }
   }*/
        res.status(400).json({ message: 'Bad Request. Format values can be csv or json' })
    }
    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const titleObject = await getTitleObject(connection, titleID);
                if (!format || format.toLowerCase() === 'json') {
                    res.status(200).send(titleObject);
                    /* #swagger.responses[200] = {
                    description: 'Success - JSON or CSV',
                    content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/titleObject"
                        }
                    },
                    'text/csv': {
                        schema: {
                            type: 'string',
                            format: 'csv'
                        }
                    }
                    }
                    }

                } */

                }
                else if (format.toLowerCase() === 'csv') {
                    const csvData = convertToCSV([titleObject]);
                    res.status(200).send(csvData);
                }

                connection.release();
            } catch (error) {
    /*#swagger.responses[404] = {
    description: 'There is not a title with the specified titleID',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    }
}
*/
                res.status(404).json({ message: `Title with ID ${titleID} not found` });
            }
        } else {
            res.status(500).json({ message: 'Faulty connection' });
    /*#swagger.responses[500] = {
    description: 'Internal Server Error. Check the return message.',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

            */
        }
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to the database' });
    }
};

exports.getNameRoute = async (req, res) => {
    // #swagger.tags = ['user']
    // #swagger.description = 'Get information about a specific Contributor.'

    const nameID = req.params.nameID;
    const format = req.query.format || null;

    if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
        /*#swagger.responses[400] = {
        description: "Wrong format type. Format can only be 'csv' or 'json'.",
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        }
                    }
                }
            }
        }
        }*/
        res.status(400).json({ message: 'Bad Request. Format values can be csv or json' })
    }
    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const nameObject = await getNameObject(connection, nameID);
                /* #swagger.responses[200] = {
                    description: 'Success - JSON or CSV',
                    content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/nameObject"
                        }
                    },
                    'text/csv': {
                        schema: {
                            type: 'string',
                            format: 'csv'
                        }
                    }
                    }
                    }

                } */

                if (!format || format.toLowerCase() === 'json') {

                    res.status(200).send(nameObject);
                }
                else if (format.toLowerCase() === 'csv') {
                    const csvData = convertToCSV([nameObject]);
                    res.status(200).send(csvData);
                }

                connection.release();
            } catch (error) {
                /*#swagger.responses[404] = {
                    description: 'There is not a contributor with the specified nameID',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                }
                */
                res.status(404).json({ message: `Contributor with nameID ${nameID} not found` });
            }
        } else {
    /*#swagger.responses[500] = {
    description: 'Internal Server Error. Check the return message.',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

            */
            res.status(500).json({ message: 'Faulty connection' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to the database' });
    }
};

exports.getSearchTitle = async (req, res) => {
    // #swagger.tags = ['user']
    //#swagger.description = "Search for titles that include 'namePart'."
    /*#swagger.requestBody = {
    "content": {
        "application/json": {
            "schema": {
                "type": "object",
                "properties": {
                    "titlePart": {
                        "type": "string",
                        "example": "titlepart",
                        "description": "The titlePart is desired to be included in the Original Title of the results."
                    }
                }
            }
        }
    }
}
*/
    try {
        let tqueryObject = req.body;
        if (!tqueryObject || !tqueryObject.titlePart) {
    /*#swagger.responses[400] = {
   description: "Bad Request. Either titlePart is missing from the request body, titlePart is empty or format has a wrong type (different from csv/json).\r\n
   See message for more information.",
   content: {
       'application/json': {
           schema: {
               type: 'object',
               properties: {
                   message: {
                       type: 'string'
                   }
               }
           }
       }
   }
   }*/
            res.status(400).json({ message: 'Invalid or missing titlePart in the request body' });
            return;
        }
        const titlepart = tqueryObject.titlePart;
        const format = req.query.format || null;
        if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
            res.status(400).json({ message: 'Bad Request. Format values can be csv or json' })
        }
        try {
            const connection = await getConnectionAsync();

            if (connection) {
                try {
                    const titleObjects = await getSearchTitleObjects(connection, titlepart);
                    if (titleObjects.length == 0) {
                        /*#swagger.responses[204] = {
   description: 'No title matches the titlePart parameter. No data is returned.',
}*/
                        res.status(204).send();
                        return;
                    }
                    if (!format || format.toLowerCase() === 'json') {
                    /* #swagger.responses[200] = {
                    description: 'Success - JSON or CSV',
                    content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                            $ref: "#/components/schemas/titleObject"
                            }
                        }
                    },
                    'text/csv': {
                        schema: {
                            type: 'string',
                            format: 'csv'
                        }
                    }
                    }
                    }

                } */
                        res.status(200).send(titleObjects);
                    } else if (format.toLowerCase() === 'csv') {
                        const csvData = convertToCSV(titleObjects);
                        res.status(200).send(csvData);
                    }
                } catch (error) {
                    console.error('Error in getSearchTitleObjects:', error);
                    res.status(500).json({ message: 'Internal Server Error. Error getting matching TitleObjects' });
                } finally {
                    connection.release();
                }
            }
            else {
                res.status(500).json({ message: 'Internal Server Error. Unable to establish database connection' });
            }
        }
        catch (error) {
            console.error('Error getting database connection:', error);
            res.status(500).json({ message: 'Internal Server Error. Error getting database connection' });
        }
    /*#swagger.responses[500] = {
   description: 'Internal Server Error. Check the return message.',
   content: {
       'application/json': {
           schema: {
               type: 'object',
               properties: {
                   message: {
                       type: 'string'
                   }
               }
           }
       }
   }
}

           */
    }
    catch (error) {
        console.error('Error parsing request body:', error);
        res.status(400).json({ message: 'Bad Request. Invalid request body' });
    }
};

exports.getSearchName = async (req, res) => {
    // #swagger.tags = ['user']
    //#swagger.description = "Search for contributors whose name includes 'namePart'."
    /*#swagger.requestBody = {
    "content": {
        "application/json": {
            "schema": {
                "type": "object",
                "properties": {
                    "namePart": {
                        "type": "string",
                        "example": "namepart",
                        "description": "The titlePart is desired to be included in the Original Title of the results."
                    }
                }
            }
        }
    }
}
*/
    try {
        let nqueryObject = req.body;
    /*#swagger.responses[400] = {
    description: "Bad Request. Either namePart is missing from the request body, namePart is empty or format has a wrong type (different from csv/json).\r\n
    See message for more information.",
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    }
    }*/
        if (!nqueryObject || !nqueryObject.namePart) {
            res.status(400).json({ message: 'Bad Request. Invalid or missing namePart in the request body' });
            return;
        }
        const namepart = nqueryObject.namePart;
        const format = req.query.format || null;
        if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
            res.status(400).json({ message: 'Bad Request. Format values can be csv or json' })
        }
        try {
            const connection = await getConnectionAsync();

            if (connection) {
                try {
                    const nameObjects = await getSearchNameObjects(connection, namepart);
                    if (nameObjects.length == 0) {
                        /*#swagger.responses[204] = {
    description: 'No contributor matches the namePart parameter. No data is returned.',
}*/
                        res.status(204).send();
                        return;
                    }/* #swagger.responses[200] = {
                    description: 'Success - JSON or CSV',
                    content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                            $ref: "#/components/schemas/nameObject"
                            }
                        }
                    },
                    'text/csv': {
                        schema: {
                            type: 'string',
                            format: 'csv'
                        }
                    }
                    }
                    }

                } */
                    if (!format || format.toLowerCase() === 'json') {
                        res.status(200).send(nameObjects);
                    } else if (format.toLowerCase() === 'csv') {
                        const csvData = convertToCSV(nameObjects);
                        res.status(200).send(csvData);
                    }
                } catch (error) {
                    console.error('Error in getSearchNameObjects:', error);
                    res.status(500).json({ message: 'Internal Server Error. Error getting matchng NameObjects' });
                } finally {
                    connection.release();
                }
            }
/*#swagger.responses[500] = {
    description: 'Internal Server Error. Check the return message.',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

            */
            else {
                res.status(500).json({ message: 'Internal Server Error. Unable to establish database connection' });
            }
        }
        catch (error) {
            console.error('Error getting database connection:', error);
            res.status(500).json({ message: 'Internal Server Error. Error getting database connection' });
        }
    }
    catch (error) {
        console.error('Error parsing request body:', error);
        res.status(400).json({ message: 'Internal Server Error. Invalid request body' });
    }
};

exports.getByGenre = async (req, res) => {
    /*#swagger.tags = ['user']
    #swagger.description = "Search for titles by genre and more criteria."
    #swagger.requestBody = {
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "qgenre": {
                            "example": "any"
                        },
                        "minrating": {
                            "example": "any"
                        },
                        "yrFrom": {
                            "example": "any"
                        },
                        "yrTo": {
                            "example": "any"
                        }
                    }
                }
            }
        }
    }*/


    try {
        let gqueryObject = req.body;
    /*#swagger.responses[400] = {
    description: "Bad Request.
    See message for more information.",
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    }
    }*/
        if (!gqueryObject || !gqueryObject.qgenre || !gqueryObject.minrating) {
            res.status(400).json({ message: 'Bad Request. Genre and minimum rating are required parameters' });
            return;
        }
        const format = req.query.format || null;
        if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
            res.status(400).json({ message: 'Bad Request. Format values can be csv or json' })
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
                        /*#swagger.responses[204] = { description: 'No title matches the titlePart parameter. No data is returned.'}*/
                        res.status(204).send();
                        return;
                    }
                    /* #swagger.responses[200] = {
                    description: 'Success - JSON or CSV',
                    content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                            $ref: "#/components/schemas/titleObject"
                            }
                        }
                    },
                    'text/csv': {
                        schema: {
                            type: 'string',
                            format: 'csv'
                        }
                    }
                    }
                    }

                } */
                    if (!format || format.toLowerCase() === 'json') {
                        res.status(200).json(titleObjects);
                    } else if (format.toLowerCase() === 'csv') {
                        const csvData = convertToCSV(titleObjects);
                        res.status(200).send(csvData);
                    }
                } catch (error) {
                    console.error('Error in getByGenreObjects:', error);
                    res.status(500).json({ message: 'Internal Server Error. Error getting matching TitleObjects' });
                } finally {
                    connection.release();
                }
            }
/*#swagger.responses[500] = {
    description: 'Internal Server Error. Check the return message.',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

            */
            else {
                res.status(500).json({ message: 'Internal Server Error. Unable to establish database connection' });
            }
        }
        catch (error) {
            console.error('Error getting database connection:', error);
            res.status(500).json({ message: 'Internal Server Error. Error getting database connection' });
        }
    }
    catch (error) {
        console.error('Error parsing request body:', error);
        res.status(400).json({ message: 'Bad Request. Invalid request body' });
    }
};
