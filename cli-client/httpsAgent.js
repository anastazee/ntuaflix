import https from 'https'; 
import fs from 'fs';
import path from 'path';

/*
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const certPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/server.crt');
const keyPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/server.key');
const caPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/rootCA.pem');
*/

// const certPath = '../back-end/sslcert/server.crt';
// const keyPath = '../back-end/sslcert/server.key';
// const caPath = '../back-end/sslcert/rootCA.pem';

const url = new URL(import.meta.url);
const pathname = url.pathname;
const isWindows = process.platform === 'win32';
const __dirname = isWindows ? path.dirname(pathname.replace(/^\//, '')) : path.dirname(pathname);

const certPath = path.join(__dirname, '../../softeng23-07/sslcert/server.crt');
const keyPath = path.join(__dirname, '../../softeng23-07/sslcert/server.key');
const caPath = path.join(__dirname, '../../softeng23-07/sslcert/rootCA.pem');


// const url = new URL(import.meta.url);
// const pathname = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
// const __dirname = path.dirname(pathname);

// const certPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/server.crt');
// const keyPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/server.key');
// const caPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/rootCA.pem');


const httpsAgent = new https.Agent({
    rejectUnauthorized: true, 
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    ca: fs.readFileSync(caPath),
});

// const httpsAgent = new https.Agent({
//     rejectUnauthorized: false, 
// });

export default httpsAgent;