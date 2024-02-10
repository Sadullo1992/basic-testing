// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const mockResolvedValue = 'Some data';
    const data = await resolveValue(mockResolvedValue);
    expect(data).toBe(mockResolvedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMsg = 'Something went wrong!';
    expect(() => throwError(errMsg)).toThrow(new Error(errMsg));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(
      new MyAwesomeError(),
    );
  });
});
