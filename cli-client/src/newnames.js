import axios from 'axios';
import https from 'https'; 
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import httpsAgent from '../httpsAgent.js';

export default async function newnames(options){
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

        const response = await axios.post('https://localhost:9876/admin/upload/namebasics', formData, {
            headers: headers,
            httpsAgent: httpsAgent
        });

        console.log('Success:', response.data.message);
    } catch (error) {
        console.error('Error:', error.message);
    }
}