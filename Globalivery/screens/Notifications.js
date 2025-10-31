import React, { useState, useCallback } from "react";
import {
View,
Text,
FlatList,
TouchableOpacity,
StyleSheet,
StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialNotifications = [
{
    id: "1",
    title: "Order Shipped",
    body: "Your order #1234 has been shipped.",
    time: "2h ago",
    read: false,
},
{
    id: "2",
    title: "New Message",
    body: "You received a new message from Support.",
    time: "5h ago",
    read: false,
},
{
    id: "3",
    title: "Weekly Summary",
    body: "Your weekly activity summary is ready.",
    time: "1d ago",
    read: true,
},
{
    id: "4",
    title: "Promo",
    body: "Get 20% off your next purchase. Limited time!",
    time: "3d ago",
    read: true,
},
];

export default function Notifications() {
const [notifications, setNotifications] = useState(initialNotifications);

const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
}, []);

const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
}, []);

const clearAll = useCallback(() => {
    setNotifications([]);
}, []);

const renderItem = ({ item }) => {
    return (
        <TouchableOpacity
            style={[styles.row, item.read ? styles.read : styles.unread]}
            onPress={() => markAsRead(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <Text style={[styles.title, item.read ? styles.titleRead : null]}>
                    {item.title}
                </Text>
                <Text style={styles.body} numberOfLines={2}>
                    {item.body}
                </Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>
    );
};

const listEmptyComponent = (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You're all caught up 🎉</Text>
        <Text style={styles.emptySub}>No notifications right now.</Text>
    </View>
);

return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <View style={styles.headerButtons}>
                <TouchableOpacity onPress={markAllRead} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Mark all</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearAll} style={styles.headerButton}>
                    <Text style={[styles.headerButtonText, styles.clearText]}>Clear</Text>
                </TouchableOpacity>
            </View>
        </View>

        <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={
                notifications.length === 0 ? styles.flatListEmpty : undefined
            }
            ListEmptyComponent={listEmptyComponent}
        />
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: "#f6f7fb" },
header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e6e6e6",
},
headerTitle: { fontSize: 20, fontWeight: "600" },
headerButtons: { flexDirection: "row", alignItems: "center" },
headerButton: { marginLeft: 12, padding: 6 },
headerButtonText: { color: "#007aff", fontSize: 14 },
clearText: { color: "#ff3b30" },

row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
},
unread: { backgroundColor: "#eef6ff" },
read: { backgroundColor: "#fff" },
content: { flex: 1, paddingRight: 8 },
title: { fontSize: 16, fontWeight: "600", color: "#111" },
titleRead: { color: "#666", fontWeight: "500" },
body: { marginTop: 4, fontSize: 13, color: "#444" },
time: { fontSize: 12, color: "#888" },
separator: { height: 8, backgroundColor: "transparent" },

emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
},
emptyText: { fontSize: 18, fontWeight: "600", color: "#333" },
emptySub: { marginTop: 6, fontSize: 14, color: "#666" },
flatListEmpty: { flexGrow: 1 },
});