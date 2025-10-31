import {View,Text,Button,StyleSheet} from "react-native"
import Navbar from "../components/Navbar"


export default function HomeScreen(){
    return(
        // ensure the screen fills the available space so an absolutely positioned
        // navbar (position: 'absolute', bottom: 0) is positioned relative to the
        // full screen rather than a small auto-sized container.
        <View style={{ flex: 1 }}>
            <Navbar />
        </View>
    )
}