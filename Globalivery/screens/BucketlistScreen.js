import {View, Text} from 'react-native';
import Navbar from '../components/Navbar';

export default function BucketlistScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Bucketlist  </Text>
            <Navbar />
        </View>
    );
}