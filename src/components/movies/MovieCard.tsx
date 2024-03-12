import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from "react-native"
import { Movie } from "../../types/Movies"
import { white } from "../../globals/colors"
import { BASE_URL, MEDIA_BASE_URL } from "../../globals/constants"
import { scaledVal } from "../../globals/utilities"
const { height, width } = Dimensions.get("screen")

export type MovieCardProps =
    {
        movie: Movie
    }

const MovieCard = (props: MovieCardProps) => {
    const { movie } = props
    return (
        <TouchableOpacity style={{
            width: width / 3 - 20 / 2,
            borderRadius: scaledVal(15),
            margin: scaledVal(5)
        }}>
            <View>
            <Image
                source={{ uri: `${MEDIA_BASE_URL + movie.poster_path}` }}
                style={{
                    backgroundColor: "green",
                    height: scaledVal(200),
                    resizeMode: "cover",
                    borderRadius: 15,
                    overflow: "hidden"
                }}
            />
            <View style={{
                position:"absolute",
                padding:scaledVal(5),
                top: scaledVal(172),
                alignSelf:"flex-end",
                borderRadius:scaledVal(20),
                backgroundColor:"purple"
            }}>
                <Text style={{
                    color: white
                }}>{movie.vote_average.toFixed(1)}</Text>
            </View>
            </View>
            <View>
                <Text
                    numberOfLines={2}
                    style={{
                        color: white,
                        fontSize: scaledVal(12),

                    }}>{movie.title}</Text>
        
                    <Text style={{
                        color: white,
                        fontSize: scaledVal(12)
                    }}>
                        {movie.release_date}
                    </Text>
            </View>
        </TouchableOpacity>
    )
}
export default MovieCard