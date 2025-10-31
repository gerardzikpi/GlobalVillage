import {Image,TouchableOpacity,View,Stylesheet} from "react-native";
import  "../assets/nav-icons/cart.svg"
import  "../assets/nav-icons/house.svg"
import  "../assets/nav-icons/smilemoji.svg"
import  "../assets/nav-icons/notifications.svg"


export default function Navbar(){
    return(
        <View>
            
                <Image source={require('../assets/nav-icons/house.svg')} />
            
                <Image source={require('../assets/nav-icons/cart.svg')} />
                        
                <Image source={require('../assets/nav-icons/notifications.svg')} />
            
            
                <Image source={require('../assets/nav-icons/smilemoji.svg')} />
            
        </View>
    )
}