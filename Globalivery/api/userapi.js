import axiosApi, { setAuthToken } from './axiosClient'
import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'userToken'

export async function getAuthInfo() {
    try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY)
        if (token) setAuthToken(token)
        return token
    } catch (error) {
        console.error('getAuthInfo error:', error)
        return null
    }
}

export async function storeAuthInfo(token) {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token)
        setAuthToken(token)
        return true
    } catch (error) {
        console.error('storeAuthInfo error:', error)
        return false
    }
}

export async function clearAuthInfo() {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        setAuthToken(null)
    } catch (error) {
        console.error('clearAuthInfo error:', error)
    }
}