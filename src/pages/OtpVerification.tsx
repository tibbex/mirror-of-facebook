
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { AuthContext } from "../App";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, linkWithCredential } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with actual Firebase API key
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [remainingTime, setRemainingTime] = useState(60);
  const [verificationId, setVerificationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  
  // Get phone number and other data from location state
  const { phoneNumber, email, password, userData, isSignUp } = location.state || {};
  
  useEffect(() => {
    // Setup invisible reCAPTCHA
    if (!recaptchaVerified) {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          setRecaptchaVerified(true);
          sendOtp();
        }
      });
      
      // Send OTP when component mounts
      const sendInitialOtp = async () => {
        try {
          setIsLoading(true);
          const formattedPhoneNumber = `+${phoneNumber}`; // Ensure proper formatting
          const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);
          setVerificationId(confirmationResult.verificationId);
          toast.success("OTP sent to your phone number!");
          startTimer();
        } catch (error: any) {
          console.error("Error sending OTP:", error);
          toast.error(error.message || "Failed to send OTP");
        } finally {
          setIsLoading(false);
        }
      };
      
      sendInitialOtp();
    }
    
    // Cleanup
    return () => {
      // Cleanup if needed
    };
  }, [phoneNumber]);
  
  // Timer countdown
  const startTimer = () => {
    setRemainingTime(60);
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  };
  
  // Resend OTP
  const sendOtp = async () => {
    try {
      setIsLoading(true);
      const formattedPhoneNumber = `+${phoneNumber}`; // Ensure proper formatting
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
      
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      toast.success("OTP resent to your phone number!");
      startTimer();
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Verify OTP
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create credential from verification ID and code
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      
      if (isSignUp) {
        // For sign-up flow: complete registration
        // First create user with email/password, then link phone
        await auth.signOut(); // Make sure no user is currently signed in
        
        // Sign up with Supabase
        await login(email, password);
        toast.success("Account created successfully!");
      } else {
        // For sign-in flow: verify phone and login
        await login(email, password);
        toast.success("Phone number verified successfully!");
      }
      
      navigate('/');
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error(error.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
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
          <CardTitle className="text-2xl font-bold">Verify Your Phone</CardTitle>
          <CardDescription>Enter the verification code sent to {phoneNumber}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <div id="recaptcha-container"></div>
            
            <div className="text-center mt-4">
              {remainingTime > 0 ? (
                <p className="text-sm text-gray-500">Resend code in {remainingTime} seconds</p>
              ) : (
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600" 
                  onClick={sendOtp} 
                  disabled={isLoading}
                >
                  Resend Code
                </Button>
              )}
            </div>
          </div>
          
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            onClick={verifyOtp} 
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="ghost" 
            className="text-gray-500 hover:text-gray-700" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OtpVerification;
