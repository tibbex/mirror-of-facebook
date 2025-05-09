
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

// Mock users
export const currentUser = {
  id: "1",
  name: "Jane Doe",
  profilePic: "https://source.unsplash.com/random/150x150/?portrait&woman",
  coverPhoto: "https://source.unsplash.com/random/1200x400/?nature",
};

export const users = [
  {
    id: "2",
    name: "John Smith",
    profilePic: "https://source.unsplash.com/random/150x150/?portrait&man",
  },
  {
    id: "3",
    name: "Emily Johnson",
    profilePic: "https://source.unsplash.com/random/150x150/?portrait&girl",
  },
  {
    id: "4",
    name: "Michael Brown",
    profilePic: "https://source.unsplash.com/random/150x150/?portrait&boy",
  },
  {
    id: "5",
    name: "Sarah Wilson",
    profilePic: "https://source.unsplash.com/random/150x150/?portrait&woman",
  },
  {
    id: "6",
    name: "David Thompson",
    profilePic: "https://source.unsplash.com/random/150x150/?portrait&man",
  },
];

// Mock posts
export const posts = [
  {
    id: "1",
    user: users[0],
    content: "Just finished an amazing hike in the mountains! The views were breathtaking. #nature #hiking #adventure",
    image: "https://source.unsplash.com/random/800x600/?mountains",
    likes: 42,
    comments: 7,
    shares: 3,
    timestamp: "2h ago",
  },
  {
    id: "2",
    user: users[1],
    content: "Excited to announce that I've started a new position at TechCorp as a Senior Developer! #newjob #career #tech",
    image: "",
    likes: 124,
    comments: 35,
    shares: 8,
    timestamp: "5h ago",
  },
  {
    id: "3",
    user: users[2],
    content: "I made this delicious pasta dish last night. Here's the recipe if anyone wants to try it! #food #cooking #recipe",
    image: "https://source.unsplash.com/random/800x600/?pasta",
    likes: 78,
    comments: 12,
    shares: 5,
    timestamp: "12h ago",
  },
  {
    id: "4",
    user: currentUser,
    content: "Working on a new web development project. Can't wait to share the results! #webdev #coding #project",
    image: "https://source.unsplash.com/random/800x600/?coding",
    likes: 56,
    comments: 8,
    shares: 2,
    timestamp: "1d ago",
  },
  {
    id: "5",
    user: users[3],
    content: "Enjoying my vacation in Italy! The food, the culture, the architecture - everything is amazing! #travel #italy #vacation",
    image: "https://source.unsplash.com/random/800x600/?italy",
    likes: 213,
    comments: 42,
    shares: 15,
    timestamp: "2d ago",
  },
];

// Mock stories
export const stories = [
  {
    id: "1",
    user: currentUser,
    image: "https://source.unsplash.com/random/400x700/?portrait",
    viewed: false,
  },
  {
    id: "2",
    user: users[0],
    image: "https://source.unsplash.com/random/400x700/?travel",
    viewed: false,
  },
  {
    id: "3",
    user: users[1],
    image: "https://source.unsplash.com/random/400x700/?food",
    viewed: true,
  },
  {
    id: "4",
    user: users[2],
    image: "https://source.unsplash.com/random/400x700/?nature",
    viewed: false,
  },
];

// Mock navigation items
export const mainNavItems = [
  { id: "1", name: "Home", icon: Home },
  { id: "2", name: "Friends", icon: Users },
  { id: "3", name: "Watch", icon: Video },
  { id: "4", name: "Marketplace", icon: Building2 },
  { id: "5", name: "Groups", icon: Users },
];

export const shortcutItems = [
  { id: "1", name: "Shopping", icon: ShoppingBag },
  { id: "2", name: "Events", icon: CalendarDays },
  { id: "3", name: "Memories", icon: BookOpen },
  { id: "4", name: "Saved", icon: Flag },
  { id: "5", name: "Pages", icon: ClipboardList },
];

export const secondaryNavItems = [
  { id: "1", name: "Settings", icon: Settings },
  { id: "2", name: "Help & Support", icon: HelpCircle },
];

// Mock chat contacts
export const chatContacts = [
  { id: "1", user: users[0], active: true, unread: 0 },
  { id: "2", user: users[1], active: true, unread: 3 },
  { id: "3", user: users[2], active: false, unread: 0 },
  { id: "4", user: users[3], active: true, unread: 1 },
  { id: "5", user: users[4], active: false, unread: 0 },
];

// Mock notifications
export const notifications = [
  {
    id: "1",
    user: users[0],
    type: "like",
    content: "liked your post",
    time: "1h ago",
    read: false,
  },
  {
    id: "2",
    user: users[1],
    type: "comment",
    content: "commented on your photo",
    time: "3h ago",
    read: true,
  },
  {
    id: "3",
    user: users[2],
    type: "friend",
    content: "accepted your friend request",
    time: "5h ago",
    read: false,
  },
  {
    id: "4",
    user: users[3],
    type: "tag",
    content: "tagged you in a post",
    time: "1d ago",
    read: true,
  },
];
