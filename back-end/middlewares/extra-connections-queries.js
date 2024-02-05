const { pool } = require('../utils/database');
const { getWarningInfo } = require('../utils/warningssql');
const { writeLogToFile } = require('../utils/logging');
const path = require('path');

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
}


exports.getKnownForObjects = async (connection, nameID) => {
    let returnObjects = [];
    if (nameID) {
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
        INNER JOIN KnownFor k
            ON k.Titletconst = t.tconst
        INNER JOIN Contributor c
            ON c.nconst = k.Contributornconst
        WHERE
            c.nconst = ?`;
        try {
            const results = await queryAsync(connection, query, [`${nameID}`]);
            try {
                for (const titleResult of results) {
                    const titleObject = {
                        titleID: titleResult.titleID,
                        type: titleResult.titleType,
                        originalTitle: titleResult.originalTitle,
                        titlePoster: titleResult.titlePoster,
                        startYear: titleResult.startYear,
                        endYear: titleResult.endYear,
                    };
                    returnObjects.push(titleObject);
                }
            } catch (error) {
                console.error('Error creating object', error);
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
        console.warn('nameID is null');
        return returnObjects;
    }

}


exports.getPrincipalMovieObjects = async (connection, nameID) => {
    let returnObjects = [];
    if (nameID) {
        //const query = `SELECT tconst FROM title WHERE primaryTitle LIKE ?`;
        const query = `
        SELECT
            t.tconst AS titleID,
            t.titleType,
            t.primaryTitle AS originalTitle,
            t.img_url_asset AS titlePoster,
            t.startYear,
            t.endYear,
            p.category,
            p.characters
        FROM
            Title t
        INNER JOIN title_principals p
            ON p.Titletconst = t.tconst
        INNER JOIN Contributor c
            ON c.nconst = p.Contributornconst
        WHERE
            c.nconst = ?`;
        try {
            const results = await queryAsync(connection, query, [`${nameID}`]);
            try {
                for (const titleResult of results) {
                    const titleObject = {
                        titleID: titleResult.titleID,
                        type: titleResult.titleType,
                        originalTitle: titleResult.originalTitle,
                        titlePoster: titleResult.titlePoster,
                        startYear: titleResult.startYear,
                        endYear: titleResult.endYear,
                        category: titleResult.category,
                        characters: titleResult.characters,
                    };
                    returnObjects.push(titleObject);
                }
            } catch (error) {
                console.error('Error creating object', error);
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
        console.warn('nameID is null');
        return returnObjects;
    }

};


exports.gettop10MovieObjects = async (connection) => {
    let returnObjects = [];
    //const query = `SELECT tconst FROM title WHERE primaryTitle LIKE ?`;
    const query = `
        SELECT
            t.tconst AS titleID,
            t.primaryTitle AS originalTitle,
            t.img_url_asset AS titlePoster,
            t.titleType,
            t.startYear,
            t.endYear,
            r.averageRating
        FROM
            Title t
        INNER JOIN Ratings r
            ON t.tconst = r.Titletconst
        WHERE t.titleType = "movie"
        ORDER BY
            r.averageRating DESC
        LIMIT 10;`;
    try {
        const results = await queryAsync(connection, query, []);
        try {
            for (const titleResult of results) {
                const titleObject = {
                    titleID: titleResult.titleID,
                    type: titleResult.titleType,
                    originalTitle: titleResult.originalTitle,
                    titlePoster: titleResult.titlePoster,
                    startYear: titleResult.startYear,
                    endYear: titleResult.endYear
                };
                returnObjects.push(titleObject);
            }
        } catch (error) {
            console.error('Error creating object', error);
            throw error;
        }

        return returnObjects;
    }
    catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }

};


exports.getvotes10MovieObjects = async (connection) => {
    let returnObjects = [];
    //const query = `SELECT tconst FROM title WHERE primaryTitle LIKE ?`;
    const query = `
        SELECT
            t.tconst AS titleID,
            t.primaryTitle AS originalTitle,
            t.img_url_asset AS titlePoster,
            t.titleType,
            t.startYear,
            t.endYear,
            r.numVotes
        FROM
            Title t
        INNER JOIN Ratings r
            ON t.tconst = r.Titletconst
        WHERE t.titleType = "movie"
        ORDER BY
            r.numVotes DESC
        LIMIT 10;`;
    try {
        const results = await queryAsync(connection, query, []);
        try {
            for (const titleResult of results) {
                const titleObject = {
                    titleID: titleResult.titleID,
                    type: titleResult.titleType,
                    originalTitle: titleResult.originalTitle,
                    titlePoster: titleResult.titlePoster,
                    startYear: titleResult.startYear,
                    endYear: titleResult.endYear
                };
                returnObjects.push(titleObject);
            }
        } catch (error) {
            console.error('Error creating object', error);
            throw error;
        }

        return returnObjects;
    }
    catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }

};


exports.getDirectorObjects = async (connection, titleID) => {
    let returnObjects = [];
    if (titleID) {
        const query = `
        SELECT
            c.nconst,
            c.primaryName,
            c.img_url_asset,
            c.BirthYear,
            c.DeathYear,
            c.primaryProfession
        FROM
            Contributor c
        JOIN
            Director d ON c.nconst = d.Contributornconst
        WHERE
            d.Titletconst = ?`;
        try {
            const results = await queryAsync(connection, query, [`${nameID}`]);
            try {
                for (const nameResult of results) {
                    const nameObject = {
                        nameID: nameResult.nconst,
                        name: nameResult.primaryName,
                        namePoster: nameResult.img_url_asset,
                        birthYr: nameResult.BirthYear,
                        deathYr: nameResult.DeathYear,
                        profession: nameResult.primaryProfession
                    };
                    returnObjects.push(nameObject);
                }
            } catch (error) {
                console.error('Error creating object', error);
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
        console.warn('titleID is null');
        return returnObjects;
    }

};


exports.getWritersObjects = async (connection, titleID) => {
    let returnObjects = [];
    if (titleID) {
        const query = `
        SELECT
            c.nconst,
            c.primaryName,
            c.img_url_asset,
            c.BirthYear,
            c.DeathYear,
            c.primaryProfession
        FROM
            Contributor c
        JOIN
            Writer w ON c.nconst = w.Contributornconst
        WHERE
            w.Titletconst = ?`;
        try {
            const results = await queryAsync(connection, query, [`${nameID}`]);
            try {
                for (const nameResult of results) {
                    const nameObject = {
                        nameID: nameResult.nconst,
                        name: nameResult.primaryName,
                        namePoster: nameResult.img_url_asset,
                        birthYr: nameResult.BirthYear,
                        deathYr: nameResult.DeathYear,
                        profession: nameResult.primaryProfession
                    };
                    returnObjects.push(nameObject);
                }
            } catch (error) {
                console.error('Error creating object', error);
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
        console.warn('titleID is null');
        return returnObjects;
    }

};


exports.getTitlePrincipalsObjects = async (connection, titleID) => {
    const contributors = await fetchContributors(connection, titleID);

    const filteredContributors = contributors.filter(contributor => 
        contributor.category !== 'director' && contributor.category !== 'writer'
    );

    return filteredContributors;
};