const mysql = require('mysql2');
const {
    getKnownForObjects,
    getPrincipalMovieObjects,
    gettop10MovieObjects,
    getvotes10MovieObjects,
    getDirectorObjects,
    getWritersObjects,
    getTitlePrincipalsObjects,
    getGenresFromDatabase,
} = require('../middlewares/extra-connections-queries');
const {getConnectionAsync} = require('../middlewares/connections-queries');

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


exports.getDirector = async (req, res) => {
    const titleID = req.params.titleID;

    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const directorObjects = await getDirectorObjects(connection, titleID);

                res.status(200).json({ status: 'OK', data: directorObjects});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Error fetching ${titleID} director`, data: null});
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection', data: null });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database', data: null });
    }
};


exports.getWriters = async (req, res) => {
    const titleID = req.params.titleID;

    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const writersObjects = await getWritersObjects(connection, titleID);

                res.status(200).json({ status: 'OK', data: writersObjects});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Error fetching ${titleID} writers`, data: null});
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection', data: null });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database', data: null });
    }
};


exports.getTitlePrincipals = async (req, res) => {
    const titleID = req.params.titleID;

    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
                const titlePrincipalsObjects = await getTitlePrincipalsObjects(connection, titleID);

                res.status(200).json({ status: 'OK', data: titlePrincipalsObjects});

                connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Error fetching ${titleID} principals`, data: null});
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection', data: null });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database', data: null });
    }
};

exports.getAllGenres = async (req, res) => {
    try {
        const connection = await getConnectionAsync();

        if (connection) {
            try {
            const genres = await getGenresFromDatabase(connection);

            res.status(200).json({ genres });

            connection.release();
            } catch (error) {
                res.status(404).json({ status: 'Failed', message: `Error fetching genres`, data: null});
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Faulty connection', data: null });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Error connecting to the database', data: null });
    }
};