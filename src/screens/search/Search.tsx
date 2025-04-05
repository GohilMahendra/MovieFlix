import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {scaledVal} from '../../globals/utilities';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {black, matt_black, white} from '../../globals/colors';
import useSearch from '../../hooks/search/useSearch';
import MovieCard from '../../components/movies/MovieCard';
import {Movie} from '../../types/Movies';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackType} from '../../navigation/RootStack';
import EmptyContainer from '../../globals/EmptyContainer';
import {useCallback} from 'react';
import {ActivityIndicator} from 'react-native';
import MovieListShimmer from '../../components/shimmers/MovieListShimmer';
const {height} = Dimensions.get('screen');
const Search = () => {
  // hook created for search actions called once searchTerm changes
  // use setSearchTerm
  const {loading, searchTerm, setSearchTerm, movies} = useSearch();
  const navigation = useNavigation<NavigationProp<RootStackType, 'Search'>>();
  const renderMovies = useCallback((movie: Movie, index: number) => {
    return (
      <MovieCard
        testID={'Search_MovieCard' + index.toString()}
        movie={movie}
        onMoviePress={(movie_id: number) =>
          navigation.navigate('MovieDetails', {movie_id: movie_id})
        }
      />
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* header section starts */}
      <View style={styles.header}>
        {/* back button */}
        <Fontisto
          testID={'btn_goBack'}
          onPress={() => navigation.goBack()}
          name="angle-left"
          color={white}
          size={scaledVal(15)}
        />
        {/* search input */}
        <TextInput
          testID={'input_search'}
          placeholder={'Search here ...'}
          placeholderTextColor={white}
          value={searchTerm}
          onChangeText={(text: string) => setSearchTerm(text)}
          style={styles.inputSearch}
        />
      </View>
      {/* header section ends */}
      {loading ? (
        <MovieListShimmer />
      ) : (
        <FlatList
          testID={'list_search'}
          data={movies}
          ListEmptyComponent={() =>
            !loading && searchTerm.length > 3 && <EmptyContainer />
          }
          numColumns={3}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => renderMovies(item, index)}
        />
      )}
    </SafeAreaView>
  );
};
export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
  },
  header: {
    padding: scaledVal(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputSearch: {
    width: '85%',
    borderRadius: scaledVal(10),
    marginLeft: scaledVal(10),
    padding: scaledVal(10),
    fontSize: scaledVal(12),
    color: white,
    backgroundColor: matt_black,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: height / 2 - scaledVal(20),
  },
});
