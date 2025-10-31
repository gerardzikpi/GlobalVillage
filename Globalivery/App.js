import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import { ImageBackground,StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/navigation';
import Navbar from './components/Navbar'
import WelcomeScreen from './screens/WelcomeScreen';


// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={{flex:1}}>
//         <NavigationContainer>
//           <Navigation />
//         </NavigationContainer>
//         <StatusBar style="auto" />
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

export default function App(){
  return(
    <View>
      <WelcomeScreen />
    </View>
  );
};