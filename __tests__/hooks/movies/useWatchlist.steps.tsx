import {renderHook} from '@testing-library/react-hooks';
import useWatchlist from '../../../src/hooks/movies/useWatchlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WatchlistData} from '../../mocks/WatchlistMockData';
import {act} from '@testing-library/react-native';
import {Alert} from 'react-native';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockUseFocusEffect = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useFocusEffect: jest.fn(),
  useRoute: () => ({
    params: {
      movie_id: 1094556,
    },
  }),
}));

describe('useWatchlist hook ...', () => {
  beforeEach(async () => {
    await AsyncStorage.setItem(
      'watchlist_movies',
      JSON.stringify(WatchlistData),
    );
  });

  it('I can get the watchlist data from the backend', async () => {
    const {result} = renderHook(() => useWatchlist());

    await act(async () => {
      result.current.getWatchlist();
    });
    expect(result.current.movies.length).toBe(6);
  });

  it('it should handle Error in terms of no data', async () => {
    await AsyncStorage.clear();
    const {result} = renderHook(() => useWatchlist());
    await act(async () => {
      result.current.getWatchlist();
    });
    expect(result.current.movies.length).toBe(0);
  });

  it('it should handle Error in terms of failure', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => {
      throw new Error('AsyncStorage failure');
    });

    const alertSpy = jest.spyOn(Alert, 'alert');

    const {result} = renderHook(() => useWatchlist());

    await act(async () => {
      result.current.getWatchlist();
    });

    expect(alertSpy).toHaveBeenCalledWith(
      'Error',
      JSON.stringify(new Error('AsyncStorage failure')),
    );

    alertSpy.mockRestore();
  });
});
