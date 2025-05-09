
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
  Users, 
  Video, 
  Building2, 
  ChevronDown 
} from "lucide-react";
import { currentUser } from "@/data/mockData";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-2xl mx-auto">
        {/* Left section: Logo and search */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center">
            {/* Facebook logo */}
            <svg className="w-10 h-10 text-facebook-primary" viewBox="0 0 36 36">
              <path fill="currentColor" d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"></path>
              <path fill="#fff" d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.168-.086-2.082-.086-2.941 0-3.967 1.381-3.967 4.01V18h5.883l-.894 5.502h-4.99v11.742a18.11 18.11 0 0 0 2.705-.271V36h-.681l-8.669-.529Z"></path>
            </svg>
          </div>
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search Facebook" 
              className="pl-10 bg-gray-100 border-none rounded-full w-full md:w-60 lg:w-72"
            />
          </div>
        </div>

        {/* Middle section: Main navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex space-x-1 lg:space-x-2">
            <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-facebook-primary hover:bg-transparent hover:text-facebook-primary">
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-facebook-primary hover:bg-transparent hover:text-facebook-primary">
              <Users className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-facebook-primary hover:bg-transparent hover:text-facebook-primary">
              <Video className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="px-3 lg:px-6 py-6 rounded-none border-b-2 border-transparent hover:border-facebook-primary hover:bg-transparent hover:text-facebook-primary">
              <Building2 className="h-6 w-6" />
            </Button>
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
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-300">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-300">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full p-0 overflow-hidden">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={currentUser.profilePic} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
