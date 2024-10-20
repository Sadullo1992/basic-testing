import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const mockRawInput = { a: 2, b: 3, action: Action.Add };
    expect(simpleCalculator(mockRawInput)).toEqual(5);
  });

  test('should subtract two numbers', () => {
    const mockRawInput = { a: 7, b: 3, action: Action.Subtract };
    expect(simpleCalculator(mockRawInput)).toEqual(4);
  });

  test('should multiply two numbers', () => {
    const mockRawInput = { a: 2, b: 3, action: Action.Multiply };
    expect(simpleCalculator(mockRawInput)).toEqual(6);
  });

  test('should divide two numbers', () => {
    const mockRawInput = { a: 8, b: 4, action: Action.Divide };
    expect(simpleCalculator(mockRawInput)).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const mockRawInput = { a: 3, b: 3, action: Action.Exponentiate };
    expect(simpleCalculator(mockRawInput)).toEqual(27);
  });

  test('should return null for invalid action', () => {
    const mockRawInput = { a: 6, b: 9, action: '&' };
    expect(simpleCalculator(mockRawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const mockRawInput = { a: 'ok', b: 'two', action: Action.Divide };
    expect(simpleCalculator(mockRawInput)).toBeNull();
  });
});
