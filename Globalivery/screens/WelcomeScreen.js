import {View, Text, Image, TouchableOpacity,Button,ImageBackground} from 'react-native';
import "../assets/sunflower.png" 
import "../assets/splash-icon.png"

export default function WelcomeScreen({navigation}) {
    return (
        <View style={{flex: 1}}>
            <ImageBackground source={require("../assets/sunflower.png")} style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                <Image source={require("../assets/applogo.png")} style={{width: 150, height: 150, marginBottom: 20}} />
                <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white', marginBottom: 10}}>       Welcome to Globalivery              </Text>
                <Text style={{fontSize: 16, color: 'white', marginBottom: 30}}>Your global delivery partner        </Text>
                <TouchableOpacity 
                    style={{backgroundColor: '#FFA500', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15}}
                    onPress={() => navigation.navigate('signin')}
                >
                    <Text style={{color: 'white', fontSize: 16}}>Get Started  </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}