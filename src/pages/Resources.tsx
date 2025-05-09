
import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, Download, Upload, File } from 'lucide-react';

const ResourceCard = ({ title, author, type, downloads }: { title: string; author: string; type: string; downloads: string }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-lg mr-3">
          {type === 'book' ? 
            <BookOpen className="h-6 w-6 text-blue-700" /> : 
            <File className="h-6 w-6 text-blue-700" />
          }
        </div>
        <div className="flex-1">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-500">{author}</p>
          <p className="text-xs text-gray-500">{downloads} downloads • {type}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="p-3 pt-0 flex justify-end">
      <Button variant="ghost" size="sm" className="text-blue-600">
        <Download className="h-4 w-4 mr-1" />
        Download
      </Button>
    </CardFooter>
  </Card>
);

const Resources = () => {
  // Sample resource data
  const resources = [
    { 
      id: 1, 
      title: "Biology Study Guide: Cell Structure and Function", 
      author: "Dr. Emma Lewis", 
      type: "worksheet", 
      downloads: "2,450" 
    },
    { 
      id: 2, 
      title: "Chemistry Formulas and Equations Reference", 
      author: "Science Academy", 
      type: "book", 
      downloads: "3,721" 
    },
    { 
      id: 3, 
      title: "Advanced Algebra Practice Problems", 
      author: "Math Masters", 
      type: "worksheet", 
      downloads: "1,896" 
    },
    { 
      id: 4, 
      title: "World History: Ancient Civilizations", 
      author: "History Hub", 
      type: "book", 
      downloads: "2,103" 
    },
    { 
      id: 5, 
      title: "English Grammar Essentials", 
      author: "Language Arts Institute", 
      type: "book", 
      downloads: "4,521" 
    },
    { 
      id: 6, 
      title: "Physics Problem Set: Motion and Forces", 
      author: "Dr. Robert Chen", 
      type: "worksheet", 
      downloads: "1,352" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center">
        <LeftSidebar />
        <main className="flex-1 max-w-5xl p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Learning Resources</h1>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Resource
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map(resource => (
              <ResourceCard 
                key={resource.id}
                title={resource.title}
                author={resource.author}
                type={resource.type}
                downloads={resource.downloads}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resources;
