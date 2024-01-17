const mysql = require('mysql2');

const {
    getConnectionAsync,
    getTitleObject,
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