import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { black, primary, red } from "../../globals/colors"
import { useEffect } from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackType } from "../../navigation/RootStack"
import { scaledVal } from "../../globals/utilities"
import { APP_NAME } from "../../globals/constants"
const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackType, "Movies">>()
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Movies")
        }, 3000);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{
                color: primary,
                fontSize: scaledVal(25),
                fontWeight: "bold"
            }}>{APP_NAME}</Text>
        </View>

    )
}
export default SplashScreen

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: black,
        justifyContent: "center",
        alignItems: "center"
    },

})