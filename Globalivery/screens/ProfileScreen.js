import {View, Text} from 'react-native';
import React from 'react';
import { StyleSheet, Image, Button } from 'react-native';

export default function ProfileScreen({ navigation, route }) {
    const user = route?.params?.user ?? {
        name: 'Jane Developer',
        email: 'jane@example.com',
        phone: '+1 555 555 5555',
        avatar: 'https://placehold.co/120x120/png?text=Avatar'
    };

    const handleEdit = () => navigation?.navigate?.('EditProfile', { user });
    const handleLogout = () => {
        // TODO: replace with your auth/logout logic
        navigation?.reset?.({ index: 0, routes: [{ name: 'Login' }] });
    };

    const [avatarUri, setAvatarUri] = React.useState(user?.avatar);
    const { name, email, phone } = user;
    const activities = user?.activities ?? user?.activity ?? [
        { title: 'Joined Globalivery', time: '2024-01-10' },
        { title: 'Placed Order #1234', time: '2024-02-03' },
        { title: 'Left a review', time: '2024-03-21' }
    ];

    return (
        <View style={[styles.container, { alignItems: 'flex-start' }]}>
            <Image
                source={{ uri: avatarUri }}
                style={styles.avatar}
                accessibilityLabel={`${name} avatar`}
                onError={() => setAvatarUri('https://placehold.co/120x120/png?text=No+Image')}
            />

            <View style={{ width: '100%' }}>
                <Text style={styles.name} accessibilityRole="header">{name}</Text>
                {email ? <Text style={styles.info}>{email}</Text> : null}
                {phone ? <Text style={styles.info}>{phone}</Text> : null}

                <View style={[styles.actions, { marginTop: 16, width: '100%', justifyContent: 'flex-start' }]}>
                    <Button title="Edit Profile" onPress={handleEdit} accessibilityLabel="Edit profile" />
                    <View style={{ width: 12 }} />
                    <Button title="Logout" onPress={handleLogout} color="#d9534f" accessibilityLabel="Log out" />
                </View>

                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 24 }}>Past activity</Text>
                <View style={{ width: '100%', marginTop: 8 }}>
                    {activities.length === 0 ? (
                        <Text style={{ color: '#777' }}>No activity yet.</Text>
                    ) : (
                        activities.map((act, i) => {
                            const title = typeof act === 'string' ? act : act.title ?? act.description ?? 'Activity';
                            const meta = typeof act === 'string' ? '' : act.time ?? act.date ?? '';
                            return (
                                <View
                                    key={i}
                                    style={{
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderColor: '#eee',
                                        width: '100%'
                                    }}
                                >
                                    <Text style={{ fontSize: 15, color: '#222' }}>{title}</Text>
                                    {meta ? <Text style={{ fontSize: 12, color: '#777', marginTop: 4 }}>{meta}</Text> : null}
                                </View>
                            );
                        })
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
        backgroundColor: '#eee'
    },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
    info: { fontSize: 16, color: '#555', marginBottom: 4 },
    actions: { flexDirection: 'row', marginTop: 20 }
});