require('dotenv').config();
const app = require('./app');
const fs = require('fs');
const http = require('http');
const https = require('https');

//const PORT = process.env.PORT || 6789;
const PORT = process.env.PORT || 9876;


const privateKey = fs.readFileSync('./sslcert/server.key');
const certificate = fs.readFileSync('./sslcert/server.crt');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);
//httpsServer.listen(PORT, () => console.log(`HTTPS Server running on port ${PORT}!`));

//var httpServer = http.createServer(app);

httpsServer.listen(PORT, () => console.log(`HTTPS Server running on port ${PORT}!`));