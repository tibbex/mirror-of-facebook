
import React, { useState, useEffect, useContext } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { MessageCircle, Search, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthContext } from '@/App';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
}

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  recipient_id: string;
  sender_profile?: UserProfile;
  recipient_profile?: UserProfile;
}

const Messaging = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [contacts, setContacts] = useState<UserProfile[]>([]);
  const [selectedContact, setSelectedContact] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  // Fetch contacts (all users for simplicity)
  useEffect(() => {
    const fetchContacts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, username, avatar_url')
          .neq('id', user.id);
        
        if (error) throw error;
        
        if (data) {
          setContacts(data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, [user]);

  // Fetch messages when contact is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !selectedContact) return;
      
      try {
        // Fetch messages between current user and selected contact
        const { data, error } = await supabase
          .from('messages')
          .select(`
            id, 
            content, 
            created_at,
            sender_id,
            recipient_id
          `)
          .or(`and(sender_id.eq.${user.id},recipient_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},recipient_id.eq.${user.id})`)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
    
    // Set up real-time subscription for new messages
    if (user && selectedContact) {
      const messagesSubscription = supabase
        .channel('public:messages')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `or(and(sender_id=eq.${user.id},recipient_id=eq.${selectedContact.id}),and(sender_id=eq.${selectedContact.id},recipient_id=eq.${user.id}))` }, 
          (payload) => {
            // Add new message to state
            setMessages(prev => [...prev, payload.new as Message]);
          }
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(messagesSubscription);
      };
    }
  }, [user, selectedContact]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedContact || !newMessage.trim()) return;
    
    try {
      setSendingMessage(true);
      
      // Insert new message
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: user.id,
            recipient_id: selectedContact.id,
            content: newMessage
          }
        ]);
      
      if (error) throw error;
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto p-4">
          <Card className="bg-white rounded-lg shadow-lg p-6 text-center">
            <CardContent className="pt-4">
              <MessageCircle className="h-12 w-12 mx-auto text-blue-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Messaging</h2>
              <p className="text-gray-500">Sign in to connect with real students and educators.</p>
              <Button asChild className="mt-4" variant="outline">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex h-[calc(80vh-60px)]">
            {/* Contacts sidebar */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    type="search"
                    placeholder="Search contacts..."
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-56px)]">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">Loading contacts...</p>
                  </div>
                ) : contacts.length > 0 ? (
                  <div>
                    {contacts.map(contact => (
                      <div 
                        key={contact.id}
                        className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 ${selectedContact?.id === contact.id ? 'bg-gray-100' : ''}`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage 
                            src={contact.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + contact.username} 
                            alt={contact.full_name || contact.username || "User"} 
                          />
                          <AvatarFallback>{(contact.full_name || contact.username || "U")[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contact.full_name || contact.username || "User"}</p>
                          <p className="text-xs text-gray-500 truncate">Click to start messaging</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">No contacts found</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Chat area */}
            <div className="w-2/3 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Chat header */}
                  <div className="p-3 border-b flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage 
                        src={selectedContact.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + selectedContact.username} 
                        alt={selectedContact.full_name || selectedContact.username || "User"} 
                      />
                      <AvatarFallback>{(selectedContact.full_name || selectedContact.username || "U")[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{selectedContact.full_name || selectedContact.username || "User"}</span>
                  </div>
                  
                  {/* Messages list */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender_id === user?.id 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200'
                        }`}>
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender_id === user?.id 
                              ? 'text-blue-100' 
                              : 'text-gray-500'
                          }`}>
                            {new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {messages.length === 0 && (
                      <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Message input */}
                  <form onSubmit={sendMessage} className="p-3 border-t flex">
                    <Input 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 mr-2"
                    />
                    <Button 
                      type="submit"
                      disabled={!newMessage.trim() || sendingMessage}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Select a contact to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messaging;
