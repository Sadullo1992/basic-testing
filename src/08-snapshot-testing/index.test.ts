import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const tree = generateLinkedList([
      '<a href="https://nodejs.org">Nodejs</a>',
      '<a href="http://www.twitter.com">Twitter</a>',
    ]);
    expect(tree).toStrictEqual({
      next: {
        next: {
          next: null,
          value: null,
        },
        value: '<a href="http://www.twitter.com">Twitter</a>',
      },
      value: '<a href="https://nodejs.org">Nodejs</a>',
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const tree = generateLinkedList([
      '<a href="http://www.facebook.com">Facebook</a>',
      '<a href="http://www.instagram.com">Instagram</a>',
    ]);
    expect(tree).toMatchSnapshot();
  });
});
