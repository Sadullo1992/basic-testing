// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const mockRawInput = { a: 2, b: 3, action: Action.Add };
    expect(simpleCalculator(mockRawInput)).toEqual(5);
  });

  test('should subtract two numbers', () => {
    const mockRawInput = { a: 5, b: 3, action: Action.Subtract };
    expect(simpleCalculator(mockRawInput)).toEqual(2);
  });

  test('should multiply two numbers', () => {
    const mockRawInput = { a: 5, b: 4, action: Action.Multiply };
    expect(simpleCalculator(mockRawInput)).toEqual(20);
  });

  test('should divide two numbers', () => {
    const mockRawInput = { a: 18, b: 3, action: Action.Divide };
    expect(simpleCalculator(mockRawInput)).toEqual(6);
  });

  test('should exponentiate two numbers', () => {
    const mockRawInput = { a: 2, b: 4, action: Action.Exponentiate };
    expect(simpleCalculator(mockRawInput)).toEqual(16);
  });

  test('should return null for invalid action', () => {
    const mockRawInput = { a: 7, b: 3, action: '%' };
    expect(simpleCalculator(mockRawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const mockRawInput = { a: 'two', b: 'three', action: Action.Add };
    expect(simpleCalculator(mockRawInput)).toBeNull();
  });
});
