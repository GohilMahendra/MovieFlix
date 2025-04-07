import {useEffect, useState} from 'react';
import {Movie} from '../../types/Movies';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useWatchlist = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getWatchlist = async () => {
    try {
      setLoading(true);
      const watchlist = await AsyncStorage.getItem('watchlist_movies');
      const parsedMovies: Movie[] = watchlist ? JSON.parse(watchlist) : [];
      setMovies(parsedMovies);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(JSON.stringify(error));
      Alert.alert('Error', JSON.stringify(error));
    }
  };

  return {
    getWatchlist,
    loading,
    movies,
    error,
  };
};
export default useWatchlist;
