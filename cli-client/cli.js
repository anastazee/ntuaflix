#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

program
    .version('1.0.0')
    .description('CLI for Your API');

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


program.parse(process.argv);
