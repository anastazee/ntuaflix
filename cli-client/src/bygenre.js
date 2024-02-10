import axios from 'axios';
import httpsAgent from '../httpsAgent.js';
import util from 'util';

export default async function bygenre(options) {
    try {
        const qgenre = options.genre;
        const minrating = options.min;
        const yrFrom = options.from;
        const yrTo = options.to;
        const format = options.format || '';

        const param = {
            qgenre: qgenre,
            minrating: minrating,
        };

        if (yrFrom) {
            param.yrFrom = yrFrom;
        }

        if (yrTo) {
            param.yrTo = yrTo;
        }

        const response = await axios.get(`https://localhost:9876/bygenre?format=${format}`, {
            data: param,
            httpsAgent: httpsAgent
        });

        const titleObjects = response.data;
        if (response.status == 204) {
            console.log('No title matches your search');
            return;
        }
        if (!format || format.toLowerCase() == 'json') 
        console.log(util.inspect(titleObjects, {depth: null, maxArrayLength: null, maxStringLength: null}));
        else
        console.log(titleObjects);

        /*for (const titleObject of titleObjects) {
            console.log(`\nTitle ID:`, titleObject.titleID);
            console.log(`Type:`, titleObject.type || 'N/A');
            console.log(`Original Title:`, titleObject.originalTitle || 'N/A');
            console.log(`Title Poster:`, titleObject.titlePoster || 'N/A');
            console.log(`Start Year:`, titleObject.startYear || 'N/A');
            console.log(`End Year:`, titleObject.endYear || 'N/A');
            console.log('Genres:', titleObject.genres && Array.isArray(titleObject.genres)
                ? titleObject.genres.map(obj => obj && obj.genreTitle).filter(Boolean).join(', ')
                : 'N/A');
            console.log('Title Akas:');
            if (titleObject.titleAkas && titleObject.titleAkas.length > 0) {
                for (const aka of titleObject.titleAkas) {
                    console.log(`   aka Title: ${aka.akaTitle || 'N/A'}`);
                    console.log(`   Region: ${aka.regionAbbrev || 'N/A'}`);
                    console.log('------------------------');
                }
            }
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
            console.log('Rating:');
            console.log(`  Average Rating: ${titleObject.rating ? titleObject.rating.avRating : 'N/A'}`);
            console.log(`  Number of Votes: ${titleObject.rating ? titleObject.rating.nVotes : 'N/A'}`);
        }*/
    } catch (error) {
        console.error('Error:', error.message);
    }
}