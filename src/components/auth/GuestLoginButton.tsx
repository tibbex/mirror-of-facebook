
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../../App";
import { useContext } from "react";

const GuestLoginButton = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleGuestLogin = () => {
    setIsLoading(true);
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timer);
          // Set guest session
          login();
          localStorage.setItem("eduHubGuest", "true");
          toast.success("Logged in as guest");
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleGuestLogin} 
      disabled={isLoading || countdown !== null}
      className="w-full"
    >
      {countdown !== null 
        ? `Redirecting in ${countdown}...` 
        : "Continue as Guest"}
    </Button>
  );
};

export default GuestLoginButton;
