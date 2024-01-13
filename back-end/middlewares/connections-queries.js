const { pool } = require('../utils/database');
const { getWarningInfo } = require('../utils/warningssql');
const { writeLogToFile } = require('../utils/logging');
const path = require('path');

// Specify the path to the log file
const logFilePath1 = path.join(__dirname, 'logs', 'processLineName.log');
const logFilePath2 = path.join(__dirname, 'logs', 'processTitleAkas.log');
const logFilePath3 = path.join(__dirname, 'logs', 'processTitleBasics.log');

exports.getConnectionAsync = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
};

const queryAsync = (connection, sql, values) => {
    return new Promise((resolve, reject) => {
        if (!connection) {
            reject(new Error('Connection object is undefined.'));
            return;
        }

        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


exports.processLineTitle = async (line, connection, fieldNames) => {
    // Your preprocessing logic for each line goes here
    // Example: Log the original line
    console.log('Original Line:', line);
    console.log('fieldNames:', fieldNames);
    // Example: Split the line into values using tabs
    let values = line.split('\t');

    // Example: Log the values
    console.log('Values:', values);
    let fields = fieldNames.slice();
    const genresIndex = fieldNames.indexOf('genres');
    let titleId, genresValue;

    if (genresIndex != -1) {
        // Extract the 'genres' value from the line
        genresValue = values.splice(genresIndex, 1)[0];
        fields.splice(genresIndex, 1)[0];
        titleId = values[fields.indexOf('tconst')];
        // Do something with the 'genres' value
        console.log('Genres Value:', genresValue);
    }
    // Execute the query for each line within the transaction
    const placeholders = Array(fields.length).fill('?').join(', ');

    // Execute the query for each line within the transaction
    try {
        const result = await queryAsync(
            connection,
            `INSERT INTO Title (${fields.join(', ')}) VALUES (${placeholders})`,
            values // Replace with actual values or variables
        );
        if (result.warningStatus > 0) {
            const warningMessage = `Warning: ${result.warningStatus} ${await getWarningInfo(connection)}`;
            //console.log('Warning:', result.warningStatus, result.info);
            writeLogToFile(logFilePath3,warningMessage);

        }
        if (genresIndex != -1) {
            // Process each genre separately
            const genreNames = genresValue.split(',');
            for (const genreName of genreNames) {
                // Get or insert the genre and obtain the genre_id
                const genreId = await getGenreId(connection, genreName.trim());

                // Insert into the movie_genre table
                const result2 = await queryAsync(
                    connection,
                    'INSERT INTO movie_genre (Titletconst, genreID) VALUES (?, ?)',
                    [titleId, genreId]
                );

                console.log('Database query result (movie_genre):', result2);
            }
        }
        console.log('Database query result:', result);
    } catch (err) {
        console.error('Database query error:', err);
        throw(err);
    }
};

const getGenreId = async (connection, genreName) => {
    const query = 'SELECT genreID FROM genre WHERE genre = ?';
    const result = await queryAsync(connection, query, [genreName]);
    if (result.length > 0) {
        // Genre exists, return the existing genre_id
        return result[0].genreID;
    } else {
        // Genre does not exist, insert a new record and return the new genre_id
        const insertQuery = 'INSERT INTO genre (genre) VALUES (?)';
        const insertResult = await queryAsync(connection, insertQuery, [genreName]);
        return insertResult.insertId;
    }
};

exports.processLineAkas = async (line, connection, fieldNames) => {
    // Your preprocessing logic for each line goes here
    // Example: Log the original line
    console.log('Original Line:', line);
    console.log('fieldNames:', fieldNames);

    // Example: Split the line into values using tabs
    let values = line.split('\t');
    const placeholders = Array(fieldNames.length).fill('?').join(', ');
    // Execute the query for each line within the transaction
    try {
        //let check = checkTitleId(connection,values[0])
        //if (!check) {
        //    console.log("titleID doesn't match existing movie");
        //    return;
        //}
        const result = await queryAsync(
            connection,
            `INSERT INTO Akas (${fieldNames.join(', ')}) VALUES (${placeholders})`,
            values // Replace with actual values or variables
        );
        if (result.warningStatus > 0) {
            const warningMessage = `Warning: ${result.warningStatus} ${await getWarningInfo(connection)}`;
            //console.log('Warning:', result.warningStatus, result.info);
            writeLogToFile(logFilePath2,warningMessage);

        }
        
        console.log('Database query result:', result);
    } catch (err) {
        console.error('Database query error:', err);
        throw(err);
    }
};

const checkTitleId = async (connection, titleid) => {
    const query = 'SELECT tconst FROM Title WHERE tconst = ?';
    const result = await queryAsync(connection, query, [titleid]);
    if (result.length > 0) {
        // Genre exists, return the existing title_id
        return result[0].tconst;
    } else {
        //ID does not exist, cannot insert
        return '';
    }
};


exports.processLineName = async (line, connection, fieldNames) => {
    //console.log('Original Line:', line);
    //console.log('fieldNames:', fieldNames);
    let values = line.split('\t');

    //console.log('Values:', values);
    let fields = fieldNames.slice();
    const knownForIndex = fieldNames.indexOf('knownForTitles');
    let nconst, knownforMovies;

    knownforMovies = values.splice(knownForIndex, 1)[0];
    fields.splice(knownForIndex, 1)[0];
    nconst = values[fields.indexOf('nconst')];

    // Execute the query for each line within the transaction
    const placeholders = Array(fields.length).fill('?').join(', ');

    // Execute the query for each line within the transaction
    try {
        const result = await queryAsync(
            connection,
            `INSERT INTO Contributor (${fields.join(', ')}) VALUES (${placeholders})`,
            values // Replace with actual values or variables
        );
        if (result.warningStatus > 0) {
            const warningMessage = `Warning: ${result.warningStatus} ${await getWarningInfo(connection)}`;
            //console.log('Warning:', result.warningStatus, result.info);
            writeLogToFile(logFilePath1,warningMessage);

        }

        // Process each genre separately
        const movies = knownforMovies.split(',');
        for (const movieid of movies) {
            // Get or insert the genre and obtain the genre_id
            const exists = await checkTitleId(connection, movieid.trim());

            // Insert into the knownFor table
            if (exists) {
                const result2 = await queryAsync(
                    connection,
                    'INSERT INTO KnownFor (Contributornconst, Titletconst) VALUES (?, ?)',
                    [nconst, movieid]
                );

                //console.log('Database query result (movie_genre):', result2);
                writeLogToFile(logFilePath1,'Database query result2: ' + JSON.stringify(result2));
            }
            else {
                //writeLogToFile(logFilePath1,"titleid doesn't exist"+JSON.stringify(movieid));
                //console.log("titleid doesn't exist", movieid);
            }
        }
        //console.log(logFilePath1,'Database query result:', result);
    } catch (err) {
        writeLogToFile('Database query error: ' + err);
        console.error('Database query error:', err);
        throw(err);
    }
};

