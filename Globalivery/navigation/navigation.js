import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen'
import ProfileScreen from '../screens/ProfileScreen';
import BucketlistScreen from '../screens/BucketlistScreen';
import Notifications from '../screens/Notifications';


const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="cart" component={BucketlistScreen} />
                <Stack.Screen name="signin" component={SigninScreen} />
                <Stack.Screen name="signup" component={SignupScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="detail" component={DetailScreen} />
                <Stack.Screen name="Notifications" component={Notifications} />
            </Stack.Navigator>
    );
}