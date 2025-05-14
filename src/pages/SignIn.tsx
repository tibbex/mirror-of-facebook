
import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { AuthContext } from "../App";
import { useIsMobile } from "@/hooks/use-mobile";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const isMobile = useIsMobile();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success("Successfully signed in!");
      navigate('/');
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-1 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-white" viewBox="0 0 36 36">
              <path fill="currentColor" d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0z"></path>
              <path fill="#1877F2" d="M26 12H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2zm-7 3h5v2h-5v-2zm0 4h5v2h-5v-2zm-6-4h4v8h-4v-8z"></path>
            </svg>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">Welcome Back!</CardTitle>
          <CardDescription className="text-blue-100">Sign in to continue to EduHub</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <Link to="#" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password"
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 bg-gray-50 rounded-b-lg p-6">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
