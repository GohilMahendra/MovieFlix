import {FlatList} from 'react-native';
import MovieCardShimmer from './MovieCardShimmer';
import {useCallback} from 'react';

const shimmerData = Array.from({length: 12}).map((_, index) => ({id: index}));

const MovieListShimmer = () => {
  const renderShimmerItem = useCallback(
    ({item, index}: {item: {id: number}; index: number}) => (
      <MovieCardShimmer testID={`MovieShimmerCard_${index}`} />
    ),
    [],
  );

  return (
    <FlatList
      testID={'MovieListShimmer_List'}
      data={shimmerData}
      numColumns={3}
      keyExtractor={item => item.id.toString()}
      renderItem={renderShimmerItem}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default MovieListShimmer;
