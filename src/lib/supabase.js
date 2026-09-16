/**
 * ============================================================
 * SUPABASE CONFIGURATION
 * ============================================================
 * Kết nối Supabase cho Space Bar Note
 * Sử dụng environment variables từ .env.local
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qwfpbrskynoefqwigedc.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_D_iH9NVayBLZwrdOoK3-QQ_7x2kyGqN';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Device ID management
function getDeviceId() {
    let deviceId = localStorage.getItem('bar_note_device_id');
    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem('bar_note_device_id', deviceId);
    }
    return deviceId;
}

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    },
    global: {
        headers: {
            'x-device-id': getDeviceId()
        }
    }
});

// ============================================================
// GOOGLE OAUTH
// ============================================================

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: `${window.location.origin}/auth/callback`
        }
    });
    
    if (error) {
        console.error('Google sign-in error:', error);
        throw error;
    }
    
    return data;
}

/**
 * Sign out
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Sign out error:', error);
        throw error;
    }
}

/**
 * Get current session
 */
export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Get session error:', error);
        throw error;
    }
    return session;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Get user error:', error);
        throw error;
    }
    return user;
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
}

export { getDeviceId, GOOGLE_CLIENT_ID };
