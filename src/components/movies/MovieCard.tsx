import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Movie } from "../../types/Movies"
import { matt_black, white } from "../../globals/colors"
import { BASE_URL, MEDIA_BASE_URL } from "../../globals/constants"
import { scaledVal } from "../../globals/utilities"
const { height, width } = Dimensions.get("screen")

export type MovieCardProps =
    {
        movie: Movie,
        onMoviePress: (movie: number) => void
    }

const MovieCard = (props: MovieCardProps) => {
    const { movie, onMoviePress } = props
    return (
        <TouchableOpacity
            onPress={() => onMoviePress(movie.id)}
            style={styles.container}>
            <View>
                <Image
                    source={{ uri: `${MEDIA_BASE_URL + movie.poster_path}` }}
                    style={styles.imgPoster}
                />
                <View style={styles.ratingContainer}>
                    <Text style={{
                        color: white
                    }}>{movie.vote_average.toFixed(1)}</Text>
                </View>
            </View>
            <View>
                <Text numberOfLines={2} style={styles.txtMovieTitle}>{movie.title}</Text>
                <Text style={styles.txtReleaseDate}>{movie.release_date}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default MovieCard

const styles = StyleSheet.create({
    container:
    {
        width: width / 3 - 20 / 2,
        borderRadius: scaledVal(15),
        margin: scaledVal(5)
    },
    imgPoster:
    {
        backgroundColor: matt_black,
        height: scaledVal(200),
        resizeMode: "cover",
        borderRadius: 15,
        overflow: "hidden"
    },
    ratingContainer:
    {
        position: "absolute",
        padding: scaledVal(5),
        top: scaledVal(172),
        alignSelf: "flex-end",
        borderRadius: scaledVal(20),
        backgroundColor: "purple"
    },
    txtMovieTitle:
    {
        color: white,
        fontSize: scaledVal(12),
    },
    txtReleaseDate:
    {
        color: white,
        fontSize: scaledVal(12)
    }
})