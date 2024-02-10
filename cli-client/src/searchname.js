import axios from 'axios';
import https from 'https';
import util from 'util';
import httpsAgent from '../httpsAgent.js';

export default async function searchname(options) {
    try {
        const namePart = options.namepart;
        const format = options.format || '';
        const response = await axios.get(`https://localhost:9876/searchname?format=${format}`, {
            data: {
                namePart: namePart,
            },
            httpsAgent: httpsAgent
        });
        const nameObjects = response.data;
        if (response.status == 204) {
            console.log('No contributor matches your data');
            return;
        }
        if (!format || format.toLowerCase() == 'json') 
        console.log(util.inspect(nameObjects, {depth: null, maxArrayLength: null, maxStringLength: null}));
        else
        console.log(nameObjects);

        /*for (const nameObject of nameObjects) {
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
        }*/

    } catch (error) {
        console.error('Error:', error.message);
    }
}