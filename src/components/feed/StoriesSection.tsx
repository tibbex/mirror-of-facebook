
import React from 'react';
import { stories, currentUser } from '@/data/mockData';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const StoriesSection = () => {
  return (
    <div className="mb-4 overflow-hidden">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {/* Create Story Card */}
        <Card className="min-w-[110px] max-w-[110px] h-[200px] rounded-lg overflow-hidden relative shadow-sm flex-shrink-0">
          <CardContent className="p-0 h-full">
            <div className="h-2/3 bg-gray-200 relative">
              <img 
                src={currentUser.profilePic} 
                alt="Create story" 
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="h-1/3 bg-white flex flex-col items-center justify-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-facebook-primary text-white rounded-full p-1">
                <PlusIcon className="h-4 w-4" />
              </div>
              <p className="text-xs font-semibold mt-4">Create Story</p>
            </div>
          </CardContent>
        </Card>
        
        {/* User Stories */}
        {stories.map((story) => (
          <Card 
            key={story.id} 
            className="min-w-[110px] max-w-[110px] h-[200px] rounded-lg overflow-hidden relative shadow-sm flex-shrink-0"
          >
            <CardContent className="p-0 h-full">
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <img 
                  src={story.image} 
                  alt={story.user.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
              </div>
              
              <div className="absolute top-2 left-2 ring-4 ring-facebook-primary rounded-full">
                <Avatar className="h-9 w-9 border-2 border-white">
                  <AvatarImage src={story.user.profilePic} alt={story.user.name} />
                  <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-semibold">{story.user.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoriesSection;
