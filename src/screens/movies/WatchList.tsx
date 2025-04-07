import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {black, white} from '../../globals/colors';
import {getNumColumns, scaledVal} from '../../globals/utilities';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {RootStackType} from '../../navigation/RootStack';
import useWatchlist from '../../hooks/movies/useWatchlist';
import {Movie} from '../../types/Movies';
import MovieCard from '../../components/movies/MovieCard';
import WatchListEmptyContainer from '../../components/movies/WatchListEmptyContainer';
import {useCallback, useEffect} from 'react';
const WatchList = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackType, 'WatchList'>>();
  // watchlist hook responsilbe for fetching the saved watchlist
  const {loading, movies, getWatchlist} = useWatchlist();
  const isFocused = useIsFocused();

  const renderMovies = useCallback(
    (movie: Movie, index: number) => {
      return (
        <MovieCard
          testID={'card_movie' + index.toString()}
          movie={movie}
          onMoviePress={(movie_id: number) =>
            navigation.navigate('MovieDetails', {
              movie_id: movie_id,
            })
          }
        />
      );
    },
    [navigation],
  );

  // for edge case: if user removes watchlist and come back to same screen
  useEffect(() => {
    if (isFocused) {
      getWatchlist();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {/* header starts */}
      <View style={styles.header}>
        <Fontisto
          testID={'btn_goBack'}
          onPress={() => navigation.goBack()}
          name="angle-left"
          color={white}
          size={scaledVal(15)}
        />
        <Text style={styles.txt_title}>Watchlist</Text>
        <View />
      </View>
      {/* header ends */}
      {/* list of watchlist starts */}
      <FlatList
        testID={'list_watchlist'}
        // pull to refresh for re-fetch, refresh the watchlist
        refreshControl={
          <RefreshControl
            tintColor={white}
            refreshing={loading}
            onRefresh={() => getWatchlist()}
          />
        }
        ListEmptyComponent={!loading ? <WatchListEmptyContainer /> : null}
        data={movies}
        numColumns={getNumColumns()}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => renderMovies(item, index)}
      />
      {/* list of watchlist ends */}
    </SafeAreaView>
  );
};
export default WatchList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
  },
  header: {
    padding: scaledVal(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txt_title: {
    color: white,
    fontSize: scaledVal(20),
  },
});
