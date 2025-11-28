import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import { fetchOrders } from '../api/api';

const SOCKET_URL = 'http://127.0.0.1:5000';

const STAGES = ['ordered', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
const STAGE_ESTIMATES_MIN = {
    ordered: 10,
    packed: 30,
    shipped: 180,
    out_for_delivery: 60,
    delivered: 0,
};

function predictETA(item) {
    const now = Date.now();
    const currentIndex = STAGES.indexOf(item.status);
    if (currentIndex === -1) {
        return null;
    }
    let remainingMin = 0;
    for (let i = currentIndex + 1; i < STAGES.length; i++) {
        remainingMin += STAGE_ESTIMATES_MIN[STAGES[i]] || 0;
    }
    // if we have a timestamp for current status, we could estimate remaining of current stage
    return new Date(now + remainingMin * 60 * 1000).toISOString();
}

export default function BucketlistScreen() {
    const navigation = useNavigation();
    const socketRef = useRef(null);
    const [orders, setOrders] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function loadInitial() {
            try {
                const data = await fetchOrders();
                if (!mounted) return;
                // normalize orders
                const normalized = (data || []).map((o) => ({
                    id: o.id || o._id || Math.random().toString(36).slice(2),
                    productName: o.product_name || o.title || o.name || 'Unknown',
                    status: o.status || 'ordered',
                    timeline: o.timeline || [{ status: o.status || 'ordered', ts: new Date().toISOString() }],
                    eta: null,
                }));
                // compute initial ETA
                normalized.forEach((it) => (it.eta = predictETA(it)));
                setOrders(normalized);
            } catch (err) {
                console.error('Failed to load orders', err);
            }
        }

        loadInitial();

        // connect socket
        const socket = io(SOCKET_URL, { transports: ['websocket'] });
        socketRef.current = socket;

        socket.on('connect', () => {
            setConnected(true);
            console.log('Socket connected');
        });

        socket.on('disconnect', () => {
            setConnected(false);
            console.log('Socket disconnected');
        });

        // server emits 'event' in the backend; listen for it
        socket.on('event', (payload) => {
            // payload expected: { id, productName, status, meta }
            console.log('Received event', payload);
            setOrders((prev) => {
                const idx = prev.findIndex((p) => String(p.id) === String(payload.id));
                const nowTs = new Date().toISOString();
                if (idx === -1) {
                    const newItem = {
                        id: payload.id || Math.random().toString(36).slice(2),
                        productName: payload.productName || payload.name || 'Unknown',
                        status: payload.status || 'ordered',
                        timeline: [{ status: payload.status || 'ordered', ts: nowTs }],
                        eta: null,
                    };
                    newItem.eta = predictETA(newItem);
                    return [newItem, ...prev];
                } else {
                    const copy = [...prev];
                    const item = { ...copy[idx] };
                    // append timeline
                    item.timeline = [...(item.timeline || []), { status: payload.status, ts: nowTs }];
                    item.status = payload.status;
                    item.eta = predictETA(item);
                    copy[idx] = item;
                    return copy;
                }
            });
        });

        return () => {
            mounted = false;
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    function renderTimeline(timeline = []) {
        return (
            <View style={styles.timeline}>
                {STAGES.map((s) => {
                    const entry = timeline.find((t) => t.status === s);
                    return (
                        <View key={s} style={styles.timelineRow}>
                            <Text style={styles.stage}>{s.replace(/_/g, ' ')}</Text>
                            <Text style={styles.stageTime}>{entry ? new Date(entry.ts).toLocaleString() : '—'}</Text>
                        </View>
                    );
                })}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bucketlist</Text>
                <Text style={styles.sub}>{connected ? 'Live' : 'Offline'}</Text>
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ paddingBottom: 120 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.name}>{item.productName}</Text>
                            <Text style={styles.status}>{item.status}</Text>
                        </View>
                        <Text style={styles.eta}>ETA: {item.eta ? new Date(item.eta).toLocaleString() : 'Calculating...'}</Text>
                        <ScrollView horizontal style={{ marginTop: 8 }}>{renderTimeline(item.timeline)}</ScrollView>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No items in bucketlist</Text>}
            />

            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '700' },
    sub: { fontSize: 12, color: 'gray' },
    card: { padding: 12, marginHorizontal: 12, marginVertical: 8, borderRadius: 8, backgroundColor: '#f7f7f8' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    name: { fontSize: 16, fontWeight: '600' },
    status: { fontSize: 14, color: 'dodgerblue' },
    eta: { marginTop: 6, fontSize: 12, color: 'gray' },
    timeline: { flexDirection: 'row', paddingVertical: 8 },
    timelineRow: { width: 160, paddingRight: 12 },
    stage: { fontSize: 12, fontWeight: '600' },
    stageTime: { fontSize: 11, color: 'gray' },
    empty: { padding: 24, textAlign: 'center', color: 'gray' },
});