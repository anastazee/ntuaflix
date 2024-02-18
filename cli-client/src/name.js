// const axios = require('axios');
// const https = require('https'); 
// const util = require('util');

import axios from 'axios';
import https from 'https';
import util from 'util';
import httpsAgent from '../httpsAgent.js';

export default async function name(options) {
    try {
        const nameID = options.nameid;
        const format = options.format || '';
        const response = await axios.get(`https://localhost:9876/ntuaflix_api/name/${nameID}?format=${format}`, {
            httpsAgent: httpsAgent});

        const nameObject = response.data;
        if (!format || format.toLowerCase() == 'json') 
            console.log(JSON.stringify(nameObject, null, 2));
        else
            console.log(nameObject);
        /*console.log(`nameID:`, nameObject.nameID);
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
        }*/
    } catch (error) {
        console.error('Error:', error.message);
    }
}