
import React, { useState, useEffect } from 'react';
import StoriesSection from './StoriesSection';
import CreatePostCard from './CreatePostCard';
import { Card, CardContent } from '@/components/ui/card';
import PostCard from './PostCard';
import { useContext } from 'react';
import { AuthContext } from '@/App';
import { supabase } from "@/integrations/supabase/client";

// Sample post data structure
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

const NewsFeed = () => {
  const { isAuthenticated, isGuest } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);

  // Sample posts data - in a real app, this would come from a database
  useEffect(() => {
    // Try to load posts from localStorage when component mounts
    const savedPosts = localStorage.getItem('eduHubPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with empty posts array if nothing is saved
      setPosts([]);
    }
  }, []);

  // Function to add a new post (will be passed to CreatePostCard)
  const addPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: {
        id: '1',
        name: 'EduHub User',
        profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
      },
      content,
      image,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toLocaleString()
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    
    // Save to localStorage to persist across sessions
    localStorage.setItem('eduHubPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="max-w-[680px] mx-auto py-4 px-4">
      <CreatePostCard onPostCreated={addPost} />
      
      {posts.length > 0 ? (
        posts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <Card className="mb-4 p-6 text-center">
          <CardContent className="pt-4">
            <p className="text-gray-500">Welcome to EduHub!</p>
            <p className="text-gray-500 text-sm mt-1">Create your first post or sign in to see more content.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NewsFeed;
