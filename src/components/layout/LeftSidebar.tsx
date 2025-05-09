
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LucideIcon } from "lucide-react";
import { currentUser, mainNavItems, shortcutItems } from "@/data/mockData";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active = false }: SidebarItemProps) => (
  <Button 
    variant="ghost" 
    className={`w-full justify-start mb-1 px-3 ${active ? 'bg-gray-200' : ''}`}
  >
    <Icon className="mr-3 h-5 w-5" />
    <span>{label}</span>
  </Button>
);

const LeftSidebar = () => {
  return (
    <aside className="hidden md:block w-[300px] p-2 overflow-y-auto h-[calc(100vh-60px)] sticky top-[60px]">
      <div className="py-2">
        <Button variant="ghost" className="w-full justify-start mb-2 px-3">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={currentUser.profilePic} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{currentUser.name}</span>
        </Button>

        {/* Main Nav Items */}
        {mainNavItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.name}
            active={item.name === "Home"}
          />
        ))}

        <div className="border-t my-2"></div>

        <h3 className="font-semibold text-gray-500 text-sm px-3 mt-4 mb-2">Your shortcuts</h3>
        
        {/* Shortcut Items */}
        {shortcutItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.name}
          />
        ))}

        <div className="border-t my-2"></div>

        <div className="px-3 text-sm text-gray-500">
          <p className="mb-2">Privacy · Terms · Advertising · Ad choices · Cookies · More · Meta © 2023</p>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
