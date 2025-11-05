import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
const SAMPLE_PRODUCTS = [
    { id: "p1", title: "Wireless Headphones", category: "electronics", price: 89.99, image: "https://via.placeholder.com/120x80.png?text=Headphones", popularity: 8 },
    { id: "p2", title: "Running Shoes", category: "sports", price: 69.99, image: "https://via.placeholder.com/120x80.png?text=Shoes", popularity: 6 },
    { id: "p3", title: "Organic Coffee Beans", category: "grocery", price: 14.99, image: "https://via.placeholder.com/120x80.png?text=Coffee", popularity: 7 },
    { id: "p4", title: "Smartwatch", category: "electronics", price: 129.99, image: "https://via.placeholder.com/120x80.png?text=Watch", popularity: 9 },
    { id: "p5", title: "Yoga Mat", category: "fitness", price: 24.99, image: "https://via.placeholder.com/120x80.png?text=Yoga+Mat", popularity: 5 },
    { id: "p6", title: "Cookbook", category: "books", price: 19.99, image: "https://via.placeholder.com/120x80.png?text=Cookbook", popularity: 4 }
];

// Simulated fetch of past orders: list of { productId, category, purchasedAt }
async function fetchPastOrders() {
    // simulate network / storage delay
    await new Promise((r) => setTimeout(r, 250));
    return [
        { productId: "p1", category: "electronics", purchasedAt: Date.now() - 1000 * 60 * 60 * 24 * 10 },
        { productId: "p4", category: "electronics", purchasedAt: Date.now() - 1000 * 60 * 60 * 24 * 40 },
        { productId: "p3", category: "grocery", purchasedAt: Date.now() - 1000 * 60 * 60 * 24 * 5 },
        { productId: "p1", category: "electronics", purchasedAt: Date.now() - 1000 * 60 * 60 * 24 * 2 }
    ];
}

// Simulated fetch of user interests: array of category strings
async function fetchUserInterests() {
    await new Promise((r) => setTimeout(r, 150));
    return ["electronics", "fitness"];
}

// Score products by combining popularity, how often user ordered similar categories, and explicit interests.
// Returns top N products sorted by score.
function computeTrending(products, pastOrders, interests, limit = 10) {
    const categoryCount = pastOrders.reduce((acc, ord) => {
        acc[ord.category] = (acc[ord.category] || 0) + 1;
        return acc;
    }, {});

    // recency factor: orders within last 14 days get a boost
    const now = Date.now();
    const recencyBoost = pastOrders.reduce((acc, ord) => {
        const daysAgo = (now - ord.purchasedAt) / (1000 * 60 * 60 * 24);
        if (daysAgo < 14) acc[ord.category] = (acc[ord.category] || 0) + 1;
        return acc;
    }, {});

    const scored = products.map((p) => {
        const catFreq = categoryCount[p.category] || 0;
        const interestMatch = interests.includes(p.category) ? 1 : 0;
        const recency = recencyBoost[p.category] || 0;

        // scoring formula: weighted sum (tweak weights as needed)
        const score = p.popularity * 0.5 + catFreq * 2 + interestMatch * 4 + recency * 1.5;
        return { ...p, score };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

const styles = StyleSheet.create({
    container: { paddingVertical: 12 },
    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginVertical: 6,
        padding: 10,
        borderRadius: 8,
        elevation: 1
    },
    image: { width: 100, height: 64, borderRadius: 6, marginRight: 12, resizeMode: "cover" },
    title: { fontSize: 16, fontWeight: "600" },
    subtitle: { fontSize: 12, color: "#666", marginTop: 4 },
    price: { marginLeft: "auto", fontWeight: "700" },
    loaderWrap: { padding: 24, alignItems: "center" }
});

// keep fetching and computing inside the component via hooks
function useTrending(limit = 10) {
    const [loading, setLoading] = useState(true);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const [orders, interests] = await Promise.all([fetchPastOrders(), fetchUserInterests()]);
                const list = computeTrending(SAMPLE_PRODUCTS, orders, interests, limit);
                if (mounted) setTrending(list);
            } catch (e) {
                if (mounted) setTrending(SAMPLE_PRODUCTS.slice(0, limit));
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, [limit]);

    return { loading, trending, refresh: undefined };
}

// expose to the component scope
const _useTrending = useTrending;
// component: use the hook and render results
export default function Explore(){
    const { loading, trending, refresh } = useTrending(10);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} activeOpacity={0.8}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.category}</Text>
            </View>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={{ marginHorizontal: 12, fontSize: 18, fontWeight: "700", marginBottom: 8 }}>Trending Deals for you</Text>
            {loading ? (
                <View style={styles.loaderWrap}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <FlatList
                    data={trending}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
            )}
        </View>
    );
}