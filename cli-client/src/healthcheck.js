import axios from 'axios';
import https from 'https';
import httpsAgent from '../httpsAgent.js';

export default async function healthcheck() {
    try {
        // Make an HTTP request to your API
        const response = await axios.get('https://localhost:9876/ntuaflix_api/admin/healthcheck', {
            httpsAgent: httpsAgent});
            const output = response.data.dataconnection;
            console.log(output);
            return output;
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('Error: Unable to connect to the server. Please check your internet connection or server availability.');
        }
        else {
            console.error('Error:', error.message);
        }
    }
    
}