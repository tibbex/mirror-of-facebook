
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Home, Video, BookOpen, MessageCircle, Settings, Bookmark, GraduationCap, Users } from "lucide-react";
import { currentUser } from "@/data/mockData";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, active = false }: SidebarItemProps) => (
  <Link to={to}>
    <Button 
      variant="ghost" 
      className={`w-full justify-start mb-1 px-3 ${active ? 'bg-gray-200' : ''}`}
    >
      <Icon className="mr-3 h-5 w-5" />
      <span>{label}</span>
    </Button>
  </Link>
);

const LeftSidebar = () => {
  return (
    <aside className="hidden md:block w-[300px] p-2 overflow-y-auto h-[calc(100vh-60px)] sticky top-[60px]">
      <div className="py-2">
        <Link to="/settings">
          <Button variant="ghost" className="w-full justify-start mb-2 px-3">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={currentUser.profilePic} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{currentUser.name}</span>
          </Button>
        </Link>

        {/* Main Nav Items */}
        <SidebarItem icon={Home} label="Home" to="/" active={true} />
        <SidebarItem icon={Video} label="Videos" to="/videos" />
        <SidebarItem icon={BookOpen} label="Resources" to="/resources" />
        <SidebarItem icon={MessageCircle} label="Messaging" to="/messaging" />
        <SidebarItem icon={Settings} label="Settings" to="/settings" />

        <div className="border-t my-2"></div>

        <h3 className="font-semibold text-gray-500 text-sm px-3 mt-4 mb-2">Education</h3>
        
        {/* Education shortcuts */}
        <SidebarItem icon={GraduationCap} label="My Classes" to="#" />
        <SidebarItem icon={Bookmark} label="Saved Resources" to="#" />
        <SidebarItem icon={Users} label="Study Groups" to="#" />

        <div className="border-t my-2"></div>

        <div className="px-3 text-sm text-gray-500">
          <p className="mb-2">Privacy · Terms · Guidelines · Help · © 2023 EduHub</p>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
