
import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import NewsFeed from '@/components/feed/NewsFeed';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center">
        <LeftSidebar />
        <main className="flex-1">
          <NewsFeed />
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Index;
