import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { black, red } from "../../globals/colors"
import { useEffect } from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackType } from "../../navigation/RootStack"
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
                color: red,
                fontSize: 20,
                fontWeight: "bold"
            }}>MovieFlix</Text>
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