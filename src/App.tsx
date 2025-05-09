
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

// Create auth context to manage authentication state
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("eduHubUser");
    if (userLoggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    // In a real app, this would include actual token storage
    localStorage.setItem("eduHubUser", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("eduHubUser");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
