import { FlatList, SafeAreaView, TextInput, View } from "react-native"
import { scaledVal } from "../../globals/utilities"
import Fontisto from "react-native-vector-icons/Fontisto"
import { black, matt_black, white } from "../../globals/colors"
import useSearch from "../../hooks/search/useSearch"
import MovieCard from "../../components/movies/MovieCard"
import { Movie } from "../../types/Movies"

const Search = () => {

    const {  searchTerm,setSearchTerm,movies } = useSearch()
    const renderMovies = (movie: Movie, index: number) => {
        return (
          <MovieCard
            movie={movie}
          />
        )
      }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
            <View style={{
                padding: scaledVal(10),
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Fontisto
                    name="angle-left"
                    color={white}
                    size={scaledVal(20)}
                />
                <TextInput
                    value={searchTerm}
                    onChangeText={(text:string)=>setSearchTerm(text)}
                    style={{
                        width: "80%",
                        borderRadius: scaledVal(10),
                        marginLeft: scaledVal(10),
                        padding: scaledVal(10),
                        fontSize: scaledVal(15),
                        color: white,
                        backgroundColor: matt_black
                    }}
                />
            </View>

            <FlatList
                data={movies}
                numColumns={3}
               // onEndReached={() => getMoreMovies()}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => renderMovies(item, index)}
            />
        </SafeAreaView>
    )
}
export default Search