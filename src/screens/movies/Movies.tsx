import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { black, white } from "../../globals/colors"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import useMovies from "../../hooks/movies/useMovies";
import { Movie, MovieCategory } from "../../types/Movies";
import { TouchableOpacity } from "react-native";
import MovieCard from "../../components/movies/MovieCard";
const Movies = () => {
  const { movies, loading, error, category, setCategory, getMoreMovies } = useMovies()
  const categories = [
    {
      label: "Now Playing",
      value: "now_playing"
    },
    {
      label: "Popular",
      value: "popular"
    },
    {
      label: "Top Rated",
      value: "top_rated"
    },
    {
      label: "Upcoming",
      value: "upcoming"
    }
  ]
  const renderMovies = (movie: Movie, index: number) => {
    return (
      <MovieCard
        movie={movie}
      />
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <View style={styles.header}>
        <FontAwesome5
          name="chevron-left"
          color={white}
          size={20}
        />
        <Fontisto
          name="search"
          color={white}
          size={20}
        />
      </View>
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {
            categories.map((type, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setCategory(type.value as MovieCategory)}
                  style={[styles.tab, {
                    backgroundColor: (category == type.value) ? white : black,
                  }]}>
                  <Text style={{
                    color: (category == type.value) ? black : white,
                  }}>{type.label}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
      <FlatList
        data={movies}
        numColumns={3}
        onEndReached={() => getMoreMovies()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => renderMovies(item, index)}
      />
    </SafeAreaView>
  )
}
export default Movies

const styles = StyleSheet.create({
  header:
  {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: 'center'
  },
  tabContainer:
  {
    flexDirection: "row"
  },
  tab:
  {
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: white,
    borderWidth: 0.2
  }
})