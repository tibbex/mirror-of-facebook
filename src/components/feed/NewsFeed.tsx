
import React from 'react';
import StoriesSection from './StoriesSection';
import CreatePostCard from './CreatePostCard';
import { Card, CardContent } from '@/components/ui/card';

const NewsFeed = () => {
  return (
    <div className="max-w-[680px] mx-auto py-4 px-4">
      <CreatePostCard />
      <Card className="mb-4 p-6 text-center">
        <CardContent className="pt-4">
          <p className="text-gray-500">Welcome to EduHub!</p>
          <p className="text-gray-500 text-sm mt-1">Sign in or create an account to see posts from your network.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsFeed;
