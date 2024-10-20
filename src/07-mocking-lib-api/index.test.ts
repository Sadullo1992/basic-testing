import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const mockData = { data: 'something' };
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue(mockData);
    await throttledGetDataFromApi('./route');
    expect(axios.create).toBeCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const mockData = { data: 'something' };
    const mockUrl = '/users';
    jest.spyOn(axios, 'get').mockResolvedValue(mockData);
    jest.spyOn(axios, 'create').mockReturnThis();
    await throttledGetDataFromApi(mockUrl);
    jest.advanceTimersByTime(5000);
    expect(axios.get).toHaveBeenCalledWith(mockUrl);
  });

  test('should return response data', async () => {
    const mockData = { data: 'something' };
    const mockUrl = '/users';
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue(mockData);
    const data = await throttledGetDataFromApi(mockUrl);
    expect(data).toEqual(mockData.data);
  });
});
