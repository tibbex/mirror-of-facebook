import { 
  Home, 
  Users, 
  Video, 
  Building2, 
  ShoppingBag, 
  CalendarDays, 
  BookOpen, 
  Flag, 
  ClipboardList, 
  Settings, 
  HelpCircle 
} from "lucide-react";

// Real user profile (placeholder for authenticated user)
export const currentUser = {
  id: "1",
  name: "You",
  profilePic: "/placeholder.svg",
  coverPhoto: "/placeholder.svg",
};

// Empty arrays to replace mock data
export const users = [];
export const posts = [];
export const stories = [];

// Navigation items (keeping only essential navigation)
export const mainNavItems = [
  { id: "1", name: "Home", icon: Home },
  { id: "2", name: "Videos", icon: Video },
  { id: "3", name: "Resources", icon: BookOpen },
];

// Empty array for shortcuts (removing fictional shortcuts)
export const shortcutItems = [];

// Essential navigation items
export const secondaryNavItems = [
  { id: "1", name: "Settings", icon: Settings },
  { id: "2", name: "Help & Support", icon: HelpCircle },
];

// Empty array for chat contacts
export const chatContacts = [];

// Empty array for notifications
export const notifications = [];
