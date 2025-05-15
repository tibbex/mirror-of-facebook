
import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ImageIcon, SmileIcon, Video } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AuthContext } from "@/App";
import { supabase } from "@/integrations/supabase/client";

interface CreatePostCardProps {
  onPostCreated?: (content: string, image?: string) => void;
}

const CreatePostCard = ({ onPostCreated }: CreatePostCardProps) => {
  const [postContent, setPostContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleCreatePost = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to create posts");
      return;
    }

    if (postContent.trim()) {
      try {
        // If there's an image, handle the upload
        let finalImageUrl = imageUrl;
        
        // If the image is a base64 string, upload to Supabase
        if (imageUrl && imageUrl.startsWith('data:')) {
          setIsUploading(true);
          
          try {
            const timestamp = Date.now();
            const fileExt = imageUrl.split(';')[0].split('/')[1];
            const fileName = `${user?.id}/${timestamp}.${fileExt}`;
            
            // Convert base64 to blob
            const base64Data = imageUrl.split(',')[1];
            const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
            
            // Create the bucket if it doesn't exist (first time)
            const { error: bucketError } = await supabase
              .storage
              .createBucket('post-images', {
                public: true,
                fileSizeLimit: 5242880 // 5MB
              })
              .catch(() => ({ error: null })); // Ignore error if bucket already exists
            
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
            
            finalImageUrl = publicUrlData.publicUrl;
          } catch (error) {
            console.error('Error uploading image:', error);
            toast.error("Failed to upload image");
            setIsUploading(false);
            return;
          }
        }
        
        // Insert new post into Supabase
        const { data, error } = await supabase
          .from('posts')
          .insert([
            {
              user_id: user?.id,
              content: postContent,
              image_url: finalImageUrl,
              likes: 0,
              comments: 0,
              shares: 0
            }
          ]);
        
        if (error) throw error;
        
        // Call the callback function if provided
        if (onPostCreated) {
          onPostCreated(postContent, finalImageUrl);
        }
        
        toast.success("Your post was created successfully!");
        setPostContent("");
        setImageUrl(undefined);
        setIsExpanded(false);
        setIsUploading(false);
      } catch (error) {
        console.error('Error creating post:', error);
        toast.error("Failed to create post");
        setIsUploading(false);
      }
    } else {
      toast.error("Please enter some content for your post.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    
    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageUrl(reader.result as string);
        setIsExpanded(true);
        setIsUploading(false);
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    // Directly trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <Avatar>
          <AvatarImage 
            src={user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
            alt={user?.user_metadata?.full_name || "User"} 
          />
          <AvatarFallback>{(user?.user_metadata?.full_name || "U")[0]}</AvatarFallback>
        </Avatar>
        
        {isExpanded ? (
          <Textarea
            placeholder={`What's on your mind, ${user?.user_metadata?.full_name?.split(' ')[0] || "User"}?`}
            className="w-full rounded-lg bg-gray-100 border-none focus-visible:ring-0"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            autoFocus
          />
        ) : (
          <Button 
            variant="outline" 
            className="w-full rounded-full bg-gray-100 text-left justify-start pl-4 text-gray-500 hover:bg-gray-200 border-none"
            onClick={() => setIsExpanded(true)}
            disabled={!isAuthenticated}
          >
            {`What's on your mind, ${user?.user_metadata?.full_name?.split(' ')[0] || "User"}?`}
          </Button>
        )}
      </div>

      {imageUrl && isExpanded && (
        <div className="mb-3 relative">
          <img src={imageUrl} alt="Post image" className="w-full h-48 object-cover rounded-lg" />
          <Button 
            variant="destructive" 
            size="sm"
            className="absolute top-2 right-2" 
            onClick={() => setImageUrl(undefined)}
          >
            Remove
          </Button>
        </div>
      )}

      {isExpanded && (
        <div className="mb-3">
          <Button 
            className="w-full bg-facebook-primary hover:bg-facebook-hover text-white"
            onClick={handleCreatePost}
            disabled={isUploading || !isAuthenticated}
          >
            {isUploading ? "Uploading..." : "Post"}
          </Button>
        </div>
      )}

      <Separator className="my-3" />

      <div className="flex justify-between">
        <Button variant="ghost" className="flex-1 text-gray-500 hover:bg-gray-100" disabled={!isAuthenticated}>
          <Video className="h-5 w-5 mr-2 text-red-500" />
          <span>Live Video</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex-1 text-gray-500 hover:bg-gray-100"
          onClick={handleImageClick}
          disabled={!isAuthenticated}
        >
          <ImageIcon className="h-5 w-5 mr-2 text-green-500" />
          <span>Photo/Video</span>
          <input 
            ref={fileInputRef}
            id="fileInput" 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload}
          />
        </Button>
        <Button variant="ghost" className="flex-1 text-gray-500 hover:bg-gray-100" disabled={!isAuthenticated}>
          <SmileIcon className="h-5 w-5 mr-2 text-yellow-500" />
          <span>Feeling/Activity</span>
        </Button>
      </div>
    </div>
  );
};

export default CreatePostCard;
