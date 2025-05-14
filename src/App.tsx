
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Videos from "./pages/Videos";
import Resources from "./pages/Resources";
import Messaging from "./pages/Messaging";
import Settings from "./pages/Settings";
import { supabase } from "./integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

// Create auth context to manage authentication state
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  isGuest: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: object) => Promise<void>;
  logout: () => Promise<void>;
}>({
  isAuthenticated: false,
  isGuest: false,
  user: null,
  session: null,
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        // Check if this is a guest user
        if (currentSession?.user?.email === 'guest@eduhub.com') {
          setIsGuest(true);
        } else {
          setIsGuest(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAuthenticated(!!currentSession);
      
      // Check if this is a guest user
      if (currentSession?.user?.email === 'guest@eduhub.com') {
        setIsGuest(true);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Auth state will be updated by onAuthStateChange
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, userData: object) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      
      // Auth state will be updated by onAuthStateChange
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Auth state will be updated by onAuthStateChange
      setIsGuest(false);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isGuest, 
      user, 
      session,
      login, 
      signUp,
      logout 
    }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={isAuthenticated ? <Index /> : <Navigate to="/sign-in" />} 
              />
              <Route 
                path="/sign-in" 
                element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />} 
              />
              <Route 
                path="/sign-up" 
                element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} 
              />
              <Route 
                path="/videos" 
                element={isAuthenticated ? <Videos /> : <Navigate to="/sign-in" />} 
              />
              <Route 
                path="/resources" 
                element={isAuthenticated ? <Resources /> : <Navigate to="/sign-in" />} 
              />
              <Route 
                path="/messaging" 
                element={isAuthenticated ? <Messaging /> : <Navigate to="/sign-in" />} 
              />
              <Route 
                path="/settings" 
                element={isAuthenticated ? <Settings /> : <Navigate to="/sign-in" />} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
