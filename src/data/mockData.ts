
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

// Mock user profiles
export const users = [
  {
    id: "1",
    name: "You",
    profilePic: "/placeholder.svg",
    coverPhoto: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Alex Johnson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    coverPhoto: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Taylor Swift",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    coverPhoto: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Priya Sharma",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    coverPhoto: "/placeholder.svg",
  }
];

// Current user profile (placeholder for authenticated user)
export const currentUser = users[0];

// Mock posts data
export const posts = [
  {
    id: "1",
    user: users[1],
    content: "Just finished my biology project on photosynthesis! 🌱 Learning about how plants convert light energy into chemical energy was fascinating. Here's a diagram I created to show the process.",
    image: "https://picsum.photos/seed/science1/600/400",
    likes: 25,
    comments: 7,
    shares: 3,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: users[2],
    content: "Today's math lesson was about quadratic equations. I finally understand how to complete the square! 📝 Does anyone want to practice some problems together?",
    likes: 18,
    comments: 12,
    shares: 1,
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    user: users[3],
    content: "Our history class is starting a new project on ancient civilizations. I'm researching the Indus Valley Civilization. Anyone have good resource recommendations?",
    image: "https://picsum.photos/seed/history1/600/400",
    likes: 37,
    comments: 9,
    shares: 6,
    timestamp: "Yesterday",
  },
  {
    id: "4",
    user: users[1],
    content: "Check out the science fair project I'm working on! It's a small solar-powered water purification system. ☀️💧",
    image: "https://picsum.photos/seed/science2/600/400",
    likes: 42,
    comments: 14,
    shares: 8,
    timestamp: "3 days ago",
  }
];

// Mock stories data
export const stories = [
  {
    id: "1",
    user: users[1],
    image: "https://picsum.photos/seed/story1/400/600",
    viewed: false,
  },
  {
    id: "2",
    user: users[2],
    image: "https://picsum.photos/seed/story2/400/600",
    viewed: false,
  },
  {
    id: "3",
    user: users[3],
    image: "https://picsum.photos/seed/story3/400/600",
    viewed: true,
  }
];

// Mock videos data
export const videos = [
  {
    id: "1",
    user: users[1],
    title: "Understanding Cellular Respiration",
    description: "A comprehensive guide to how cells convert nutrients into energy through respiration.",
    video_url: "https://example.com/videos/cellular-respiration",
    thumbnail_url: "https://picsum.photos/seed/video1/600/400",
    created_at: new Date().toLocaleString(),
  },
  {
    id: "2",
    user: users[2],
    title: "Calculus Fundamentals: Derivatives",
    description: "Learn the basics of derivatives and their applications in calculus.",
    video_url: "https://example.com/videos/calculus-derivatives",
    thumbnail_url: "https://picsum.photos/seed/video2/600/400",
    created_at: new Date(Date.now() - 86400000).toLocaleString(),
  },
  {
    id: "3",
    user: users[3],
    title: "The Renaissance Period: Art and Culture",
    description: "Exploring the cultural and artistic achievements of the Renaissance period.",
    video_url: "https://example.com/videos/renaissance",
    thumbnail_url: "https://picsum.photos/seed/video3/600/400",
    created_at: new Date(Date.now() - 172800000).toLocaleString(),
  }
];

// Mock educational resources
export const resources = [
  {
    id: "1",
    user: users[1],
    title: "Biology Study Guide: Photosynthesis",
    description: "A comprehensive study guide for understanding photosynthesis in plants.",
    file_url: "https://example.com/files/photosynthesis-guide.pdf",
    category: "Biology",
    created_at: new Date().toLocaleString(),
  },
  {
    id: "2",
    user: users[2],
    title: "Algebra Practice Problems",
    description: "A collection of practice problems covering key algebraic concepts.",
    file_url: "https://example.com/files/algebra-practice.pdf",
    category: "Mathematics",
    created_at: new Date(Date.now() - 86400000).toLocaleString(),
  },
  {
    id: "3",
    user: users[3],
    title: "World History Timeline",
    description: "An interactive timeline of major world history events from ancient civilizations to modern times.",
    file_url: "https://example.com/files/history-timeline.pptx",
    category: "History",
    created_at: new Date(Date.now() - 172800000).toLocaleString(),
  },
  {
    id: "4",
    user: users[1],
    title: "Chemistry Lab Safety Guidelines",
    description: "Important guidelines for maintaining safety in chemistry laboratory experiments.",
    file_url: "https://example.com/files/lab-safety.pdf",
    category: "Chemistry",
    created_at: new Date(Date.now() - 259200000).toLocaleString(),
  }
];

// Navigation items
export const mainNavItems = [
  { id: "1", name: "Home", icon: Home },
  { id: "2", name: "Videos", icon: Video },
  { id: "3", name: "Resources", icon: BookOpen },
];

// Shortcut items
export const shortcutItems = [
  { id: "1", name: "Study Groups", icon: Users },
  { id: "2", name: "School Events", icon: CalendarDays },
  { id: "3", name: "Educational Games", icon: Flag },
];

// Secondary navigation items
export const secondaryNavItems = [
  { id: "1", name: "Settings", icon: Settings },
  { id: "2", name: "Help & Support", icon: HelpCircle },
];

// Mock chat contacts
export const chatContacts = [
  {
    id: "1",
    name: "Alex Johnson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastMessage: "Do you have the notes from yesterday's class?",
    timestamp: "10:30 AM",
    unread: 2,
    online: true
  },
  {
    id: "2",
    name: "Taylor Swift",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    lastMessage: "I'll share the study guide with you.",
    timestamp: "Yesterday",
    unread: 0,
    online: false
  },
  {
    id: "3",
    name: "Priya Sharma",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    lastMessage: "Are you joining the study group today?",
    timestamp: "Monday",
    unread: 0,
    online: true
  }
];

// Mock notifications
export const notifications = [
  {
    id: "1",
    type: "like",
    user: users[1],
    content: "Alex Johnson liked your post about quantum physics.",
    timestamp: "2 hours ago",
    read: false
  },
  {
    id: "2",
    type: "comment",
    user: users[2],
    content: "Taylor Swift commented on your biology project.",
    timestamp: "Yesterday",
    read: true
  },
  {
    id: "3",
    type: "share",
    user: users[3],
    content: "Priya Sharma shared your math notes with their study group.",
    timestamp: "3 days ago",
    read: true
  },
  {
    id: "4",
    type: "event",
    content: "Reminder: Science fair submissions due this Friday!",
    timestamp: "Just now",
    read: false
  }
];
