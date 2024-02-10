import https from 'https'; 
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const certPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/server.crt');
const keyPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/server.key');
const caPath = path.join(__dirname, '../../softeng23-07/back-end/sslcert/rootCA.pem');


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