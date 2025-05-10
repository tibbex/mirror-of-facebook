
import React, { useContext, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Home, Video, BookOpen, MessageCircle, Settings } from "lucide-react";
import { AuthContext } from "@/App";
import { supabase } from "@/integrations/supabase/client";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
  active?: boolean;
}

interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
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
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch user profile from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, full_name, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const userName = profile?.full_name || user?.user_metadata?.full_name || "User";
  const userAvatar = profile?.avatar_url || user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";

  return (
    <aside className="hidden md:block w-[300px] p-2 overflow-y-auto h-[calc(100vh-60px)] sticky top-[60px]">
      <div className="py-2">
        <Link to="/settings">
          <Button variant="ghost" className="w-full justify-start mb-2 px-3">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{userName}</span>
          </Button>
        </Link>

        {/* Main Nav Items */}
        <SidebarItem icon={Home} label="Home" to="/" active={location.pathname === '/'} />
        <SidebarItem icon={Video} label="Videos" to="/videos" active={location.pathname === '/videos'} />
        <SidebarItem icon={BookOpen} label="Resources" to="/resources" active={location.pathname === '/resources'} />
        <SidebarItem icon={MessageCircle} label="Messaging" to="/messaging" active={location.pathname === '/messaging'} />
        <SidebarItem icon={Settings} label="Settings" to="/settings" active={location.pathname === '/settings'} />

        <div className="border-t my-2"></div>
        
        <div className="border-t my-4"></div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
