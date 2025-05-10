
import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const Videos = () => {
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

          <Card className="p-6 text-center">
            <CardContent className="pt-4">
              <p className="text-gray-500">No videos available.</p>
              <p className="text-gray-500 text-sm mt-1">Sign in to view educational videos or upload your own.</p>
              <Button asChild className="mt-4" variant="outline">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Videos;
