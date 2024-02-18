// const axios = require('axios');
// const https = require('https'); 
// const util = require('util');

import axios from 'axios';
import https from 'https';
import util from 'util';
import httpsAgent from '../httpsAgent.js';

export default async function title(options) {
try {
    const titleID = options.titleID;
    const format = options.format || '';
    /*if (format && format.toLowerCase() !== 'csv' && format.toLowerCase() !== 'json') {
            console.error('Error: Invalid format type. Please use "json" or "csv".');
    }*/
    const response = await axios.get(`https://localhost:9876/ntuaflix_api/title/${titleID}?format=${format}`, {
        httpsAgent: httpsAgent});
    
    const titleObject = response.data;
    if (format.toLowerCase() == 'csv') {
        console.log(titleObject);
        //console.log("work in progress");
            //printTabularCSV(response.data);
    }
    else  console.log(JSON.stringify(titleObject, null, 2));
    
    /*if (!format || format.toLowerCase() == 'json') {
       console.log(`titleID:`, titleObject.titleID);
        console.log(`type:`, titleObject.type || 'N/A');
        console.log(`originalTitle:`, titleObject.originalTitle || 'N/A');
        console.log(`titlePoster:`, titleObject.titlePoster || 'N/A');
        console.log(`startYear:`, titleObject.startYear || 'N/A');
        console.log(`endYear:`, titleObject.endYear || 'N/A');
        //console.log(`genres:`, titleObject.genres || 'N/A');
        console.log('Genres:', titleObject.genres && Array.isArray(titleObject.genres)
            ? titleObject.genres.map(obj => obj && obj.genreTitle).filter(Boolean).join(', ')
            : 'N/A');
        //console.log(`titleAkas:`, titleObject.titleAkas.map(item => ({ akaTitle: item[0], regionAbbrev: item[1] })));
        console.log('Title Akas:');
        if (titleObject.titleAkas && titleObject.titleAkas.length > 0) {
            for (const aka of titleObject.titleAkas) {
                console.log(`   aka Title: ${aka.akaTitle || 'N/A'}`);
                console.log(`   Region: ${aka.regionAbbrev || 'N/A'}`);
                console.log('------------------------');
            }
        }
        //console.log(`principals:`, titleObject.principals.map(item => ({ nameID: item[0], name: item[1], category: item[2] })));
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
        //console.log(`rating:`, titleObject.rating);
        console.log('Rating:');
        console.log(`  Average Rating: ${titleObject.rating ? titleObject.rating.avRating : 'N/A'}`);
        console.log(`  Number of Votes: ${titleObject.rating ? titleObject.rating.nVotes : 'N/A'}`);
    } */
    
} catch (error) {
    console.error('Error:', error.message);
}
}