const { pool } = require('../utils/database');
const { getWarningInfo } = require('../utils/warningssql');
const { writeLogToFile } = require('../utils/logging');
const path = require('path');

// Specify the path to the log file
const logFilePath1 = path.join(__dirname, 'logs', 'processLineName.log');
const logFilePath2 = path.join(__dirname, 'logs', 'processTitleAkas.log');
const logFilePath3 = path.join(__dirname, 'logs', 'processTitleBasics.log');
const logFileEpisodes = path.join(__dirname, 'logs', 'processLineEpisode.log');
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
    values = values.map(value => (value === '\\N' ? null : value));

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
            writeLogToFile(logFilePath3, warningMessage);

        }
        if (genresIndex != -1) {
            if (genresValue !== null) {
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
        }
    } catch (err) {
        console.error('Database query error:', err);
        throw (err);
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
    values = values.map(value => (value === '\\N' ? null : value));

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
            writeLogToFile(logFilePath2, warningMessage);

        }

        console.log('Database query result:', result);
    } catch (err) {
        console.error('Database query error:', err);
        throw (err);
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

const checkCrew = async (connection, id) => {
    const query = 'SELECT nconst FROM Contributor WHERE nconst = ?';
    const result = await queryAsync(connection, query, [id]);
    if (result.length > 0) {
        // Genre exists, return the existing title_id
        return result[0].nconst;
    } else {
        //ID does not exist, cannot insert
        return '';
    }
};

exports.processLineName = async (line, connection, fieldNames) => {
    //console.log('Original Line:', line);
    //console.log('fieldNames:', fieldNames);
    let values = line.split('\t');
    values = values.map(value => (value === '\\N' ? null : value));

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
            //writeLogToFile(logFilePath1, warningMessage);

        }
        if (knownforMovies !== null) {
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
                    //writeLogToFile(logFilePath1, 'Database query result2: ' + JSON.stringify(result2));
                }
                else {
                    //writeLogToFile(logFilePath1,"titleid doesn't exist"+JSON.stringify(movieid));
                    //console.log("titleid doesn't exist", movieid);
                }
            }
            //console.log(logFilePath1,'Database query result:', result);
        }
    } catch (err) {
        writeLogToFile('Database query error: ' + err);
        console.error('Database query error:', err);
        throw (err);
    }
};

exports.processLineCrew = async (line, connection, fieldNames) => {

    let values = line.split('\t');
    let fields = fieldNames.slice();
    const tconst = values[fields.indexOf('tconst')];
    let direct = values[fields.indexOf('directors')];
    let write = values[fields.indexOf('writers')];

    try {
        const existsTitle = await checkTitleId(connection, tconst.trim());
        if (existsTitle) {
            if (direct.length > 8) {
                const directors = direct.split(',');
                for (const id of directors) {
                    const existsCrew = await checkCrew(connection, id.trim());
                    if (existsCrew) {
                        const result2 = await queryAsync(
                            connection,
                            'INSERT INTO Director (Contributornconst, Titletconst) VALUES (?, ?)',
                            [id, tconst]
                        );
                        writeLogToFile(logFilePath1, 'Database query result2: ' + JSON.stringify(result2));
                    }
                }
            }
            if (write.length > 8) {
                const writers = write.split(',');
                for (const id of writers) {
                    const existsCrew = await checkCrew(connection, id.trim());
                    if (existsCrew) {
                        const result2 = await queryAsync(
                            connection,
                            'INSERT INTO Writer (Contributornconst, Titletconst) VALUES (?, ?)',
                            [id, tconst]
                        );
                        writeLogToFile(logFilePath1, 'Database query result2: ' + JSON.stringify(result2));
                    }
                }
            }
        }
    } catch (err) {
        writeLogToFile('Database query error: ' + err);
        console.error('Database query error:', err);
        throw (err);
    }
};

exports.processLineEpisode = async (line, connection, fieldNames) => {

    let values = line.split('\t');
    let fields = fieldNames.slice();
    const tconst = values[fields.indexOf('tconst')];
    let parent = values[fields.indexOf('parentTconst')];
    let season = values[fields.indexOf('seasonNumber')];
    let episode = values[fields.indexOf('episodeNumber')];

    try {
        const existsTitle = await checkTitleId(connection, tconst.trim());
        const existsParent = await checkTitleId(connection, parent.trim());
        if (existsTitle) {

            season = (season === '\\N') ? null : parseInt(season); // Assuming seasonNumber is an integer
            episode = (episode === '\\N') ? null : parseInt(episode); // Assuming episodeNumber is an integer
            const result2 = await queryAsync(
                connection,
                'INSERT INTO Episode (tconst, parentTconst, seasonNumber, episodeNumber) VALUES (?, ?, ?, ?)',
                [tconst, parent, season, episode]
            );
            writeLogToFile(logFilePath1, 'Database query result2: ' + JSON.stringify(result2));

        }
    } catch (err) {
        writeLogToFile(logFileEpisodes, 'Database query error: ' + err);
        console.error('Database query error:', err);
        throw (err);
    }
};

exports.processLinePrincipals = async (line, connection, fieldNames) => {

    let values = line.split('\t');
    let fields = fieldNames.slice();
    let tconst = values[fields.indexOf('tconst')];
    let ordering = values[fields.indexOf('ordering')];
    let nconst = values[fields.indexOf('nconst')];
    let category = values[fields.indexOf('category')];
    let job = values[fields.indexOf('job')];
    let characters = values[fields.indexOf('characters')];
    let image = values[fields.indexOf('img_url_asset')];

    try {
        const existsTitle = await checkTitleId(connection, tconst.trim());
        const existsPrincipal = await checkCrew(connection, nconst.trim());
        if (existsTitle && existsPrincipal) {
            console.log(job, characters, image);
            job = (job === '\\N') ? null : job; // Assuming seasonNumber is an integer
            characters = (characters === '\\N') ? null : characters.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
            ; // Assuming episodeNumber is an integer
            image = (image === '\\N') ? null : image;
            console.log(job, characters, image);
            const result2 = await queryAsync(
                connection,
                'INSERT INTO title_principals (Contributornconst, Titletconst, ordering, category, job, characters, img_url_asset) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nconst, tconst, ordering, category, job, characters, image]
            );
            writeLogToFile(logFilePath1, 'Database query result2: ' + JSON.stringify(result2));
        }
    } catch (err) {
        writeLogToFile('Database query error: ' + err);
        console.error('Database query error:', err);
        throw (err);
    }
};

exports.processLineRatings = async (line, connection, fieldNames) => {
    let values = line.split('\t');
    let fields = fieldNames.slice();

    const tconst = values[fields.indexOf('tconst')];
    let rating = values[fields.indexOf('averageRating')];
    let votes = values[fields.indexOf('numVotes')];

    try {
        const existsTitle = await checkTitleId(connection, tconst.trim());
        if (existsTitle) {
            const result2 = await queryAsync(
                connection,
                'INSERT INTO Ratings (Titletconst, averageRating, numVotes) VALUES (?, ?, ?)',
                [tconst, rating, votes]
            );
            writeLogToFile(logFilePath1, 'Database query result2: ' + JSON.stringify(result2));

        }
    } catch (err) {
        writeLogToFile('Database query error: ' + err);
        console.error('Database query error:', err);
        throw (err);
    }
};

exports.processReset = async(connection) => {
    try {
        // Get a list of all tables in the database
        //const tables = await queryAsync(connection, 'SHOW TABLES');
        //const tableNames = tables.map(table => table[`Tables_in_softeng`]);
        const tableNames = ['Akas',
                            'KnownFor',
                            'Writer',
                            'Director',
                            'movie_genre',
                            'title_principals',
                            'Episode',
                            'Ratings',
                            'Contributor',
                            'Title',
                            'genre'
                            ]
        // Delete all data from each table
        for (const tableName of tableNames) {
          await queryAsync(connection, `DELETE FROM ${tableName}`);
        }
    
        // Commit changes
        await queryAsync(connection, 'COMMIT');
    
        console.log('All data deleted successfully.');
      } catch (error) {
        console.error('Error deleting data:', error);
        throw(error);
      }
};

exports.getTitleObject = async (connection, titleID) => {
    const query = `
        SELECT
            t.tconst AS titleID,
            t.titleType,
            t.primaryTitle AS originalTitle,
            t.img_url_asset AS titlePoster,
            t.startYear,
            t.endYear
        FROM
            Title t
        WHERE
            t.tconst = ?
    `;

    const titleResult = await queryAsync(connection, query, [titleID]);

    if (titleResult.length > 0) {
        const titleObject = {
            titleID: titleResult[0].titleID,
            type: titleResult[0].titleType,
            originalTitle: titleResult[0].originalTitle,
            titlePoster: titleResult[0].titlePoster,
            startYear: titleResult[0].startYear,
            endYear: titleResult[0].endYear,
            genres: await fetchgenres(connection, titleID),
            titleAkas: await fetchTitleAkas(connection, titleID),
            principals: await fetchContributors(connection, titleID),
            rating: await fetchRating(connection, titleID)
        };

        return titleObject;
    } else {
        throw new Error(`Title with ID ${titleID} not found`);
    }
};

const fetchgenres = async (connection, titleID) => {
    const query = `
        SELECT g.genre
        FROM genre g
        JOIN movie_genre mg ON g.genreID = mg.genreID
        WHERE mg.Titletconst = ?
    `;

    const genresResult = await queryAsync(connection, query, [titleID]);

    return genresResult.map(row => ({ genreTitle: row.genre }));
};

const fetchTitleAkas = async (connection, titleID) => {
    const query = `SELECT title, region FROM Akas WHERE titleId=?`;

    const titleAkasResult = await queryAsync(connection, query, [titleID]);

    return titleAkasResult.map(row => ({ akaTitle: row.title, regionAbbrev: row.region }));
};

const fetchContributors = async (connection, titleID) => {
    const query = `
        SELECT
            tp.Contributornconst AS nameID,
            c.primaryName AS name,
            tp.category
        FROM
            title_principals tp
            JOIN Contributor c ON tp.Contributornconst = c.nconst
        WHERE
            tp.Titletconst = ?
    `;

    const contributorsResult = await queryAsync(connection, query, [titleID]);

    return contributorsResult.map(row => ({
        nameID: row.nameID,
        name: row.name,
        category: row.category
    }));
};

const fetchRating = async (connection, titleID) => {
    const query = `SELECT averageRating, numVotes FROM Ratings WHERE Titletconst = ?`;

    const ratingResult = await queryAsync(connection, query, [titleID]);

    if (ratingResult.length > 0) {
        return {
            avRating: ratingResult[0].averageRating.toString(),
            nVotes: ratingResult[0].numVotes.toString()
        };
    } else {
        return {
            avRating: 'N/A',
            nVotes: '0'
        };
    }
};

exports.getNameObject = async (connection, nameID) => {
    const query = `
        SELECT
            n.nconst,
            n.primaryName,
            n.img_url_asset,
            n.BirthYear,
            n.DeathYear,
            n.primaryProfession
        FROM
            Contributor n
        WHERE
            n.nconst = ?
    `;

    const nameResult = await queryAsync(connection, query, [nameID]);

    if (nameResult.length > 0) {
        const nameObject = {
            nameID: nameResult[0].nconst,
            name: nameResult[0].primaryName,
            namePoster: nameResult[0].img_url_asset,
            birthYr: nameResult[0].BirthYear,
            deathYr: nameResult[0].DeathYear,
            profession: nameResult[0].primaryProfession,
            nameTitles: await fetchnameTitles(connection, nameID)
        };

        return nameObject;
    } else {
        throw new Error(`Contributor with nameID ${nameID} not found`);
    }
};

const fetchnameTitles = async (connection, nameID) => {
    const query = `
        SELECT
            tp.Titletconst AS titleID,
            tp.category
        FROM
            title_principals tp
            JOIN Contributor c ON tp.Contributornconst = c.nconst
        WHERE
            c.nconst = ?
    `;

    const nameTitleResult = await queryAsync(connection, query, [nameID]);

    return nameTitleResult.map(row => ({
        titleID: row.titleID,
        category: row.category
    }));
};

exports.getSearchTitleObjects = async (connection, titlepart) => {
    let returnObjects = [];
    if (titlepart.length > 0) {
        //const query = `SELECT tconst FROM title WHERE primaryTitle LIKE ?`;
        const query = `
        SELECT
            t.tconst AS titleID,
            t.titleType,
            t.primaryTitle AS originalTitle,
            t.img_url_asset AS titlePoster,
            t.startYear,
            t.endYear
        FROM
            Title t
        WHERE
            t.primaryTitle LIKE ?`;
        try {
            const results = await queryAsync(connection, query, [`%${titlepart}%`]);
            try {
                for (const titleResult of results) {
                    const titleID = titleResult.titleID;
                    const titleObject = {
                        titleID: titleResult.titleID,
                        type: titleResult.titleType,
                        originalTitle: titleResult.originalTitle,
                        titlePoster: titleResult.titlePoster,
                        startYear: titleResult.startYear,
                        endYear: titleResult.endYear,
                        genres: await fetchgenres(connection, titleID),
                        titleAkas: await fetchTitleAkas(connection, titleID),
                        principals: await fetchContributors(connection, titleID),
                        rating: await fetchRating(connection, titleID)
                    };
                    returnObjects.push(titleObject);
                }
            } catch (error) {
                console.error('Error fetching additional data:', error);
                throw error;
            }

            return returnObjects;
        }
        catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
    else {
        console.warn('Title part is empty');
        return returnObjects;
    }

};

exports.getSearchNameObjects = async (connection, namepart) => {
    let returnObjects = [];
    if (namepart.length > 0) {
        //const query = `SELECT tconst FROM title WHERE primaryTitle LIKE ?`;
        const query = `
        SELECT
            n.nconst,
            n.primaryName,
            n.img_url_asset,
            n.BirthYear,
            n.DeathYear,
            n.primaryProfession
        FROM
            Contributor n
        WHERE
            n.primaryName LIKE ?
    `;
        try {
            const results = await queryAsync(connection, query, [`%${namepart}%`]);
            if (results.length > 0) {
                try {
                    for (const nameResult of results) {
                        const nameID = nameResult.nconst;
                        const nameObject = {
                            nameID: nameResult.nconst,
                            name: nameResult.primaryName,
                            namePoster: nameResult.img_url_asset,
                            birthYr: nameResult.BirthYear,
                            deathYr: nameResult.DeathYear,
                            profession: nameResult.primaryProfession,
                            nameTitles: await fetchnameTitles(connection, nameID)
                        };
                        returnObjects.push(nameObject);
                    }
                } catch (error) {
                    console.error('Error fetching additional data:', error);
                    throw error;
                }
            }

            return returnObjects;
        }
        catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
    else {
        console.warn('Name part is empty');
        return returnObjects;
    }

};

exports.getByGenreObjects = async (connection, qgenre, minrating, yrFrom, yrTo) => {
    let titleResults = null;
    if(!yrFrom && !yrTo) {
        const query = `
            SELECT
                t.tconst AS titleID,
                t.titleType,
                t.primaryTitle AS originalTitle,
                t.img_url_asset AS titlePoster,
                t.startYear,
                t.endYear
            FROM
                Title t
            JOIN 
                movie_genre mg ON t.tconst = mg.Titletconst
            JOIN
                genre g ON mg.genreID = g.genreID
            JOIN
                Ratings r ON t.tconst = r.Titletconst
            WHERE
                g.genre = ? AND r.averageRating >= ?
        `;

        titleResults = await queryAsync(connection, query, [qgenre, minrating]);
    } else if(!yrFrom) {
        const query = `
            SELECT
                t.tconst AS titleID,
                t.titleType,
                t.primaryTitle AS originalTitle,
                t.img_url_asset AS titlePoster,
                t.startYear,
                t.endYear
            FROM
                Title t
            JOIN 
                movie_genre mg ON t.tconst = mg.Titletconst
            JOIN
                genre g ON mg.genreID = g.genreID
            JOIN
                Ratings r ON t.tconst = r.Titletconst
            WHERE
                g.genre = ? AND r.averageRating >= ? AND t.startYear <= ?
        `;

        titleResults = await queryAsync(connection, query, [qgenre, minrating, yrTo]);
    } else if(!yrTo) {
        const query = `
            SELECT
                t.tconst AS titleID,
                t.titleType,
                t.primaryTitle AS originalTitle,
                t.img_url_asset AS titlePoster,
                t.startYear,
                t.endYear
            FROM
                Title t
            JOIN 
                movie_genre mg ON t.tconst = mg.Titletconst
            JOIN
                genre g ON mg.genreID = g.genreID
            JOIN
                Ratings r ON t.tconst = r.Titletconst
            WHERE
                g.genre = ? AND r.averageRating >= ? AND t.startYear >= ?
        `;

        titleResults = await queryAsync(connection, query, [qgenre, minrating, yrFrom]);
    } else {
        const query = `
            SELECT
                t.tconst AS titleID,
                t.titleType,
                t.primaryTitle AS originalTitle,
                t.img_url_asset AS titlePoster,
                t.startYear,
                t.endYear
            FROM
                Title t
            JOIN 
                movie_genre mg ON t.tconst = mg.Titletconst
            JOIN
                genre g ON mg.genreID = g.genreID
            JOIN
                Ratings r ON t.tconst = r.Titletconst
            WHERE
                g.genre = ? AND r.averageRating >= ? AND t.startYear >= ? AND t.startYear <= ?
        `;

        titleResults = await queryAsync(connection, query, [qgenre, minrating, yrFrom, yrTo]);
    }
    
    const titleObjects = [];

    for (const titleResult of titleResults) {
        const titleObject = {
            titleID: titleResult.titleID,
            type: titleResult.titleType,
            originalTitle: titleResult.originalTitle,
            titlePoster: titleResult.titlePoster,
            startYear: titleResult.startYear,
            endYear: titleResult.endYear,
            genres: await fetchgenres(connection, titleResult.titleID),
            titleAkas: await fetchTitleAkas(connection, titleResult.titleID),
            principals: await fetchContributors(connection, titleResult.titleID),
            rating: await fetchRating(connection, titleResult.titleID)
        };

        titleObjects.push(titleObject);
    }
    return titleObjects;
    /*
    if (titleObjects.length > 0) {
        return titleObjects;
    } else {
        throw new Error(`Titles not found`);
    }
    */
};