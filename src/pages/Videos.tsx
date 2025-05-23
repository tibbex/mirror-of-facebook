
import React, { useContext, useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/App';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  created_at: string;
  user: {
    id: string;
    name: string;
  }
}

interface SupabaseVideo {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  created_at: string;
  user_id: string;
}

const Videos = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        
        // Get videos from Supabase
        const { data: videosData, error: videosError } = await supabase
          .from('videos')
          .select(`
            id, 
            title, 
            description, 
            video_url, 
            thumbnail_url, 
            created_at,
            user_id
          `)
          .order('created_at', { ascending: false });
          
        if (videosError) throw videosError;
        
        if (videosData) {
          // Get profiles for the video creators
          const userIds = [...new Set(videosData.map(video => video.user_id))];
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', userIds);
            
          if (profilesError) throw profilesError;
          
          // Create a map of user profiles for quick lookup
          const profileMap = new Map();
          if (profilesData) {
            profilesData.forEach(profile => {
              profileMap.set(profile.id, profile);
            });
          }
          
          // Transform data to match our Video interface
          const formattedVideos = videosData.map((video: SupabaseVideo) => {
            const profile = profileMap.get(video.user_id);
            return {
              id: video.id,
              title: video.title,
              description: video.description || undefined,
              video_url: video.video_url,
              thumbnail_url: video.thumbnail_url || undefined,
              created_at: new Date(video.created_at).toLocaleString(),
              user: {
                id: video.user_id,
                name: profile?.full_name || 'Unknown User'
              }
            };
          });
          
          setVideos(formattedVideos);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVideos();
  }, []);

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to upload videos");
      return;
    }
    
    // In a real app, you'd open a modal or navigate to an upload page
    toast.info("Video upload functionality will be implemented soon");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center">
        <LeftSidebar />
        <main className="flex-1 max-w-5xl p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Educational Videos</h1>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUploadClick}
              disabled={uploadingVideo || !isAuthenticated}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploadingVideo ? "Uploading..." : "Upload Video"}
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading videos...</p>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map(video => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail_url || 'https://via.placeholder.com/640x360?text=Video'} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-blue-600 ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium line-clamp-1">{video.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{video.user.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <CardContent className="pt-4">
                <p className="text-gray-500">No videos available.</p>
                {!isAuthenticated ? (
                  <>
                    <p className="text-gray-500 text-sm mt-1">Sign in to view educational videos or upload your own.</p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/sign-in">Sign In</Link>
                    </Button>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">Be the first to upload an educational video.</p>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Videos;
