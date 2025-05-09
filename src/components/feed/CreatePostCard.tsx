
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ImageIcon, SmileIcon, Video } from "lucide-react";
import { currentUser } from "@/data/mockData";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CreatePostCard = () => {
  const [postContent, setPostContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCreatePost = () => {
    if (postContent.trim()) {
      toast.success("Your post was created successfully!");
      setPostContent("");
      setIsExpanded(false);
    } else {
      toast.error("Please enter some content for your post.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <Avatar>
          <AvatarImage src={currentUser.profilePic} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        {isExpanded ? (
          <Textarea
            placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
            className="w-full rounded-full bg-gray-100 border-none focus-visible:ring-0"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            autoFocus
          />
        ) : (
          <Button 
            variant="outline" 
            className="w-full rounded-full bg-gray-100 text-left justify-start pl-4 text-gray-500 hover:bg-gray-200 border-none"
            onClick={() => setIsExpanded(true)}
          >
            {`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="mb-3">
          <Button 
            className="w-full bg-facebook-primary hover:bg-facebook-hover text-white"
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </div>
      )}

      <Separator className="my-3" />

      <div className="flex justify-between">
        <Button variant="ghost" className="flex-1 text-gray-500 hover:bg-gray-100">
          <Video className="h-5 w-5 mr-2 text-red-500" />
          <span>Live Video</span>
        </Button>
        <Button variant="ghost" className="flex-1 text-gray-500 hover:bg-gray-100">
          <ImageIcon className="h-5 w-5 mr-2 text-green-500" />
          <span>Photo/Video</span>
        </Button>
        <Button variant="ghost" className="flex-1 text-gray-500 hover:bg-gray-100">
          <SmileIcon className="h-5 w-5 mr-2 text-yellow-500" />
          <span>Feeling/Activity</span>
        </Button>
      </div>
    </div>
  );
};

export default CreatePostCard;
