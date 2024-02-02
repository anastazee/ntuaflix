#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const { printTabularCSV } = require('./printTabularCSV');
program
    .version('1.0.0')
    .description('CLI for Ntuaflix app');

program
    .command('healthcheck')
    .description('Check connectivity to the Ntuaflix server and database')
    .action(async () => {
        try {
            // Make an HTTP request to your API
            const response = await axios.get('http://localhost:9876/admin/healthcheck');
            if (response.status === 200) {
                console.log(response.data.dataconnection);
            }
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error('Error: Unable to connect to the server. Please check your internet connection or server availability.');
            }
            else {
                console.error('Error:', error.message);
            }
        }
    });

program
    .command('newtitles')
    .description('Add new titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action(async (options) => {
        try {
            const { filename } = options;

            // Read the file content
            const fileContent = fs.readFileSync(filename, 'utf-8');
            const basename = path.basename(filename);  // Extract the filename from the filepath
            const formData = new FormData();

            // Append the file with Content-Disposition
            formData.append('file', fileContent, {
                filename: basename,
                contentType: 'text/tab-separated-values',
            });

            const headers = {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            };

            const response = await axios.post('http://localhost:9876/admin/upload/titlebasics', formData, { headers });

            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });


program
    .command('newakas')
    .description('Add new Akas of titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action(async (options) => {
        try {
            const { filename } = options;

            // Read the file content
            const fileContent = fs.readFileSync(filename, 'utf-8');
            const basename = path.basename(filename);  // Extract the filename from the filepath
            const formData = new FormData();

            // Append the file with Content-Disposition
            formData.append('file', fileContent, {
                filename: basename,
                contentType: 'text/tab-separated-values',
            });

            const headers = {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            };

            const response = await axios.post('http://localhost:9876/admin/upload/titleakas', formData, { headers });

            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });


program
    .command('newnames')
    .description('Add new Contributors to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action(async (options) => {
        try {
            const { filename } = options;

            // Read the file content
            const fileContent = fs.readFileSync(filename, 'utf-8');
            const basename = path.basename(filename);  // Extract the filename from the filepath
            const formData = new FormData();

            // Append the file with Content-Disposition
            formData.append('file', fileContent, {
                filename: basename,
                contentType: 'text/tab-separated-values',
            });

            const headers = {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            };

            const response = await axios.post('http://localhost:9876/admin/upload/namebasics', formData, { headers });

            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });


program
    .command('newcrew')
    .description('Add new crew members of titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action(async (options) => {
        try {
            const { filename } = options;

            // Read the file content
            const fileContent = fs.readFileSync(filename, 'utf-8');
            const basename = path.basename(filename);  // Extract the filename from the filepath
            const formData = new FormData();

            // Append the file with Content-Disposition
            formData.append('file', fileContent, {
                filename: basename,
                contentType: 'text/tab-separated-values',
            });

            const headers = {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            };

            const response = await axios.post('http://localhost:9876/admin/upload/titlecrew', formData, { headers });

            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });


program
    .command('newepisode')
    .description('Add new episode titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action(async (options) => {
        try {
            const { filename } = options;

            // Read the file content
            const fileContent = fs.readFileSync(filename, 'utf-8');
            const basename = path.basename(filename);  // Extract the filename from the filepath
            const formData = new FormData();

            // Append the file with Content-Disposition
            formData.append('file', fileContent, {
                filename: basename,
                contentType: 'text/tab-separated-values',
            });

            const headers = {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            };

            const response = await axios.post('http://localhost:9876/admin/upload/titleepisode', formData, { headers });

            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });


program
    .command('newprincipals')
    .description('Add new principals to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action(async (options) => {
        try {
            const { filename } = options;

            // Read the file content
            const fileContent = fs.readFileSync(filename, 'utf-8');
            const basename = path.basename(filename);  // Extract the filename from the filepath
            const formData = new FormData();

            // Append the file with Content-Disposition
            formData.append('file', fileContent, {
                filename: basename,
                contentType: 'text/tab-separated-values',
            });

            const headers = {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            };

            const response = await axios.post('http://localhost:9876/admin/upload/titleprincipals', formData, { headers });

            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });


program
    .command('newratings')
    .description('Add new Akas of titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action(async (options) => {
        try {
            const { filename } = options;

            // Read the file content
            const fileContent = fs.readFileSync(filename, 'utf-8');
            const basename = path.basename(filename);  // Extract the filename from the filepath
            const formData = new FormData();

            // Append the file with Content-Disposition
            formData.append('file', fileContent, {
                filename: basename,
                contentType: 'text/tab-separated-values',
            });

            const headers = {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            };

            const response = await axios.post('http://localhost:9876/admin/upload/titleratings', formData, { headers });

            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

program
    .command('resetall')
    .description('Delete all data in Ntuaflix database')
    .action(async (options) => {
        try {

            const response = await axios.post('http://localhost:9876/admin/resetall');

            console.log('Success: All data deleted successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error:', error.response.data.status, '\nReason:', error.response.data.reason);
            } else {
                console.error('Error:', error.message);
            }
        }
    });


program
    .command('title')
    .description('Get details for a specific title from the Ntuaflix database')
    .requiredOption('--titleID <titleID>', 'ID of the title')
    .option('--format <format>', 'Type of output (json/csv). Default: json')
    .action(async (options) => {
        try {
            const titleID = options.titleID;
            const format = options.format || '';
            /*if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
                    console.error('Error: Invalid format type. Please use "json" or "csv".');
            }*/
            const response = await axios.get(`http://localhost:9876/title/${titleID}?format=${format}`);
            if (format.toLowerCase() == 'csv') {
                console.log("work in progress");
                    //printTabularCSV(response.data);
            }
            const titleObject = response.data.data;
            if (!format || format.toLowerCase() == 'json') {
                console.log(`titleID:`, titleObject.titleID);
                console.log(`type:`, titleObject.type || 'N/A');
                console.log(`originalTitle:`, titleObject.originalTitle || 'N/A');
                console.log(`titlePoster:`, titleObject.titlePoster || 'N/A');
                console.log(`startYear:`, titleObject.startYear || 'N/A');
                console.log(`endYear:`, titleObject.endYear || 'N/A');
                //console.log(`genres:`, titleObject.genres || 'N/A');
                console.log('Genres:', titleObject.genres && Array.isArray(titleObject.genres)
                    ? titleObject.genres.map(obj => obj && obj.genreTitle).filter(Boolean).join(', ')
                    : 'N/A');
                //console.log(`titleAkas:`, titleObject.titleAkas.map(item => ({ akaTitle: item[0], regionAbbrev: item[1] })));
                console.log('Title Akas:');
                if (titleObject.titleAkas && titleObject.titleAkas.length > 0) {
                    for (const aka of titleObject.titleAkas) {
                        console.log(`   aka Title: ${aka.akaTitle || 'N/A'}`);
                        console.log(`   Region: ${aka.regionAbbrev || 'N/A'}`);
                        console.log('------------------------');
                    }
                }
                //console.log(`principals:`, titleObject.principals.map(item => ({ nameID: item[0], name: item[1], category: item[2] })));
                console.log('Principals:');
                if (titleObject.principals && titleObject.principals.length > 0) {
                    for (const principal of titleObject.principals) {
                        console.log(`  ID: ${principal.nameID || 'N/A'}`);
                        console.log(`  Name: ${principal.name || 'N/A'}`);
                        console.log(`  Profession: ${principal.category || 'N/A'}`);
                        console.log('------------------------');
                    }
                } else {
                    console.log('  N/A');
                }
                //console.log(`rating:`, titleObject.rating);
                console.log('Rating:');
                console.log(`  Average Rating: ${titleObject.rating ? titleObject.rating.avRating : 'N/A'}`);
                console.log(`  Number of Votes: ${titleObject.rating ? titleObject.rating.nVotes : 'N/A'}`);
            } 
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

program
    .command('name')
    .description('Get details for a specific contributor from the Ntuaflix database')
    .requiredOption('--nameID <nameID>', 'ID of the name')
    .action(async (options) => {
        try {
            const nameID = options.nameID;

            const response = await axios.get(`http://localhost:9876/name/${nameID}`);

            const nameObject = response.data.data;

            console.log(`nameID:`, nameObject.nameID);
            console.log(`name:`, nameObject.name);
            console.log(`namePoster:`, nameObject.namePoster || 'N/A');
            console.log(`birthYr:`, nameObject.birthYr || 'N/A');
            console.log(`deathYr:`, nameObject.deathYr || 'N/A');
            console.log(`profession:`, nameObject.profession || 'N/A');
            //console.log(`nameTitles:`, nameObject.nameTitles.map(item => ({ titleID: item[0], category: item[1] })));
            console.log('Name Titles:');
            if (nameObject.nameTitles && nameObject.nameTitles.length > 0) {
                for (const title of nameObject.nameTitles) {
                    console.log(`   Title ID: ${title.titleID || 'N/A'}`);
                    console.log(`   Category: ${title.category || 'N/A'}`);
                    console.log('------------------------');
                }
            } else {
                console.log('  N/A');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

program
    .command('searchtitle')
    .description('Search for a title in the Ntuaflix database that matches parameter')
    .requiredOption('--titlePart <titlePart>', 'word or consecutive characters to search for')
    .action(async (options) => {
        try {
            const title = options.titlePart;

            const response = await axios.post(`http://localhost:9876/searchtitle`, {
                "titlePart": title,
            });
            const titleObjects = response.data.data;
            if (response.status == 204) {
                console.log('No title matches your data');
                return;
            }
            //console.log(titleObjects);
            for (const titleObject of titleObjects) {
                console.log('Title ID:', titleObject.titleID || 'N/A');
                console.log('Type:', titleObject.type || 'N/A');
                console.log('Original Title:', titleObject.originalTitle || 'N/A');
                console.log('Title Poster:', titleObject.titlePoster || 'N/A');
                console.log('Start Year:', titleObject.startYear || 'N/A');
                console.log('End Year:', titleObject.endYear || 'N/A');
                //console.log('Genres:', titleObject.genres ? titleObject.genres.map(obj => obj.genreTitle).join(', ') : 'N/A');
                console.log('Genres:', titleObject.genres && Array.isArray(titleObject.genres)
                    ? titleObject.genres.map(obj => obj && obj.genreTitle).filter(Boolean).join(', ')
                    : 'N/A');

                // Format Title Akas with spaces
                console.log('Title Akas:');
                if (titleObject.titleAkas && titleObject.titleAkas.length > 0) {
                    for (const aka of titleObject.titleAkas) {
                        console.log(`   aka Title: ${aka.akaTitle || 'N/A'}`);
                        console.log(`   Region: ${aka.regionAbbrev || 'N/A'}`);
                        console.log('------------------------');
                    }
                }

                // Format Principals
                console.log('Principals:');
                if (titleObject.principals && titleObject.principals.length > 0) {
                    for (const principal of titleObject.principals) {
                        console.log(`  ID: ${principal.nameID || 'N/A'}`);
                        console.log(`  Name: ${principal.name || 'N/A'}`);
                        console.log(`  Profession: ${principal.category || 'N/A'}`);
                        console.log('------------------------');
                    }
                } else {
                    console.log('  N/A');
                }

                // Format the rating information
                console.log('Rating:');
                console.log(`  Average Rating: ${titleObject.rating ? titleObject.rating.avRating : 'N/A'}`);
                console.log(`  Number of Votes: ${titleObject.rating ? titleObject.rating.nVotes : 'N/A'}`);

                console.log('----------------------------------');
            }



        }
        catch (error) {
            console.error('Error:', error.message);
        }
    });

program
    .command('searchname')
    .description('Search for an actor in the Ntuaflix database that matches the provided name')
    .requiredOption('--namePart <namePart>', 'word or consecutive characters to search for')
    .action(async (options) => {
        try {
            const namePart = options.namePart;

            const response = await axios.post(`http://localhost:9876/searchname`, {
                "namePart": namePart,
            });
            const nameObjects = response.data.data;
            if (response.status == 204) {
                console.log('No contributor matches your data');
                return;
            }
            for (const nameObject of nameObjects) {
                console.log('Name ID:', nameObject.nameID || 'N/A');
                console.log('Name:', nameObject.name || 'N/A');
                console.log('Name Poster:', nameObject.namePoster || 'N/A');
                console.log('Birth Year:', nameObject.birthYr || 'N/A');
                console.log('Death Year:', nameObject.deathYr || 'N/A');
                console.log('Profession:', nameObject.profession || 'N/A');

                // Format Name Titles
                console.log('Name Titles:');
                if (nameObject.nameTitles && nameObject.nameTitles.length > 0) {
                    for (const title of nameObject.nameTitles) {
                        console.log(`   Title ID: ${title.titleID || 'N/A'}`);
                        console.log(`   Category: ${title.category || 'N/A'}`);
                        console.log('------------------------');
                    }
                } else {
                    console.log('  N/A');
                }

                console.log('----------------------------------');
            }

        } catch (error) {
            console.error('Error:', error.message);
        }
    });

program
    .command('bygenre')
    .description('Get details for titles with a specific genre and minimun rating from the Ntuaflix database')
    .requiredOption('--genre <qgenre>', 'Genre of the title')
    .requiredOption('--min <minrating>', 'Minimum rating of the title')
    .option('--from <yrFrom>', 'Optional: Release year from')
    .option('--to <yrTo>', 'Optional: Release year to')
    .action(async (options) => {
        try {
            const qgenre = options.genre;
            const minrating = options.min;
            const yrFrom = options.from;
            const yrTo = options.to;

            const param = {
                qgenre: qgenre,
                minrating: minrating,
            };

            if (yrFrom) {
                param.yrFrom = yrFrom;
            }

            if (yrTo) {
                param.yrTo = yrTo;
            }

            const response = await axios.post(`http://localhost:9876/bygenre`, param);

            const titleObjects = response.data.data;
            for (const titleObject of titleObjects) {
                console.log(`\nTitle ID:`, titleObject.titleID);
                console.log(`Type:`, titleObject.type || 'N/A');
                console.log(`Original Title:`, titleObject.originalTitle || 'N/A');
                console.log(`Title Poster:`, titleObject.titlePoster || 'N/A');
                console.log(`Start Year:`, titleObject.startYear || 'N/A');
                console.log(`End Year:`, titleObject.endYear || 'N/A');
                console.log('Genres:', titleObject.genres && Array.isArray(titleObject.genres)
                    ? titleObject.genres.map(obj => obj && obj.genreTitle).filter(Boolean).join(', ')
                    : 'N/A');
                console.log('Title Akas:');
                if (titleObject.titleAkas && titleObject.titleAkas.length > 0) {
                    for (const aka of titleObject.titleAkas) {
                        console.log(`   aka Title: ${aka.akaTitle || 'N/A'}`);
                        console.log(`   Region: ${aka.regionAbbrev || 'N/A'}`);
                        console.log('------------------------');
                    }
                }
                console.log('Principals:');
                if (titleObject.principals && titleObject.principals.length > 0) {
                    for (const principal of titleObject.principals) {
                        console.log(`  ID: ${principal.nameID || 'N/A'}`);
                        console.log(`  Name: ${principal.name || 'N/A'}`);
                        console.log(`  Profession: ${principal.category || 'N/A'}`);
                        console.log('------------------------');
                    }
                } else {
                    console.log('  N/A');
                }
                console.log('Rating:');
                console.log(`  Average Rating: ${titleObject.rating ? titleObject.rating.avRating : 'N/A'}`);
                console.log(`  Number of Votes: ${titleObject.rating ? titleObject.rating.nVotes : 'N/A'}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

program.parse(process.argv);
