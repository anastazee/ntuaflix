import axios from 'axios';
import https from 'https';
import httpsAgent from '../httpsAgent.js';


export default async function resetall(){
    try {
        const response = await axios.post('https://localhost:9876/admin/resetall', {}, {
            httpsAgent: httpsAgent
        });
        const output = response.data.message;
        console.log(output);        
    } catch (error) {
        if (error.response && error.response.data) {
            console.error('Error:', error.response.data.status, '\nReason:', error.response.data.reason);
            
        } else {
            console.error('Error:', error.message);
            
        }
    }
}