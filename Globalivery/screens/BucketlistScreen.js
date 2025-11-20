import {useState,useEffect,useReducer} from 'react';
import {View, Text,FlatList,Pressable} from 'react-native';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';

export default function BucketlistScreen() {
    const navigator = useNavigation();

    const initialState = { items: [], loading: false, error: null };

    function reducer(state, action) {
        switch (action.type) {
            case 'FETCH_INIT':
                return { ...state, loading: true, error: null };
            case 'FETCH_SUCCESS':
                return { ...state, loading: false, items: action.payload };
            case 'FETCH_FAILURE':
                return { ...state, loading: false, error: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCart() {
            dispatch({ type: 'FETCH_INIT' });
            try {
                // adjust URL to your Flask endpoint if different
                const res = await fetch('http://localhost:5000/cart', { signal: controller.signal });
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                const data = await res.json();
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                if (err.name === 'AbortError') return;
                dispatch({ type: 'FETCH_FAILURE', payload: err.message || 'Unknown error' });
            }
        }

        fetchCart();
        return () => controller.abort();
    }, []);
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {
            <Pressable>
                <FlatList>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Bucketlist  </Text>
                </FlatList>
            </Pressable>
            
}   
            <Navbar />
        </View>
    );
}