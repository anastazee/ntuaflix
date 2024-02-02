const mysql = require('mysql2');

const {
    getKnownForObjects,
    getPrincipalMovieObjects,
    gettop10MovieObjects,
    getvotes10MovieObjects,
} = require('../middlewares/extra-connections-queries');
const {getConnectionAsync} = require('../middlewares/connections-queries')
exports.getKnownFor = async (req, res) => {
    const nameID = req.params.nameID;

    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const knownForObjects = await getKnownForObjects(connection, nameID);

                res.status(200).json({ status: 'OK', data: knownForObjects});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Error fetching ${nameID} known for movies`, data: null});
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection' });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database', data: null });
    }
};


exports.getPrincipalMovies = async (req, res) => {
    const nameID = req.params.nameID;

    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const movieObjects = await getPrincipalMovieObjects(connection, nameID);

                res.status(200).json({ status: 'OK', data: movieObjects});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Error fetching ${nameID} principal movies`, data: null});
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection', data: null });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database', data: null });
    }
};


exports.gettop10Movies = async (req, res) => {
    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const movieObjects = await gettop10MovieObjects(connection);

                res.status(200).json({ status: 'OK', data: movieObjects});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Error fetching ${nameID} top 10 movies`, data: null});
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection', data: null });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database', data: null});
    }
};

exports.getvotes10Movies = async (req, res) => {
    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const movieObjects = await getvotes10MovieObjects(connection);

                res.status(200).json({ status: 'OK', data: movieObjects});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Error fetching ${nameID} top 10 movies`, data: null});
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection', data: null });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database', data: null });
    }
};