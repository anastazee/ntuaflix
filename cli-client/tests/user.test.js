import axios from 'axios';
import title from '../src/title.js';
import name from '../src/name.js';
import searchtitle from '../src/searchtitle.js';
import searchname from '../src/searchname.js';
import bygenre from '../src/bygenre.js';

import { jest } from '@jest/globals';
jest.mock('axios');
axios.get = jest.fn();

describe('Title Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });

    it('should fetch title details in JSON format', async () => {
        const fakeResponse = { data: { title: 'Fake Title' } };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            titleID: '123',
            format: 'json'
        };

        await title(options);
        const expected = { title: 'Fake Title' }; // Define expected JSON object
        const received = JSON.parse(consoleSpy.mock.calls[0][0]);

        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/title/123?format=json');
        //expect(consoleSpy).toHaveBeenCalledWith("{ \"title\": \"Fake Title\" }");
        expect(received).toEqual(expected);
    });

    it('should fetch title details in CSV format', async () => {
        const fakeResponse = { data: 'CSV data' };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            titleID: '456',
            format: 'csv'
        };

        await title(options);

        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/title/456?format=csv');
        expect(consoleSpy).toHaveBeenCalledWith("CSV data");
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = 'Error fetching data';
        axios.get.mockRejectedValue(new Error(errorMessage));
        const consoleSpy = jest.spyOn(console, 'error');
        const options = {
            titleID: '789',
            format: 'json'
        };
        await title(options);
        expect(consoleSpy).toHaveBeenCalledWith("Error:", errorMessage);
    });
 });


 describe('Name Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });

    it('should fetch name details in JSON format', async () => {
        const fakeResponse = { data: { name: 'Fake Name' } };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            nameid: '123',
            format: 'json'
        };

        await name(options);

        const expected = { name: 'Fake Name'}
        const received = JSON.parse(consoleSpy.mock.calls[0][0]);
        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/name/123?format=json');
        //expect(consoleSpy).toHaveBeenCalledWith("{ name: 'Fake Name' }");
        expect(received).toEqual(expected);
    });

    it('should fetch name details in CSV format', async () => {
        const fakeResponse = { data: 'CSV data' };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            nameid: '456',
            format: 'csv'
        };

        await name(options);

        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/name/456?format=csv');
        expect(consoleSpy).toHaveBeenCalledWith("CSV data");
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = 'Error fetching data';
        axios.get.mockRejectedValue(new Error(errorMessage));
        const consoleSpy = jest.spyOn(console, 'error');
        const options = {
            nameid: '789',
            format: 'json'
        };
        await name(options);
        expect(consoleSpy).toHaveBeenCalledWith("Error:", errorMessage);
    });
 });


 describe('Search Name Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });

    it('should fetch nameObject list in JSON format', async () => {
        const fakeResponse = { data: [{ name: 'Fake Name 1' }, { name: 'Fake Name 2'}] };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            format: 'json',
            namepart: 'fake'
        };
        const requestBody = {
            namePart: 'fake'
        };
        await searchname(options); // Pass the requestBody as an argument

        const expected = [{ name: 'Fake Name 1' }, { name: 'Fake Name 2'}];
        const received = JSON.parse(consoleSpy.mock.calls[0][0]);

        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/searchname?format=json'); // Check the URL
        expect(axios.get.mock.calls[0][1].data).toEqual(requestBody); // Check the request body
        expect(received).toEqual(expected);
    });

    it('should fetch nameObjects in CSV format', async () => {
        const fakeResponse = { data: 'CSV data' };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            format: 'csv',
            namepart: 'fake'
        };
        const requestBody = {
            namePart: 'fake'
        };
        await searchname(options); // Pass the requestBody as an argument
        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/searchname?format=csv'); // Check the URL
        expect(axios.get.mock.calls[0][1].data).toEqual(requestBody);
        expect(consoleSpy).toHaveBeenCalledWith("CSV data");
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = 'Error fetching data';
        axios.get.mockRejectedValue(new Error(errorMessage));
        const consoleSpy = jest.spyOn(console, 'error');
        const options = {
            format: 'json',
            namepart: 'fake'
        };
        await name(options);
        expect(consoleSpy).toHaveBeenCalledWith("Error:", errorMessage);
    });
 });

 describe('Search Title Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });

    it('should fetch titleObject list in JSON format', async () => {
        const fakeResponse = { data: [{ title: 'Fake Title 1' }, { title: 'Fake Title 2'}] };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            format: 'json',
            titlepart: 'fake'
        };
        const requestBody = {
            titlePart: 'fake'
        };
        await searchtitle(options); // Pass the requestBody as an argument
        const expected = [{ title: 'Fake Title 1' }, { title: 'Fake Title 2'}];
        const received = JSON.parse(consoleSpy.mock.calls[0][0]);
        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/searchtitle?format=json'); // Check the URL
        expect(axios.get.mock.calls[0][1].data).toEqual(requestBody); // Check the request body
        expect(received).toEqual(expected);
    });

    it('should fetch titleObjects in CSV format', async () => {
        const fakeResponse = { data: 'CSV data' };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            format: 'csv',
            titlepart: 'fake'
        };
        const requestBody = {
            titlePart: 'fake'
        };
        await searchtitle(options); // Pass the requestBody as an argument
        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/searchtitle?format=csv'); // Check the URL
        expect(axios.get.mock.calls[0][1].data).toEqual(requestBody);
        expect(consoleSpy).toHaveBeenCalledWith("CSV data");
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = 'Error fetching data';
        axios.get.mockRejectedValue(new Error(errorMessage));
        const consoleSpy = jest.spyOn(console, 'error');
        const options = {
            format: 'json',
            titlepart: 'fake'
        };
        await title(options);
        expect(consoleSpy).toHaveBeenCalledWith("Error:", errorMessage);
    });
 });


 describe('By Genre Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });

    it('should fetch titleObject list in JSON format (use all parameters)', async () => {
        const fakeResponse = { data: [{ title: 'Fake Title 1' }, { title: 'Fake Title 2'}] };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            format: 'json',
            genre: 'fake',
            min: 'x',
            from: 'y',
            to: 'z'
        };
        const requestBody = {
            qgenre: 'fake',
            minrating: 'x',
            yrFrom: 'y',
            yrTo: 'z'
        };
        await bygenre(options); // Pass the requestBody as an argument
        const expected = [{ title: 'Fake Title 1' }, { title: 'Fake Title 2'}];
        const received = JSON.parse(consoleSpy.mock.calls[0][0]);
        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/bygenre?format=json'); // Check the URL
        expect(axios.get.mock.calls[0][1].data).toEqual(requestBody); // Check the request body
        expect(received).toEqual(expected);
    });

    it('should fetch titleObjects in CSV format (use mandatory parameters', async () => {
        const fakeResponse = { data: 'CSV data' };
        axios.get.mockResolvedValue(fakeResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        const options = {
            format: 'csv',
            genre: 'fake',
            min: 'x'
        };
        const requestBody = {
            qgenre: 'fake',
            minrating: 'x',
        };
        await bygenre(options); // Pass the requestBody as an argument
        expect(axios.get.mock.calls[0][0]).toBe('https://localhost:9876/ntuaflix_api/bygenre?format=csv'); // Check the URL
        expect(axios.get.mock.calls[0][1].data).toEqual(requestBody);
        expect(consoleSpy).toHaveBeenCalledWith("CSV data");
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = 'Error fetching data';
        axios.get.mockRejectedValue(new Error(errorMessage));
        const consoleSpy = jest.spyOn(console, 'error');
        const options = {
            format: 'json',
            qgenre: 'fake',
            min: 'x'
        };
        await bygenre(options);
        expect(consoleSpy).toHaveBeenCalledWith("Error:", errorMessage);
    });
 });

