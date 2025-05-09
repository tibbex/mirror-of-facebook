
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useContext } from 'react';
import { AuthContext } from '../../App';

const GuestBanner = () => {
  const { isGuest } = useContext(AuthContext);
  
  if (!isGuest) return null;
  
  return (
    <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2 flex justify-between items-center">
      <p className="text-sm text-yellow-800">
        <span className="font-medium">Guest Mode:</span> You're viewing EduHub in read-only mode.
      </p>
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link to="/sign-up">Sign Up</Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default GuestBanner;
