import {View,Text} from "react-native"
import {StyleSheet, Image, TouchableOpacity} from "react-native"

export default function Card({ item, title, subtitle, image, onPress, style }) {
    const cardTitle = title ?? item?.title ?? ''
    const cardSubtitle = subtitle ?? item?.subtitle ?? ''
    const imageUri = image ?? item?.image ?? null
    const Container = onPress ? TouchableOpacity : View

    return (
        <Container {...(onPress ? { onPress } : {})} style={[styles.card, style]}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={styles.placeholder} />
            )}
            <View style={styles.content}>
                <Text style={styles.title}>{cardTitle}</Text>
                {cardSubtitle ? <Text style={styles.subtitle}>{cardSubtitle}</Text> : null}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
        marginVertical: 6,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 12,
    },
    placeholder: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
})