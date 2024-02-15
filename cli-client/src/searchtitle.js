import axios from 'axios';
import https from 'https';
import util from 'util';
import httpsAgent from '../httpsAgent.js';

export default async function searchtitle(options) {
try {
    const title = options.titlepart;
    const format = options.format || '';
    const response = await axios.get(`https://localhost:9876/searchtitle?format=${format}`, {
        data: {
            titlePart: title,
        },
        httpsAgent: httpsAgent
    });
    const titleObjects = response.data;
    if (response.status == 204) {
        console.log('No title matches your data');
        return;
    }
    if (!format || format.toLowerCase() == 'json') 
    console.log(JSON.stringify(titleObjects, null, 2));
    else
    console.log(titleObjects);
    /*
    //console.log(titleObjects);
    for (const titleObject of titleObjects) {
        console.log('Title ID:', titleObject.titleID || 'N/A');
        console.log('Type:', titleObject.type || 'N/A');
        console.log('Original Title:', titleObject.originalTitle || 'N/A');
        console.log('Title Poster:', titleObject.titlePoster || 'N/A');
        console.log('Start Year:', titleObject.startYear || 'N/A');
        console.log('End Year:', titleObject.endYear || 'N/A');
        //console.log('Genres:', titleObject.genres ? titleObject.genres.map(obj => obj.genreTitle).join(', ') : 'N/A');
        console.log('Genres:', titleObject.genres && Array.isArray(titleObject.genres)
            ? titleObject.genres.map(obj => obj && obj.genreTitle).filter(Boolean).join(', ')
            : 'N/A');

        // Format Title Akas with spaces
        console.log('Title Akas:');
        if (titleObject.titleAkas && titleObject.titleAkas.length > 0) {
            for (const aka of titleObject.titleAkas) {
                console.log(`   aka Title: ${aka.akaTitle || 'N/A'}`);
                console.log(`   Region: ${aka.regionAbbrev || 'N/A'}`);
                console.log('------------------------');
            }
        }

        // Format Principals
        console.log('Principals:');
        if (titleObject.principals && titleObject.principals.length > 0) {
            for (const principal of titleObject.principals) {
                console.log(`  ID: ${principal.nameID || 'N/A'}`);
                console.log(`  Name: ${principal.name || 'N/A'}`);
                console.log(`  Profession: ${principal.category || 'N/A'}`);
                console.log('------------------------');
            }
        } else {
            console.log('  N/A');
        }

        // Format the rating information
        console.log('Rating:');
        console.log(`  Average Rating: ${titleObject.rating ? titleObject.rating.avRating : 'N/A'}`);
        console.log(`  Number of Votes: ${titleObject.rating ? titleObject.rating.nVotes : 'N/A'}`);

        console.log('----------------------------------');
    }*/



}
catch (error) {
    console.error('Error:', error.message);
}
}