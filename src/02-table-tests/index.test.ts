import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 2, b: 5, action: Action.Subtract, expected: -3 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 7, b: -5, action: Action.Multiply, expected: -35 },
  { a: 3, b: 7, action: Action.Multiply, expected: 21 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 4, b: 4, action: Action.Exponentiate, expected: 256 },
  { a: 5, b: 7, action: '%', expected: null },
  { a: 'one', b: 'four', action: Action.Divide, expected: null },
];


describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should calculate $a $action $b, is expected $expected ',
    ({ expected, ...mockRawInput }) => {
      expect(simpleCalculator(mockRawInput)).toEqual(expected);
    },
  );
});
