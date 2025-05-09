
import React from 'react';
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
  User 
} from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser } from "@/data/mockData";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-2xl mx-auto">
        {/* Left section: Logo and search */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center">
            {/* EduHub logo */}
            <Link to="/" className="flex items-center">
              <svg className="w-10 h-10 text-blue-600" viewBox="0 0 36 36">
                <path fill="currentColor" d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0z"></path>
                <path fill="white" d="M26 12H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2zm-7 3h5v2h-5v-2zm0 4h5v2h-5v-2zm-6-4h4v8h-4v-8z"></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-blue-600">EduHub</span>
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
              <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-blue-600 hover:bg-transparent hover:text-blue-600">
                <Home className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/videos">
              <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-blue-600 hover:bg-transparent hover:text-blue-600">
                <Video className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-blue-600 hover:bg-transparent hover:text-blue-600">
                <BookOpen className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/messaging">
              <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-blue-600 hover:bg-transparent hover:text-blue-600">
                <MessageCircle className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </nav>
        
        {/* Mobile menu icon */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Right section: User actions */}
        <div className="flex items-center space-x-2">
          <Link to="/messaging">
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-300">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-300">
            <Bell className="h-5 w-5" />
          </Button>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-300">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full p-0 overflow-hidden">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={currentUser.profilePic} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
