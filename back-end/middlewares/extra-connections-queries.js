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

}