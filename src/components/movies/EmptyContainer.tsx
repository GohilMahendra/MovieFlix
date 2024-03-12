import { Dimensions, Text, View } from "react-native"
import { white } from "../../globals/colors"
import { scaledVal } from "../../globals/utilities"
const { height,width } = Dimensions.get("screen")
const EmptyContainer = () =>
{
    return(
        <View style={{
            height: height,
            width: width,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Text style={{
                color: white,
                fontSize: scaledVal(15)
            }}> No search results found !! </Text>
        </View>
    )
}
export default EmptyContainer