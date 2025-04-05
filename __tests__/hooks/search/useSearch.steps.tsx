import {renderHook} from '@testing-library/react-hooks';
import {act, render, waitFor} from '@testing-library/react-native';
import useSearch from '../../../src/hooks/search/useSearch';

jest.mock('../../../src/apis/MovieApi', () => {
  const {apiSerachResultResponse} = require('../../mocks/MockData');
  return {
    searchMovies: jest.fn().mockResolvedValue(apiSerachResultResponse),
  };
});
jest.useFakeTimers();
jest.runAllTimers();

describe('useSearch hooks ...', () => {
  it('search will be called on change of search term', async () => {
    const {result} = renderHook(() => useSearch());
    await act(async () => {
      result.current.setSearchTerm('dieH');
    });
    expect(result.current.searchTerm).toBe('dieH');
    jest.advanceTimersByTime(2000);
    await waitFor(async () => {
      expect(result.current.movies.length).toBe(20);
    });
  });
});
