
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useContext } from 'react';
import { AuthContext } from '../../App';

const GuestBanner = () => {
  const { isGuest } = useContext(AuthContext);
  
  if (!isGuest) return null;
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-2">
      <p className="text-sm text-blue-800 font-medium">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md mr-2 font-semibold">Guest Mode</span> 
        You're viewing EduHub in read-only mode
      </p>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button asChild size="sm" variant="outline" className="flex-1 sm:flex-none border-blue-300">
          <Link to="/sign-up">Sign Up</Link>
        </Button>
        <Button asChild size="sm" className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Link to="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default GuestBanner;
