import path from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs/promises', () => {
  const originalFsPromise =
    jest.requireActual<typeof import('fs/promises')>('fs/promises');
  return {
    ...originalFsPromise,
    readFile: () => Promise.resolve('Some content'),
  };
});

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    const pathToFile = './src/path/file.txt';
    await readFileAsynchronously(pathToFile);
    expect(spyJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync');
    spyExistsSync.mockReturnValue(false);
    const pathToFile = './src/path/file.txt';
    const content = await readFileAsynchronously(pathToFile);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync');
    spyExistsSync.mockReturnValue(true);
    const pathToFile = './src/path/file.txt';
    await readFile(pathToFile);
    const content = await readFileAsynchronously(pathToFile);
    expect(content).toEqual('Some content');
  });
});
