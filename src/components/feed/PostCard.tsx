
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Image } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    profilePic: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<{text: string, user: {name: string, profilePic: string}}[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && commentText.trim()) {
      // Add the new comment to the list
      const newComment = {
        text: commentText,
        user: {
          name: post.user.name,
          profilePic: post.user.profilePic
        }
      };
      
      setCommentsList([...commentsList, newComment]);
      setCommentText("");
      toast.success("Comment posted successfully!");
    }
  };

  const handleShare = () => {
    toast.success("Post shared successfully!");
  };

  return (
    <Card className="mb-4 shadow-sm">
      <CardHeader className="p-4 pb-0 flex flex-row items-start space-y-0">
        <div className="flex items-center flex-1">
          <Avatar className="mr-3">
            <AvatarImage src={post.user.profilePic} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium leading-none">{post.user.name}</p>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Hide post</DropdownMenuItem>
            <DropdownMenuItem>Report post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
        <p className="whitespace-pre-line mb-3">{post.content}</p>
        {post.image && (
          <div className="rounded-lg overflow-hidden -mx-4">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full"
            />
          </div>
        )}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <div className="flex items-center">
            <div className="bg-facebook-primary text-white rounded-full p-1 mr-2">
              <ThumbsUp className="h-3 w-3" />
            </div>
            <span>{likeCount}</span>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="ghost" 
              className="text-gray-500 hover:bg-transparent hover:underline p-0"
              onClick={() => setShowComments(!showComments)}
            >
              {commentsList.length > 0 ? commentsList.length : post.comments} comments
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-500 hover:bg-transparent hover:underline p-0"
            >
              {post.shares} shares
            </Button>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-1">
        <div className="flex w-full justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex-1 text-sm ${liked ? 'text-facebook-primary font-semibold' : 'text-gray-500'}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Like</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{liked ? 'Unlike' : 'Like'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="ghost" 
            className="flex-1 text-sm text-gray-500"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Comment</span>
          </Button>

          <Button 
            variant="ghost" 
            className="flex-1 text-sm text-gray-500"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </CardFooter>
      
      {showComments && (
        <div className="px-4 py-2">
          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.user.profilePic} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Input 
              placeholder="Write a comment..." 
              className="rounded-full bg-gray-100 border-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleComment}
            />
          </div>
          
          {commentsList.length > 0 ? (
            <div className="space-y-2 mt-3">
              {commentsList.map((comment, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={comment.user.profilePic} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl px-3 py-2">
                    <p className="text-xs font-medium">{comment.user.name}</p>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-center text-gray-500 my-2">
              Be the first to comment on this post.
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
