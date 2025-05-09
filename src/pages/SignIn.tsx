
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication - in real app, this would use Supabase
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully signed in!");
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-blue-600" viewBox="0 0 36 36">
              <path fill="currentColor" d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0z"></path>
              <path fill="white" d="M26 12H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2zm-7 3h5v2h-5v-2zm0 4h5v2h-5v-2zm-6-4h4v8h-4v-8z"></path>
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold">Sign in to EduHub</CardTitle>
          <CardDescription>Enter your username and phone number to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input 
                id="username"
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <Input 
                id="phone"
                type="tel" 
                placeholder="Enter your phone number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
