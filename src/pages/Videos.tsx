
import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Upload } from 'lucide-react';

const VideoCard = ({ title, author, thumbnail, views }: { title: string; author: string; thumbnail: string; views: string }) => (
  <Card className="overflow-hidden">
    <div className="relative aspect-video">
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
        03:45
      </div>
    </div>
    <CardContent className="p-3">
      <h3 className="font-medium line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-500">{author}</p>
      <p className="text-xs text-gray-500">{views} views • 2 days ago</p>
    </CardContent>
  </Card>
);

const Videos = () => {
  // Sample video data
  const videos = [
    { 
      id: 1, 
      title: "Physics 101: Understanding Newton's Laws", 
      author: "Prof. Sarah Johnson", 
      thumbnail: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", 
      views: "1.2K" 
    },
    { 
      id: 2, 
      title: "Introduction to Calculus: Derivatives Explained", 
      author: "Math Master Academy", 
      thumbnail: "https://images.unsplash.com/photo-1635372722656-389f87a941b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", 
      views: "856" 
    },
    { 
      id: 3, 
      title: "Chemistry Lab: Acids and Bases", 
      author: "Dr. Michael Chen", 
      thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", 
      views: "2.3K" 
    },
    { 
      id: 4, 
      title: "Literature Analysis: Shakespeare's Macbeth", 
      author: "English Literature Hub", 
      thumbnail: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", 
      views: "945" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center">
        <LeftSidebar />
        <main className="flex-1 max-w-5xl p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Educational Videos</h1>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(video => (
              <VideoCard 
                key={video.id}
                title={video.title}
                author={video.author}
                thumbnail={video.thumbnail}
                views={video.views}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Videos;
