import { View, Text, StyleSheet } from "react-native";

export default function Title() {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>Globalivery </Text>
        </View>
    )
}

const styles = StyleSheet.create(
    {
   header: {
        backgroundColor : '#04746aff' ,
        fontSize : 30,
        fontWeight : 'bold',
        padding : 16,
    },

    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },

    
}
)