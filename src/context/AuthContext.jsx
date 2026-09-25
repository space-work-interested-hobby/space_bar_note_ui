/**
 * ============================================================
 * AUTH CONTEXT
 * ============================================================
 * Manages authentication state across the app
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, signInWithGoogle, signOut as supabaseSignOut } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile from database
  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  }, []);

  // Create profile for new user
  const createProfile = useCallback(async (userId, metadata = {}) => {
    try {
      const { data, error } = await supabase.rpc('create_profile', {
        p_display_name: metadata.full_name || metadata.email?.split('@')[0] || 'User',
        p_username: metadata.username || null
      });

      if (error) {
        console.error('Error creating profile:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error creating profile:', err);
      return null;
    }
  }, []);

  // Sign in with email/password
  const signInWithEmail = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setError(error.message);
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (err) {
      setError(err.message);
      return { user: null, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  // Sign up with email/password
  const signUpWithEmail = useCallback(async (email, password, metadata = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.displayName || metadata.email?.split('@')[0],
            username: metadata.username
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        setError(error.message);
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (err) {
      setError(err.message);
      return { user: null, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  // Sign in with Google
  const handleGoogleSignIn = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signInWithGoogle();
      return { error: null };
    } catch (err) {
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    setLoading(true);
    
    try {
      await supabaseSignOut();
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset password request
  const resetPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      return { error: null };
    } catch (err) {
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setProfile(data);
      return { data };
    } catch (err) {
      return { error: err };
    }
  }, [user]);

  // Initialize auth state listener
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          
          // Fetch profile
          const userProfile = await fetchProfile(session.user.id);
          
          // If no profile exists, create one (for OAuth users)
          if (!userProfile && session.user) {
            const newProfile = await createProfile(session.user.id, {
              full_name: session.user.user_metadata?.full_name,
              username: session.user.user_metadata?.username
            });
            setProfile(newProfile);
          } else {
            setProfile(userProfile);
          }
        }
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          
          // Check if profile exists
          const userProfile = await fetchProfile(session.user.id);
          
          if (!userProfile) {
            const newProfile = await createProfile(session.user.id, {
              full_name: session.user.user_metadata?.full_name,
              username: session.user.user_metadata?.username
            });
            setProfile(newProfile);
          } else {
            setProfile(userProfile);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile, createProfile]);

  const value = {
    user,
    profile,
    loading,
    error,
    isAuthenticated: !!user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle: handleGoogleSignIn,
    signOut,
    resetPassword,
    updateProfile,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
