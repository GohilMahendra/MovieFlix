import { SafeAreaView, StyleSheet, Text } from "react-native"
import { black } from "../../globals/colors"
const SplashScreen = () =>
{
    return(
        <SafeAreaView style={styles.container}>
            <Text>Splash</Text>
        </SafeAreaView>
    )
}
export default SplashScreen

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:black,
        justifyContent:"center",
        alignItems:"center"
    },

})