
import React, { useContext, useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/App';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Resource {
  id: string;
  title: string;
  description?: string;
  file_url?: string;
  category?: string;
  created_at: string;
  user: {
    id: string;
    name: string;
  }
}

const Resources = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingResource, setUploadingResource] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('resources')
          .select(`
            id, 
            title, 
            description, 
            file_url, 
            category,
            created_at,
            user_id,
            profiles:user_id (
              id, 
              full_name
            )
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          const formattedResources = data.map(resource => ({
            id: resource.id,
            title: resource.title,
            description: resource.description,
            file_url: resource.file_url,
            category: resource.category,
            created_at: new Date(resource.created_at).toLocaleString(),
            user: {
              id: resource.profiles?.id || '',
              name: resource.profiles?.full_name || 'Unknown User'
            }
          }));
          
          setResources(formattedResources);
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, []);

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to upload resources");
      return;
    }
    
    // In a real app, you'd open a modal or navigate to an upload page
    toast.info("Resource upload functionality will be implemented soon");
  };

  const getFileIcon = (fileUrl: string | undefined) => {
    if (!fileUrl) return <FileText className="h-10 w-10 text-blue-500" />;
    
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-10 w-10 text-blue-700" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="h-10 w-10 text-green-600" />;
      case 'ppt':
      case 'pptx':
        return <FileText className="h-10 w-10 text-orange-500" />;
      default:
        return <FileText className="h-10 w-10 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center">
        <LeftSidebar />
        <main className="flex-1 max-w-5xl p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Learning Resources</h1>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUploadClick}
              disabled={uploadingResource || !isAuthenticated}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploadingResource ? "Uploading..." : "Upload Resource"}
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading resources...</p>
            </div>
          ) : resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map(resource => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardContent className="p-4 flex flex-col">
                    <div className="flex items-center space-x-3 mb-3">
                      {getFileIcon(resource.file_url)}
                      <div>
                        <p className="font-medium line-clamp-1">{resource.title}</p>
                        <p className="text-xs text-gray-500">{resource.category || 'General'}</p>
                      </div>
                    </div>
                    
                    {resource.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{resource.description}</p>
                    )}
                    
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-500">By {resource.user.name}</span>
                      {resource.file_url && (
                        <Button size="sm" variant="outline" className="h-8">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <CardContent className="pt-4">
                <p className="text-gray-500">No resources available.</p>
                {!isAuthenticated ? (
                  <>
                    <p className="text-gray-500 text-sm mt-1">Sign in to view learning resources or upload your own.</p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/sign-in">Sign In</Link>
                    </Button>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">Be the first to upload a learning resource.</p>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Resources;
