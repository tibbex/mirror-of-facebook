
import React, { useState, useRef, useContext } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Image } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AuthContext } from '@/App';
import { supabase } from '@/integrations/supabase/client';

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

interface CommentData {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  }[] | null;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<{text: string, user: {name: string, profilePic: string}, id: string}[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Fetch comments when comments section is shown
  const fetchComments = async () => {
    if (!showComments || !post.id) return;
    
    try {
      setIsLoadingComments(true);
      
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles(full_name, avatar_url)
        `)
        .eq('post_id', post.id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        const formattedComments = data.map((comment: CommentData) => ({
          id: comment.id,
          text: comment.content,
          user: {
            name: comment.profiles?.[0]?.full_name || 'Unknown User',
            profilePic: comment.profiles?.[0]?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
          }
        }));
        
        setCommentsList(formattedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };
  
  // Toggle comments visibility and fetch comments when shown
  const toggleComments = () => {
    const newState = !showComments;
    setShowComments(newState);
    
    if (newState) {
      fetchComments();
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to like posts");
      return;
    }
    
    try {
      if (liked) {
        // Unlike post - in a real implementation you would have a likes table
        // and remove the like entry. For now we'll just decrement the likes count.
        const { error } = await supabase
          .from('posts')
          .update({ likes: likeCount - 1 })
          .eq('id', post.id);
        
        if (error) throw error;
        
        setLikeCount(likeCount - 1);
      } else {
        // Like post
        const { error } = await supabase
          .from('posts')
          .update({ likes: likeCount + 1 })
          .eq('id', post.id);
        
        if (error) throw error;
        
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating like:', error);
      toast.error("Failed to update like");
    }
  };

  const handleComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && commentText.trim()) {
      if (!isAuthenticated || !user) {
        toast.error("Please sign in to comment");
        return;
      }
      
      try {
        // Add comment to Supabase
        const { data, error } = await supabase
          .from('comments')
          .insert([
            {
              post_id: post.id,
              user_id: user.id,
              content: commentText
            }
          ])
          .select(`
            id,
            content,
            user_id,
            profiles(full_name, avatar_url)
          `);
        
        if (error) throw error;
        
        if (data && data[0]) {
          // Add the new comment to the list
          const newComment = {
            id: data[0].id,
            text: data[0].content,
            user: {
              name: data[0].profiles?.[0]?.full_name || user.user_metadata?.full_name || 'User',
              profilePic: data[0].profiles?.[0]?.avatar_url || user.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
            }
          };
          
          setCommentsList([...commentsList, newComment]);
          
          // Update comment count on post
          await supabase
            .from('posts')
            .update({ comments: post.comments + 1 })
            .eq('id', post.id);
          
          setCommentText("");
          toast.success("Comment posted successfully!");
        }
      } catch (error) {
        console.error('Error posting comment:', error);
        toast.error("Failed to post comment");
      }
    }
  };

  const handleShare = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to share posts");
      return;
    }
    
    // In a real app, this would implement actual sharing functionality
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
              onClick={toggleComments}
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
            onClick={toggleComments}
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
              <AvatarImage 
                src={user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                alt={user?.user_metadata?.full_name || "User"} 
              />
              <AvatarFallback>{(user?.user_metadata?.full_name || "U")[0]}</AvatarFallback>
            </Avatar>
            <Input 
              placeholder="Write a comment..." 
              className="rounded-full bg-gray-100 border-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleComment}
              disabled={!isAuthenticated}
            />
          </div>
          
          {isLoadingComments ? (
            <div className="text-center py-2">
              <p className="text-sm text-gray-500">Loading comments...</p>
            </div>
          ) : commentsList.length > 0 ? (
            <div className="space-y-2 mt-3">
              {commentsList.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2">
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
