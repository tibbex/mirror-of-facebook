
import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const GuestLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      setIsLoading(true);
      
      // Use anonymous login if available or a predefined guest account
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'guest@eduhub.com',
        password: 'guestuser123'
      });
      
      if (error) {
        // If guest login fails (perhaps account doesn't exist yet), create it
        if (error.message.includes('Invalid login credentials')) {
          await createGuestAccount();
        } else {
          throw error;
        }
      } else {
        toast.success("Logged in as guest");
        navigate('/');
      }
    } catch (error: any) {
      console.error('Guest login error:', error);
      toast.error(error.message || "Failed to login as guest");
    } finally {
      setIsLoading(false);
    }
  };

  const createGuestAccount = async () => {
    try {
      // Create a guest account
      const { data, error } = await supabase.auth.signUp({
        email: 'guest@eduhub.com',
        password: 'guestuser123',
        options: {
          data: {
            full_name: 'Guest User',
            username: 'guest'
          }
        }
      });
      
      if (error) throw error;
      
      // Try to log in with the new guest account
      await login('guest@eduhub.com', 'guestuser123');
      
      toast.success("Logged in as guest");
      navigate('/');
    } catch (error) {
      console.error('Error creating guest account:', error);
      throw error;
    }
  };

  return (
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={handleGuestLogin}
      disabled={isLoading}
    >
      {isLoading ? "Logging in as guest..." : "Continue as Guest"}
    </Button>
  );
};

export default GuestLoginButton;
