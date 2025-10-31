import{View}from "react-native"
import{SafeAreaProvider,SafeAreaView}from "react-native-safe-area-context"
import Navbar from "./components/Navbar"

export default function App()
return(
    <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
          <View>    
            <Navbar />
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
)