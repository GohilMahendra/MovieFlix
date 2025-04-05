import {useEffect, useState} from 'react';
import {ApiResponse, Movie} from '../../types/Movies';
import {searchMovies} from '../../apis/MovieApi';
import {Alert} from 'react-native';
import {debounce} from 'lodash';
const useSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const getSearchResult = async () => {
    try {
      setLoading(true);
      const response = await searchMovies(searchTerm);
      const apiResponse = response as ApiResponse;
      const results = apiResponse.results;
      setMovies(results);
      setLoading(false);
    } catch (err: any) {
      Alert.alert('Error', JSON.stringify(error));
      setLoading(false);
      setError(error);
    }
  };

  const debouncedGetSearchResult = debounce(getSearchResult, 1000);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length <= 3) return;

    debouncedGetSearchResult();
    return () => debouncedGetSearchResult.cancel();
  }, [searchTerm]);

  return {
    loading,
    movies,
    searchTerm,
    setSearchTerm,
  };
};
export default useSearch;
