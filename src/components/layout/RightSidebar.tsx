
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { chatContacts, users } from "@/data/mockData";
import { Search, MoreHorizontal, Gift } from "lucide-react";

const RightSidebar = () => {
  return (
    <aside className="hidden lg:block w-[280px] p-2 overflow-y-auto h-[calc(100vh-60px)] sticky top-[60px]">
      {/* Sponsored */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-500 px-2 py-1">Sponsored</h3>
        <div className="mt-2 px-2">
          <div className="flex items-start mb-4">
            <div className="min-w-[120px] h-[80px] rounded-lg overflow-hidden mr-3">
              <img 
                src="https://source.unsplash.com/random/120x80/?product" 
                alt="Advertisement"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Quality Products You'll Love</p>
              <p className="text-xs text-gray-500">website.com</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="min-w-[120px] h-[80px] rounded-lg overflow-hidden mr-3">
              <img 
                src="https://source.unsplash.com/random/120x80/?tech" 
                alt="Advertisement" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Tech Gadgets on Sale</p>
              <p className="text-xs text-gray-500">techstore.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b my-2"></div>
      
      {/* Birthdays */}
      <div className="mb-4 p-2">
        <h3 className="font-semibold text-gray-500 mb-2">Birthdays</h3>
        <div className="flex items-center">
          <Gift className="h-8 w-8 text-facebook-primary mr-2" />
          <p className="text-sm">
            <span className="font-semibold">Sarah Wilson</span> and <span className="font-semibold">2 others</span> have birthdays today.
          </p>
        </div>
      </div>
      
      <div className="border-b my-2"></div>
      
      {/* Friend requests */}
      <div className="mb-4 p-2">
        <h3 className="font-semibold text-gray-500 mb-2">Friend Requests</h3>
        <div className="space-y-3">
          {users.slice(0, 2).map(user => (
            <div key={user.id} className="flex items-start">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={user.profilePic} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">3 mutual friends</p>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" className="bg-facebook-primary hover:bg-facebook-hover text-white">
                    Confirm
                  </Button>
                  <Button size="sm" variant="outline">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-b my-2"></div>
      
      {/* Contacts */}
      <div>
        <div className="flex justify-between items-center px-2 mb-2">
          <h3 className="font-semibold text-gray-500">Contacts</h3>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-1">
          {chatContacts.map((contact) => (
            <Button key={contact.id} variant="ghost" className="w-full justify-start">
              <div className="relative">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={contact.user.profilePic} alt={contact.user.name} />
                  <AvatarFallback>{contact.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {contact.active && (
                  <span className="absolute bottom-0 right-2 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white"></span>
                )}
              </div>
              <span className="text-sm">{contact.user.name}</span>
              {contact.unread > 0 && (
                <Badge variant="destructive" className="ml-auto py-0 px-1.5 h-5 min-w-[20px]">
                  {contact.unread}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
