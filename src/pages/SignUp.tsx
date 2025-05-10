
import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { AuthContext } from "../App";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
    schoolName: '',
    schoolLocation: '',
    dateOfBirth: '',
    grade: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Validate phone number format (simple validation)
    if (!formData.phoneNumber || !/^\d{10,15}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ''))) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create user metadata object
      const userData = {
        full_name: formData.fullName,
        username: formData.username,
        phone_number: formData.phoneNumber,
        school_name: formData.schoolName,
        school_location: formData.schoolLocation,
        date_of_birth: formData.dateOfBirth,
        grade: formData.grade
      };
      
      // Redirect to OTP verification page with necessary data
      navigate('/otp-verification', {
        state: {
          phoneNumber: formData.phoneNumber.replace(/[^0-9]/g, ''),
          email: formData.email,
          password: formData.password,
          userData,
          isSignUp: true
        }
      });
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Failed to create account");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-blue-600" viewBox="0 0 36 36">
              <path fill="currentColor" d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0z"></path>
              <path fill="white" d="M26 12H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2zm-7 3h5v2h-5v-2zm0 4h5v2h-5v-2zm-6-4h4v8h-4v-8z"></path>
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold">Create an EduHub Account</CardTitle>
          <CardDescription>Enter your details to join the learning community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
              <Input 
                id="fullName"
                name="fullName"
                type="text" 
                placeholder="Enter your full name" 
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="Enter your email address" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>
              <Input 
                id="phoneNumber"
                name="phoneNumber"
                type="tel" 
                placeholder="Enter your phone number" 
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input 
                id="username"
                name="username"
                type="text" 
                placeholder="Choose a username" 
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="schoolName" className="text-sm font-medium">School Name</label>
              <Input 
                id="schoolName"
                name="schoolName"
                type="text" 
                placeholder="Enter your school name" 
                value={formData.schoolName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="schoolLocation" className="text-sm font-medium">School Location</label>
              <Input 
                id="schoolLocation"
                name="schoolLocation"
                type="text" 
                placeholder="Enter your school location" 
                value={formData.schoolLocation}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth</label>
              <Input 
                id="dateOfBirth"
                name="dateOfBirth"
                type="date" 
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="grade" className="text-sm font-medium">Grade</label>
              <Input 
                id="grade"
                name="grade"
                type="text" 
                placeholder="Enter your grade" 
                value={formData.grade}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password"
                name="password"
                type="password" 
                placeholder="Create a password" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type="password" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
