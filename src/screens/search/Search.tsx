import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { scaledVal } from "../../globals/utilities"
import Fontisto from "react-native-vector-icons/Fontisto"
import { black, matt_black, white } from "../../globals/colors"
import useSearch from "../../hooks/search/useSearch"
import MovieCard from "../../components/movies/MovieCard"
import { Movie } from "../../types/Movies"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackType } from "../../navigation/RootStack"
import EmptyContainer from "../../components/movies/EmptyContainer"
const { fontScale,height,width } = Dimensions.get("screen")
const Search = () => {
    const { searchTerm, setSearchTerm, movies } = useSearch()
    const navigation = useNavigation<NavigationProp<RootStackType, "Search">>()
    const renderMovies = (movie: Movie, index: number) => {
        return (
            <MovieCard
                movie={movie}
                onMoviePress={(movie_id:number)=>
                    navigation.navigate("MovieDetails",{ movie_id: movie_id})}
            />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Fontisto
                    onPress={() => navigation.goBack()}
                    name="angle-left"
                    color={white}
                    size={scaledVal(15)}
                />
                <TextInput
                    value={searchTerm}
                    onChangeText={(text: string) => setSearchTerm(text)}
                    style={styles.inputSearch}
                />
            </View>

            <FlatList
                data={movies}
                ListEmptyComponent={() => (
                    searchTerm.length > 0 && 
                    <EmptyContainer/>
                )}
                numColumns={3}
                // onEndReached={() => getMoreMovies()}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => renderMovies(item, index)}
            />
        </SafeAreaView>
    )
}
export default Search
const styles = StyleSheet.create({
    container:
    { 
        flex: 1, 
        backgroundColor: black
     },
    header:
    {
        padding: scaledVal(10),
        flexDirection: "row",
        alignItems: "center"
    },
    inputSearch:
    {
        width: "80%",
        borderRadius: scaledVal(10),
        marginLeft: scaledVal(10),
        padding: scaledVal(10),
        fontSize: scaledVal(12),
        color: white,
        backgroundColor: matt_black
    },

})  