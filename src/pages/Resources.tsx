
import React, { useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, Download, Upload, File } from 'lucide-react';
import { toast } from "sonner";

interface Resource {
  id: number;
  title: string;
  author: string;
  type: string;
  downloads: string;
  file?: File;
}

const ResourceCard = ({ 
  resource, 
  onDownload 
}: { 
  resource: Resource; 
  onDownload: (id: number) => void;
}) => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-lg mr-3">
          {resource.type === 'book' ? 
            <BookOpen className="h-6 w-6 text-blue-700" /> : 
            <File className="h-6 w-6 text-blue-700" />
          }
        </div>
        <div className="flex-1">
          <h3 className="font-medium line-clamp-2">{resource.title}</h3>
          <p className="text-sm text-gray-500">{resource.author}</p>
          <p className="text-xs text-gray-500">{resource.downloads} downloads • {resource.type}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="p-3 pt-0 flex justify-end">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-blue-600"
        onClick={() => onDownload(resource.id)}
      >
        <Download className="h-4 w-4 mr-1" />
        Download
      </Button>
    </CardFooter>
  </Card>
);

const Resources = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resources, setResources] = useState<Resource[]>([
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
  ]);

  const handleUploadClick = () => {
    // Open file browser when upload button is clicked
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Create new resource with the uploaded file
      const newResource: Resource = {
        id: resources.length + 1,
        title: file.name.substring(0, file.name.lastIndexOf('.')),
        author: currentUser.name,
        type: file.type.includes('pdf') ? 'book' : 'worksheet',
        downloads: "0",
        file: file
      };
      
      setResources([newResource, ...resources]);
      toast.success("Resource uploaded successfully!");
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDownload = (id: number) => {
    const resource = resources.find(r => r.id === id);
    if (resource) {
      // If we have an actual file (newly uploaded), download it
      if (resource.file) {
        const url = URL.createObjectURL(resource.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = resource.file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // For mock resources
        toast.success(`Downloading ${resource.title}...`);
      }
      
      // Update download count
      setResources(resources.map(r => {
        if (r.id === id) {
          const downloadsNum = parseInt(r.downloads.replace(/,/g, '')) + 1;
          return {
            ...r,
            downloads: downloadsNum.toLocaleString()
          };
        }
        return r;
      }));
    }
  };

  // Get current user from mock data for the upload feature
  const currentUser = {
    name: "Jane Doe"
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center">
        <LeftSidebar />
        <main className="flex-1 max-w-5xl p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Learning Resources</h1>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              />
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleUploadClick}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Resource
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map(resource => (
              <ResourceCard 
                key={resource.id}
                resource={resource}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resources;
