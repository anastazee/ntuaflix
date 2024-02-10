import axios from 'axios';
import fs from 'fs';
import healthcheck from '../src/healthcheck.js';
import { jest } from '@jest/globals';

import newtitles from '../src/newtitles.js';
import newnames from '../src/newnames.js';
import resetall from '../src/resetall.js';
import newakas from '../src/newakas.js';
import newcrew from '../src/newcrew.js';
import newepisode from '../src/newepisode.js';
import newprincipals from '../src/newprincipals.js';
import newratings from '../src/newratings.js';



jest.mock('axios');
jest.mock('fs');
axios.get = jest.fn();
axios.post = jest.fn();
//fs = jest.fn();

describe('healthcheck function', () => {
    it('should return right status if server is up', async () => {
        const mockedResponse = {
            data: {
                status: 'OK', dataconnection: 'Database connection OK'
            }, 
        };
        axios.get.mockResolvedValue(mockedResponse);
        const ret = await healthcheck();

        expect(ret).toEqual('Database connection OK');
    });
});


describe('resetall function', () => {
    it('should return right status if everything deleted', async () => {
        const mockedResponse = {
            data: {
                status: 'OK', message: 'Data deleted successfully'
            }, 
        };
        axios.post.mockResolvedValue(mockedResponse);
        const consoleSpy = jest.spyOn(console, 'log');
        await resetall();
        //expect(ret).toEqual('Data deleted successfully');
        expect(consoleSpy).toHaveBeenCalledWith('Data deleted successfully');
    });
});


describe('newtitles', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('it should upload file successfully', async () => {
    const options = { filename: 'testfile.txt' };
    const fileContent = 'Test file content';
    const responseMock = { data: { message: 'File uploaded successfully' } };

    // Mock fs.readFileSync
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(fileContent);

    // Mock axios.post
    axios.post.mockResolvedValueOnce(responseMock);
    await newtitles(options);
    expect(axios.post.mock.calls[0][0]).toBe('https://localhost:9876/admin/upload/titlebasics');
    expect(newtitles(options)).resolves.not.toThrow();
  });

  it('should log error message when file does not exist', async () => {
    const options = { filename: 'example.txt' };
    const errorMessage = "ENOENT: no such file or directory, open 'example.txt'";

    axios.post.mockRejectedValue(new Error(errorMessage));

    const consoleSpy = jest.spyOn(console, 'error');

    await newtitles(options);

    expect(consoleSpy).toHaveBeenCalledWith('Error:', errorMessage);
  });
});


describe('newnames', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks before each test
    });
  
    test('it should upload file successfully', async () => {
      const options = { filename: 'testfile.txt' };
      const fileContent = 'Test file content';
      const responseMock = { data: { message: 'File uploaded successfully' } };
  
      // Mock fs.readFileSync
      jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(fileContent);
  
      // Mock axios.post
      axios.post.mockResolvedValueOnce(responseMock);
      await newnames(options);
      expect(axios.post.mock.calls[0][0]).toBe('https://localhost:9876/admin/upload/namebasics');
      expect(newnames(options)).resolves.not.toThrow();
    });
  
    it('should log error message when file does not exist', async () => {
      const options = { filename: 'example.txt' };
      const errorMessage = "ENOENT: no such file or directory, open 'example.txt'";
  
      axios.post.mockRejectedValue(new Error(errorMessage));
  
      const consoleSpy = jest.spyOn(console, 'error');
  
      await newnames(options);
  
      expect(consoleSpy).toHaveBeenCalledWith('Error:', errorMessage);
    });
  });


describe('newakas', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks before each test
    });
  
    test('it should upload file successfully', async () => {
      const options = { filename: 'testfile.txt' };
      const fileContent = 'Test file content';
      const responseMock = { data: { message: 'File uploaded successfully' } };
  
      // Mock fs.readFileSync
      jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(fileContent);
  
      // Mock axios.post
      axios.post.mockResolvedValueOnce(responseMock);
      await newakas(options);
      expect(axios.post.mock.calls[0][0]).toBe('https://localhost:9876/admin/upload/titleakas');
      expect(newakas(options)).resolves.not.toThrow();
    });
  
    it('should log error message when file does not exist', async () => {
      const options = { filename: 'example.txt' };
      const errorMessage = "ENOENT: no such file or directory, open 'example.txt'";
  
      axios.post.mockRejectedValue(new Error(errorMessage));
  
      const consoleSpy = jest.spyOn(console, 'error');
  
      await newakas(options);
  
      expect(consoleSpy).toHaveBeenCalledWith('Error:', errorMessage);
    });
  });


  describe('newcrew', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks before each test
    });
  
    test('it should upload file successfully', async () => {
      const options = { filename: 'testfile.txt' };
      const fileContent = 'Test file content';
      const responseMock = { data: { message: 'File uploaded successfully' } };
  
      // Mock fs.readFileSync
      jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(fileContent);
  
      // Mock axios.post
      axios.post.mockResolvedValueOnce(responseMock);
      await newcrew(options);
      expect(axios.post.mock.calls[0][0]).toBe('https://localhost:9876/admin/upload/titlecrew');
      expect(newcrew(options)).resolves.not.toThrow();
    });
  
    it('should log error message when file does not exist', async () => {
      const options = { filename: 'example.txt' };
      const errorMessage = "ENOENT: no such file or directory, open 'example.txt'";
  
      axios.post.mockRejectedValue(new Error(errorMessage));
  
      const consoleSpy = jest.spyOn(console, 'error');
  
      await newcrew(options);
  
      expect(consoleSpy).toHaveBeenCalledWith('Error:', errorMessage);
    });
  });


describe('newepisode', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks before each test
    });
  
    test('it should upload file successfully', async () => {
      const options = { filename: 'testfile.txt' };
      const fileContent = 'Test file content';
      const responseMock = { data: { message: 'File uploaded successfully' } };
  
      // Mock fs.readFileSync
      jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(fileContent);
  
      // Mock axios.post
      axios.post.mockResolvedValueOnce(responseMock);
      await newepisode(options);
      expect(axios.post.mock.calls[0][0]).toBe('https://localhost:9876/admin/upload/titleepisode');
      expect(newepisode(options)).resolves.not.toThrow();
    });
  
    it('should log error message when file does not exist', async () => {
      const options = { filename: 'example.txt' };
      const errorMessage = "ENOENT: no such file or directory, open 'example.txt'";
  
      axios.post.mockRejectedValue(new Error(errorMessage));
  
      const consoleSpy = jest.spyOn(console, 'error');
  
      await newepisode(options);
  
      expect(consoleSpy).toHaveBeenCalledWith('Error:', errorMessage);
    });
  });


  describe('newprincipals', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks before each test
    });
  
    test('it should upload file successfully', async () => {
      const options = { filename: 'testfile.txt' };
      const fileContent = 'Test file content';
      const responseMock = { data: { message: 'File uploaded successfully' } };
  
      // Mock fs.readFileSync
      jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(fileContent);
  
      // Mock axios.post
      axios.post.mockResolvedValueOnce(responseMock);
      await newprincipals(options);
      expect(axios.post.mock.calls[0][0]).toBe('https://localhost:9876/admin/upload/titleprincipals');
      expect(newprincipals(options)).resolves.not.toThrow();
    });
  
    it('should log error message when file does not exist', async () => {
      const options = { filename: 'example.txt' };
      const errorMessage = "ENOENT: no such file or directory, open 'example.txt'";
  
      axios.post.mockRejectedValue(new Error(errorMessage));
  
      const consoleSpy = jest.spyOn(console, 'error');
  
      await newprincipals(options);
  
      expect(consoleSpy).toHaveBeenCalledWith('Error:', errorMessage);
    });
  });


  describe('newratings', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks before each test
    });
  
    test('it should upload file successfully', async () => {
      const options = { filename: 'testfile.txt' };
      const fileContent = 'Test file content';
      const responseMock = { data: { message: 'File uploaded successfully' } };
  
      // Mock fs.readFileSync
      jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(fileContent);
  
      // Mock axios.post
      axios.post.mockResolvedValueOnce(responseMock);
      await newratings(options);
      expect(axios.post.mock.calls[0][0]).toBe('https://localhost:9876/admin/upload/titleratings');
      expect(newratings(options)).resolves.not.toThrow();
    });
  
    it('should log error message when file does not exist', async () => {
      const options = { filename: 'example.txt' };
      const errorMessage = "ENOENT: no such file or directory, open 'example.txt'";
  
      axios.post.mockRejectedValue(new Error(errorMessage));
  
      const consoleSpy = jest.spyOn(console, 'error');
  
      await newratings(options);
  
      expect(consoleSpy).toHaveBeenCalledWith('Error:', errorMessage);
    });
  });

