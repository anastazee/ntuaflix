const { pool } = require('../utils/database');

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
        fields.splice(genresIndex,1)[0];
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
