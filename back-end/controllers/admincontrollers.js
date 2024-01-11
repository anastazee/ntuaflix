const { pool } = require('../utils/database');
const { Transform, Readable } = require('stream'); // Add Readable import
const processLineTitle = require('../middlewares/connections-queries').processLineTitle;
const getConnectionAsync = require('../middlewares/connections-queries').getConnectionAsync;
const mysql = require('mysql2');

exports.getSample = (req, res, next) => {
    res.status(200).json({ message: 'Hello World!' });
};

exports.getSampleById = (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({ message: `Hello World! ${id}` });
};

exports.postSample = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    if (!body.name) return res.status(400).json({ message: 'Name body param is required' });
    res.status(200).json({ message: `Hello World! ${id}`, body });
};

exports.getHealthCheck = async (req, res) => {
    try {
        // Attempt to get a connection from the pool
        const connection = await getConnectionAsync();

        // Check if the connection is valid
        if (connection) {
            res.status(200).json({ status: 'OK', dataconnection: 'Database connection OK' });

            // Release the connection back to the pool
            connection.release();
        } else {
            res.status(500).json({ status: 'Failed', dataconnection: 'Faulty connection' });
        }
    } catch (error) {
        res.status(500).json({ status: 'Failed', dataconnection: 'Error connecting to the database' });
    }
};


exports.postTitleBasics = async (req, res, next) => {
    try {
        const tsvBuffer = req.file.buffer.toString('utf-8');
        let fieldNames = '';
        const transformStream = new Transform({
            remainingLine: '', 
            async transform(chunk, encoding, callback) {
                const chunkString = chunk.toString();
                let linesArray = chunkString.split(/\r?\n/);
                if (!fieldNames) {
                    fieldNames = linesArray.shift().split('\t');
                }
            
                let firstLine = this.remainingLine ? this.remainingLine + linesArray.shift() : linesArray.shift();
                let lines = [firstLine, ...linesArray];

                this.remainingLine = lines.pop();
                
                console.log('Chunk:', chunkString);
                console.log('Lines:', lines);
                console.log('Remaining Line:', this.remainingLine);
                console.log('Field Names:', fieldNames);

                try {
                    // Start a connection for adding data line by line
                    this.connection = await getConnectionAsync(); // Store the connection in the transformStream

                    for (const line of lines) {
                        await processLineTitle(line, this.connection, fieldNames); // Pass the connection object
                    }

                    callback();
                } catch (err) {
                    console.error('Error in transform:', err);
                    callback(err);
                }
            },
            flush(callback) {
                if (this.remainingLine) {
                    processLineTitle(this.remainingLine, this.connection, fieldNames); // Use the stored connection
                }
                this.connection.release();
                callback();
            },
        });

        // Pipe the TSV content through the transform stream
        const tsvStream = new Readable();
        tsvStream.push(tsvBuffer);
        tsvStream.push(null);

        tsvStream.pipe(transformStream).on('finish', () => {
            res.status(200).json({ message: 'Data added successfully' });
        });
    } catch (err) {
        console.error('Error in postTitleBasics:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


