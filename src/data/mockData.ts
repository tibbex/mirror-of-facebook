
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
export const currentUser = {
  id: "1",
  name: "You",
  profilePic: "/placeholder.svg",
  coverPhoto: "/placeholder.svg",
};

// Mock posts data
export const posts = [
  {
    id: "1",
    user: {
      id: "2",
      name: "Sarah Johnson",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    content: "Just finished my science project on renewable energy! Can't wait to present it tomorrow. #ScienceFair #RenewableEnergy",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop",
    likes: 24,
    comments: 5,
    shares: 2,
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    user: {
      id: "3",
      name: "Michael Chen",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    content: "Our school debate team just won regionals! So proud of everyone's hard work and dedication. Next stop: nationals! 🏆 #DebateTeam #Champions",
    likes: 42,
    comments: 8,
    shares: 5,
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    user: {
      id: "4",
      name: "Emma Peterson",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    },
    content: "Looking for study buddies for the upcoming calculus exam. Anyone interested in forming a study group this weekend?",
    likes: 15,
    comments: 12,
    shares: 0,
    timestamp: "Yesterday"
  }
];

// Mock stories data
export const stories = [
  {
    id: "1",
    user: {
      id: "2",
      name: "Sarah Johnson",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1000&auto=format&fit=crop",
    viewed: false
  },
  {
    id: "2",
    user: {
      id: "3",
      name: "Michael Chen",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
    viewed: false
  },
  {
    id: "3",
    user: {
      id: "4",
      name: "Emma Peterson",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    viewed: true
  },
  {
    id: "4",
    user: {
      id: "5",
      name: "James Wilson",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
    },
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop",
    viewed: false
  }
];

// Mock users data
export const users = [
  {
    id: "2",
    name: "Sarah Johnson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    role: "Student",
    school: "Westfield High School",
    grade: "11th Grade",
    lastActive: "Active now"
  },
  {
    id: "3",
    name: "Michael Chen",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    role: "Student",
    school: "Oakridge Academy",
    grade: "12th Grade",
    lastActive: "2 hours ago"
  },
  {
    id: "4",
    name: "Emma Peterson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    role: "Student",
    school: "Westfield High School",
    grade: "10th Grade",
    lastActive: "Active now"
  },
  {
    id: "5",
    name: "James Wilson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    role: "Teacher",
    school: "Oakridge Academy",
    subject: "Physics",
    lastActive: "1 day ago"
  }
];

// Navigation items
export const mainNavItems = [
  { id: "1", name: "Home", icon: Home },
  { id: "2", name: "Videos", icon: Video },
  { id: "3", name: "Resources", icon: BookOpen },
];

// Secondary navigation items
export const secondaryNavItems = [
  { id: "1", name: "Settings", icon: Settings },
  { id: "2", name: "Help & Support", icon: HelpCircle },
];

// Mock chat contacts
export const chatContacts = [
  {
    id: "2",
    name: "Sarah Johnson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Did you finish the math homework?",
    time: "10:42 AM",
    unread: 2
  },
  {
    id: "3",
    name: "Michael Chen",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    lastMessage: "The debate practice is at 4pm tomorrow.",
    time: "Yesterday",
    unread: 0
  },
  {
    id: "4",
    name: "Emma Peterson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastMessage: "Can you share your notes from today's biology class?",
    time: "Monday",
    unread: 0
  },
  {
    id: "5",
    name: "James Wilson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    lastMessage: "Don't forget to submit your assignment by Friday.",
    time: "Aug 28",
    unread: 1
  }
];

// Mock notifications
export const notifications = [
  {
    id: "1",
    type: "comment",
    user: {
      id: "2",
      name: "Sarah Johnson",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    content: "commented on your post",
    time: "15 min ago",
    read: false
  },
  {
    id: "2",
    type: "like",
    user: {
      id: "3",
      name: "Michael Chen",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    content: "liked your photo",
    time: "2 hours ago",
    read: false
  },
  {
    id: "3",
    type: "resource",
    user: {
      id: "5",
      name: "James Wilson",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
    },
    content: "shared a new resource: 'Physics Final Review'",
    time: "Yesterday",
    read: true
  },
  {
    id: "4",
    type: "event",
    content: "Science Fair registration closes tomorrow",
    time: "2 days ago",
    read: true
  }
];

// Shortcuts
export const shortcutItems = [
  { id: "1", name: "Study Groups", icon: Users },
  { id: "2", name: "School Events", icon: CalendarDays },
  { id: "3", name: "Resource Library", icon: BookOpen },
  { id: "4", name: "Homework Help", icon: ClipboardList },
];
