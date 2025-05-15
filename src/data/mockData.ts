
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
    coverPhoto: "https://picsum.photos/seed/cover1/1200/300",
  },
  {
    id: "3",
    name: "Taylor Swift",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    coverPhoto: "https://picsum.photos/seed/cover2/1200/300",
  },
  {
    id: "4",
    name: "Priya Sharma",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    coverPhoto: "https://picsum.photos/seed/cover3/1200/300",
  },
  {
    id: "5",
    name: "Chris Martinez",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
    coverPhoto: "https://picsum.photos/seed/cover4/1200/300",
  },
  {
    id: "6",
    name: "Emma Wilson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    coverPhoto: "https://picsum.photos/seed/cover5/1200/300",
  },
  {
    id: "7",
    name: "Michael Chen",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    coverPhoto: "https://picsum.photos/seed/cover6/1200/300",
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
  },
  {
    id: "5",
    user: users[4],
    content: "Just got back from the school field trip to the Natural History Museum! Look at this amazing dinosaur skeleton we saw! 🦖",
    image: "https://picsum.photos/seed/museum/600/400",
    likes: 83,
    comments: 27,
    shares: 12,
    timestamp: "2 days ago",
  },
  {
    id: "6",
    user: users[5],
    content: "Finished my English literature essay on Shakespeare's use of symbolism in Macbeth. Never thought I'd enjoy analyzing 16th-century literature so much! 📚",
    likes: 19,
    comments: 8,
    shares: 2,
    timestamp: "6 hours ago",
  },
  {
    id: "7",
    user: users[6],
    content: "My coding club just finished our first group project - a website that helps students find tutors for different subjects. Check out the link below!",
    image: "https://picsum.photos/seed/coding/600/400",
    likes: 65,
    comments: 22,
    shares: 15,
    timestamp: "1 day ago",
  },
  {
    id: "8",
    user: users[2],
    content: "Excited to share that our school band won first place at the regional competition! Here's us performing our winning piece. 🎵🎺",
    image: "https://picsum.photos/seed/band/600/400",
    likes: 112,
    comments: 43,
    shares: 28,
    timestamp: "5 hours ago",
  },
  {
    id: "9",
    user: users[3],
    content: "Just finished my art project exploring different color theory principles. Swipe to see how I used complementary and analogous color schemes! 🎨",
    image: "https://picsum.photos/seed/art/600/400",
    likes: 54,
    comments: 16,
    shares: 7,
    timestamp: "4 hours ago",
  },
  {
    id: "10",
    user: users[4],
    content: "Our chemistry class experiment today created this amazing color-changing reaction! The teacher explained how different compounds can act as pH indicators. 🧪",
    image: "https://picsum.photos/seed/chemistry/600/400",
    likes: 47,
    comments: 13,
    shares: 5,
    timestamp: "7 hours ago",
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
  },
  {
    id: "4",
    user: users[4],
    image: "https://picsum.photos/seed/story4/400/600",
    viewed: false,
  },
  {
    id: "5",
    user: users[5],
    image: "https://picsum.photos/seed/story5/400/600",
    viewed: false,
  },
  {
    id: "6",
    user: users[6],
    image: "https://picsum.photos/seed/story6/400/600",
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
    views: 1245,
    likes: 89,
    comments: 15
  },
  {
    id: "2",
    user: users[2],
    title: "Calculus Fundamentals: Derivatives",
    description: "Learn the basics of derivatives and their applications in calculus.",
    video_url: "https://example.com/videos/calculus-derivatives",
    thumbnail_url: "https://picsum.photos/seed/video2/600/400",
    created_at: new Date(Date.now() - 86400000).toLocaleString(),
    views: 3872,
    likes: 267,
    comments: 42
  },
  {
    id: "3",
    user: users[3],
    title: "The Renaissance Period: Art and Culture",
    description: "Exploring the cultural and artistic achievements of the Renaissance period.",
    video_url: "https://example.com/videos/renaissance",
    thumbnail_url: "https://picsum.photos/seed/video3/600/400",
    created_at: new Date(Date.now() - 172800000).toLocaleString(),
    views: 2561,
    likes: 178,
    comments: 23
  },
  {
    id: "4",
    user: users[4],
    title: "Introduction to Computer Programming with Python",
    description: "A beginner-friendly introduction to programming concepts using Python.",
    video_url: "https://example.com/videos/python-intro",
    thumbnail_url: "https://picsum.photos/seed/video4/600/400",
    created_at: new Date(Date.now() - 259200000).toLocaleString(),
    views: 5498,
    likes: 412,
    comments: 87
  },
  {
    id: "5",
    user: users[5],
    title: "Physics in Everyday Life: Forces and Motion",
    description: "Understanding how physics principles apply to objects and activities we encounter daily.",
    video_url: "https://example.com/videos/physics-everyday",
    thumbnail_url: "https://picsum.photos/seed/video5/600/400",
    created_at: new Date(Date.now() - 345600000).toLocaleString(),
    views: 1876,
    likes: 134,
    comments: 29
  },
  {
    id: "6",
    user: users[6],
    title: "The Basics of Music Theory",
    description: "Learn about notes, scales, chords, and rhythm in this introduction to music theory.",
    video_url: "https://example.com/videos/music-theory",
    thumbnail_url: "https://picsum.photos/seed/video6/600/400",
    created_at: new Date(Date.now() - 432000000).toLocaleString(),
    views: 4231,
    likes: 298,
    comments: 54
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
    downloads: 157,
    ratings: 4.8
  },
  {
    id: "2",
    user: users[2],
    title: "Algebra Practice Problems",
    description: "A collection of practice problems covering key algebraic concepts.",
    file_url: "https://example.com/files/algebra-practice.pdf",
    category: "Mathematics",
    created_at: new Date(Date.now() - 86400000).toLocaleString(),
    downloads: 243,
    ratings: 4.6
  },
  {
    id: "3",
    user: users[3],
    title: "World History Timeline",
    description: "An interactive timeline of major world history events from ancient civilizations to modern times.",
    file_url: "https://example.com/files/history-timeline.pptx",
    category: "History",
    created_at: new Date(Date.now() - 172800000).toLocaleString(),
    downloads: 198,
    ratings: 4.9
  },
  {
    id: "4",
    user: users[1],
    title: "Chemistry Lab Safety Guidelines",
    description: "Important guidelines for maintaining safety in chemistry laboratory experiments.",
    file_url: "https://example.com/files/lab-safety.pdf",
    category: "Chemistry",
    created_at: new Date(Date.now() - 259200000).toLocaleString(),
    downloads: 132,
    ratings: 4.7
  },
  {
    id: "5",
    user: users[4],
    title: "English Literature: Shakespeare's Works",
    description: "Analysis and interpretation of major themes in Shakespeare's most famous plays.",
    file_url: "https://example.com/files/shakespeare-analysis.pdf",
    category: "Literature",
    created_at: new Date(Date.now() - 345600000).toLocaleString(),
    downloads: 187,
    ratings: 4.5
  },
  {
    id: "6",
    user: users[5],
    title: "Introduction to Web Development",
    description: "A beginner's guide to HTML, CSS, and JavaScript for creating websites.",
    file_url: "https://example.com/files/web-dev-intro.pdf",
    category: "Computer Science",
    created_at: new Date(Date.now() - 432000000).toLocaleString(),
    downloads: 321,
    ratings: 4.8
  },
  {
    id: "7",
    user: users[6],
    title: "Physics Formulas and Equations",
    description: "A comprehensive reference sheet of essential physics formulas for high school and college students.",
    file_url: "https://example.com/files/physics-formulas.pdf",
    category: "Physics",
    created_at: new Date(Date.now() - 518400000).toLocaleString(),
    downloads: 278,
    ratings: 4.9
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
  },
  {
    id: "4",
    name: "Chris Martinez",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
    lastMessage: "Thanks for helping me with that math problem!",
    timestamp: "Tuesday",
    unread: 1,
    online: false
  },
  {
    id: "5",
    name: "Emma Wilson",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastMessage: "Did you see the announcement about the field trip?",
    timestamp: "Wednesday",
    unread: 3,
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
  },
  {
    id: "5",
    type: "friend_request",
    user: users[4],
    content: "Chris Martinez sent you a friend request.",
    timestamp: "1 day ago",
    read: false
  },
  {
    id: "6",
    type: "group",
    user: users[5],
    content: "Emma Wilson added you to the 'AP Chemistry Study Group'.",
    timestamp: "2 days ago",
    read: true
  },
  {
    id: "7",
    type: "mention",
    user: users[6],
    content: "Michael Chen mentioned you in a comment.",
    timestamp: "5 hours ago",
    read: false
  }
];

// Mock group data
export const groups = [
  {
    id: "1",
    name: "AP Biology Study Group",
    members: 28,
    image: "https://picsum.photos/seed/group1/100/100",
    privacy: "Private"
  },
  {
    id: "2",
    name: "Math Competition Team",
    members: 15,
    image: "https://picsum.photos/seed/group2/100/100",
    privacy: "Public"
  },
  {
    id: "3",
    name: "History Enthusiasts",
    members: 42,
    image: "https://picsum.photos/seed/group3/100/100",
    privacy: "Public"
  },
  {
    id: "4",
    name: "Computer Science Club",
    members: 37,
    image: "https://picsum.photos/seed/group4/100/100",
    privacy: "Private"
  }
];

// Mock events
export const events = [
  {
    id: "1",
    title: "End of Year Science Fair",
    date: "2023-06-15T14:00:00",
    location: "School Gymnasium",
    description: "Annual science fair showcasing student projects from all grades.",
    attendees: 120,
    image: "https://picsum.photos/seed/event1/300/200"
  },
  {
    id: "2",
    title: "Math Competition Finals",
    date: "2023-05-28T09:00:00",
    location: "Auditorium",
    description: "Final round of the regional mathematics competition.",
    attendees: 75,
    image: "https://picsum.photos/seed/event2/300/200"
  },
  {
    id: "3",
    title: "Literary Festival",
    date: "2023-06-02T10:00:00",
    location: "School Library",
    description: "A celebration of literature with readings, discussions, and book exchanges.",
    attendees: 90,
    image: "https://picsum.photos/seed/event3/300/200"
  }
];

// Mock courses
export const courses = [
  {
    id: "1",
    title: "Introduction to Molecular Biology",
    instructor: "Dr. Sarah Lee",
    level: "Intermediate",
    duration: "8 weeks",
    enrolled: 47,
    rating: 4.8,
    image: "https://picsum.photos/seed/course1/300/200"
  },
  {
    id: "2",
    title: "Advanced Calculus",
    instructor: "Prof. James Peterson",
    level: "Advanced",
    duration: "12 weeks",
    enrolled: 32,
    rating: 4.6,
    image: "https://picsum.photos/seed/course2/300/200"
  },
  {
    id: "3",
    title: "World History: Ancient Civilizations",
    instructor: "Dr. Maria Rodriguez",
    level: "Beginner",
    duration: "10 weeks",
    enrolled: 59,
    rating: 4.9,
    image: "https://picsum.photos/seed/course3/300/200"
  }
];
