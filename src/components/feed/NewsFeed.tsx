
import React, { useState, useEffect } from 'react';
import StoriesSection from './StoriesSection';
import CreatePostCard from './CreatePostCard';
import { Card, CardContent } from '@/components/ui/card';
import PostCard from './PostCard';
import { useContext } from 'react';
import { AuthContext } from '@/App';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

// Updated post data structure with Supabase data
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

interface SupabasePost {
  id: string;
  content: string;
  image_url: string | null;
  likes: number | null;
  comments: number | null;
  shares: number | null;
  created_at: string;
  user_id: string;
}

const NewsFeed = () => {
  const { isAuthenticated, isGuest, user } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts from Supabase when component mounts
  const fetchPosts = async () => {
    if (!isAuthenticated) {
      setPosts([]);
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Get posts from Supabase
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          id, 
          content, 
          image_url, 
          likes, 
          comments, 
          shares, 
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });
      
      if (postsError) {
        throw postsError;
      }
      
      if (postsData) {
        // Get profiles for users
        const userIds = [...new Set(postsData.map(post => post.user_id))];
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);
          
        if (profilesError) {
          throw profilesError;
        }
        
        // Create a map of user profiles for quick lookup
        const profileMap = new Map();
        if (profilesData) {
          profilesData.forEach(profile => {
            profileMap.set(profile.id, profile);
          });
        }
        
        // Transform data to match our Post interface
        const transformedPosts: Post[] = postsData.map((post: SupabasePost) => {
          const profile = profileMap.get(post.user_id);
          return {
            id: post.id,
            user: {
              id: post.user_id,
              name: profile?.full_name || 'Unknown User',
              profilePic: profile?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
            },
            content: post.content,
            image: post.image_url || undefined,
            likes: post.likes || 0,
            comments: post.comments || 0,
            shares: post.shares || 0,
            timestamp: new Date(post.created_at).toLocaleString()
          };
        });
        
        setPosts(transformedPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error("Failed to load posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
    
    // Set up real-time subscription for new posts
    const postsSubscription = supabase
      .channel('public:posts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'posts' }, 
        (payload) => {
          console.log('Post change detected:', payload);
          fetchPosts(); // Refetch all posts when any changes are detected
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(postsSubscription);
    };
  }, [isAuthenticated]);

  // Function to add a new post (will be passed to CreatePostCard)
  const addPost = async (content: string, image?: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to create posts");
      return;
    }
    
    try {
      let imageUrl = image;
      
      // If there's an image, upload it to Supabase Storage
      if (image && image.startsWith('data:')) {
        const timestamp = Date.now();
        const fileExt = image.split(';')[0].split('/')[1];
        const fileName = `${user?.id}/${timestamp}.${fileExt}`;
        
        // Convert base64 to blob
        const base64Data = image.split(',')[1];
        const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('post-images')
          .upload(fileName, blob);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: publicUrlData } = supabase
          .storage
          .from('post-images')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrlData.publicUrl;
      }
      
      // Insert new post into Supabase
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: user?.id,
            content,
            image_url: imageUrl,
            likes: 0,
            comments: 0,
            shares: 0
          }
        ])
        .select();
      
      if (error) throw error;
      
      // Add the new post to the posts state immediately for better UX
      if (data && data[0]) {
        const newPost: Post = {
          id: data[0].id,
          user: {
            id: user?.id || '',
            name: user?.user_metadata?.full_name || 'Unknown User',
            profilePic: user?.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
          },
          content: data[0].content,
          image: data[0].image_url || undefined,
          likes: 0,
          comments: 0,
          shares: 0,
          timestamp: new Date().toLocaleString()
        };
        
        setPosts([newPost, ...posts]);
        toast.success("Post created successfully!");
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="max-w-[680px] mx-auto py-4 px-4">
      <CreatePostCard onPostCreated={addPost} />
      
      {isLoading ? (
        <Card className="mb-4 p-6 text-center">
          <CardContent className="pt-4">
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-t-blue-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-500 mt-2">Loading posts...</p>
          </CardContent>
        </Card>
      ) : posts.length > 0 ? (
        posts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <Card className="mb-4 p-6 text-center">
          <CardContent className="pt-4">
            <p className="text-gray-500">Welcome to EduHub!</p>
            <p className="text-gray-500 text-sm mt-1">Create your first post to see your content here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NewsFeed;
