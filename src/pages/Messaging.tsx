
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Phone, Video, Info } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const Messaging = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg", lastMessage: "Did you get the math notes?", time: "2:30 PM", unread: 1 },
    { id: 2, name: "Study Group - Chemistry", avatar: "/placeholder.svg", lastMessage: "Prof mentioned an exam next week", time: "1:15 PM", unread: 3 },
    { id: 3, name: "Sarah Williams", avatar: "/placeholder.svg", lastMessage: "Thanks for the help with the project", time: "Yesterday", unread: 0 },
    { id: 4, name: "Michael Chen", avatar: "/placeholder.svg", lastMessage: "Are we meeting at the library today?", time: "Yesterday", unread: 0 },
    { id: 5, name: "History Class Group", avatar: "/placeholder.svg", lastMessage: "You: I'll share my notes tonight", time: "Sunday", unread: 0 },
  ]);
  
  const [activeConversation, setActiveConversation] = useState<number>(1);
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! Did you get the math notes from class today?", sender: "other", timestamp: "2:30 PM" },
    { id: 2, text: "Not yet, I was planning to ask you for them", sender: "user", timestamp: "2:31 PM" },
    { id: 3, text: "I can share them with you. There's a quiz tomorrow on chapter 7", sender: "other", timestamp: "2:32 PM" },
    { id: 4, text: "That would be great, thanks! Should I prepare for any specific topics?", sender: "user", timestamp: "2:33 PM" },
    { id: 5, text: "Focus on logarithms and exponential functions. The professor mentioned those will be key", sender: "other", timestamp: "2:35 PM" },
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
          <div className="flex h-full">
            {/* Conversations sidebar */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold">Messages</h2>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search messages" className="pl-10" />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map(conversation => (
                  <div 
                    key={conversation.id} 
                    className={`p-3 cursor-pointer flex items-center ${activeConversation === conversation.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <Avatar className="mr-3">
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{conversation.name}</p>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              <div className="p-3 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="mr-3">
                    <AvatarImage src="/placeholder.svg" alt="Alex Johnson" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'other' && (
                      <Avatar className="mr-2 mt-1">
                        <AvatarImage src="/placeholder.svg" alt="Alex Johnson" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[70%] ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-2xl p-3`}>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t">
                <form onSubmit={sendMessage} className="flex items-center space-x-2">
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
