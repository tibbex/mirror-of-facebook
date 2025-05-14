
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  MessageCircle, 
  Search, 
  Menu, 
  Home,
  Video,
  BookOpen,
  Settings,
  X 
} from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-2xl mx-auto">
        {/* Left section: Logo and search */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center">
            {/* Updated colorful open book logo */}
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-md transform rotate-6"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">EduHub</span>
            </Link>
          </div>
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search EduHub" 
              className="pl-10 bg-gray-100 border-none rounded-full w-full md:w-60 lg:w-72"
            />
          </div>
        </div>

        {/* Middle section: Main navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex space-x-1 lg:space-x-2">
            <Link to="/">
              <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-blue-600 hover:bg-gradient-to-b hover:from-blue-50 hover:to-transparent hover:text-blue-600">
                <Home className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/videos">
              <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-purple-600 hover:bg-gradient-to-b hover:from-purple-50 hover:to-transparent hover:text-purple-600">
                <Video className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-pink-600 hover:bg-gradient-to-b hover:from-pink-50 hover:to-transparent hover:text-pink-600">
                <BookOpen className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/messaging">
              <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-indigo-600 hover:bg-gradient-to-b hover:from-indigo-50 hover:to-transparent hover:text-indigo-600">
                <MessageCircle className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </nav>
        
        {/* Mobile menu icon - improved visibility */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)} 
            className="bg-gray-100 rounded-full hover:bg-gray-200">
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Right section: User actions */}
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <>
              <Link to="/messaging">
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-blue-100 hover:text-blue-600">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-purple-100 hover:text-purple-600">
                <Bell className="h-5 w-5" />
              </Button>
              <Link to="/settings">
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-pink-100 hover:text-pink-600">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full p-0 overflow-hidden">
              <Avatar className="h-10 w-10 border border-gray-200">
                <AvatarImage src={currentUser.profilePic} alt={currentUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu - improved styling */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in shadow-lg rounded-b-lg mx-2">
          <div className="px-4 py-3 space-y-2">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search EduHub" 
                className="pl-10 bg-gray-100 border-none rounded-full w-full"
              />
            </div>
            <Link to="/" className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => setShowMobileMenu(false)}>
              <Home className="h-6 w-6 text-blue-600" />
              <span className="font-medium">Home</span>
            </Link>
            <Link to="/videos" className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => setShowMobileMenu(false)}>
              <Video className="h-6 w-6 text-purple-600" />
              <span className="font-medium">Videos</span>
            </Link>
            <Link to="/resources" className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => setShowMobileMenu(false)}>
              <BookOpen className="h-6 w-6 text-pink-600" />
              <span className="font-medium">Resources</span>
            </Link>
            <Link to="/messaging" className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => setShowMobileMenu(false)}>
              <MessageCircle className="h-6 w-6 text-indigo-600" />
              <span className="font-medium">Messaging</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => setShowMobileMenu(false)}>
              <Settings className="h-6 w-6 text-gray-600" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
