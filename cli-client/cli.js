#!/usr/bin/env node
import { program } from 'commander';
//import { printTabularCSV } from './printTabularCSV';
import  healthcheck from './src/healthcheck.js';
import  title from './src/title.js';
import  name from './src/name.js';
import  searchname from './src/searchname.js';
import  searchtitle from './src/searchtitle.js';
import  bygenre from './src/bygenre.js';
import  newtitles from './src/newtitles.js';
import  resetall from './src/resetall.js';
import  newnames from './src/newnames.js';
import  newakas from './src/newakas.js';
import  newcrew from './src/newcrew.js';
import  newepisode from './src/newepisode.js';
import  newprincipals from './src/newprincipals.js';
import  newratings from './src/newratings.js';

program
    .version('1.0.0')
    .description('CLI for Ntuaflix app');


program
    .command('healthcheck')
    .description('Check connectivity to the Ntuaflix server and database')
    .action(() => healthcheck());

program
    .command('newtitles')
    .description('Add new titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action((options) => newtitles(options));


program
    .command('newakas')
    .description('Add new Akas of titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action((options) => newakas(options));


program
    .command('newnames')
    .description('Add new Contributors to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action((options) => newnames(options));

program
    .command('newcrew')
    .description('Add new crew members of titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action((options) => newcrew(options));


program
    .command('newepisode')
    .description('Add new episode titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action((options) => newepisode(options));


program
    .command('newprincipals')
    .description('Add new principals to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action((options) => newprincipals(options));


program
    .command('newratings')
    .description('Add new Akas of titles to the Ntuaflix database')
    .requiredOption('--filename <filepath>', 'Path to the file')
    .action((options) => newratings(options));

program
    .command('resetall')
    .description('Delete all data in Ntuaflix database')
    .action(() => resetall());


program
    .command('title')
    .description('Get details for a specific title from the Ntuaflix database')
    .requiredOption('--titleID <titleID>', 'ID of the title')
    .option('--format <format>', 'Type of output (json/csv). Default: json')
    .action((options) => title(options));

program
    .command('name')
    .description('Get details for a specific contributor from the Ntuaflix database')
    .requiredOption('--nameid <nameid>', 'ID of the name')
    .option('--format <format>', 'Type of output (json/csv). Default: json')
    .action((options) => name(options));

program
    .command('searchtitle')
    .description('Search for a title in the Ntuaflix database that matches parameter')
    .requiredOption('--titlepart <titlePart>', 'word or consecutive characters to search for')
    .option('--format <format>', 'Type of output (json/csv). Default: json')
    .action((options) => searchtitle(options));

program
    .command('searchname')
    .description('Search for an actor in the Ntuaflix database that matches the provided name')
    .requiredOption('--namepart <namePart>', 'word or consecutive characters to search for')
    .option('--format <format>', 'Type of output (json/csv). Default: json')
    .action((options) => searchname(options));

program
    .command('bygenre')
    .description('Get details for titles with a specific genre and minimun rating from the Ntuaflix database')
    .requiredOption('--genre <qgenre>', 'Genre of the title')
    .requiredOption('--min <minrating>', 'Minimum rating of the title')
    .option('--from <yrFrom>', 'Optional: Release year from')
    .option('--to <yrTo>', 'Optional: Release year to')
    .option('--format <format>', 'Type of output (json/csv). Default: json')
    .action((options) => bygenre(options));

program.parse(process.argv);