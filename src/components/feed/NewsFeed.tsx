
import React from 'react';
import StoriesSection from './StoriesSection';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';
import { posts } from '@/data/mockData';

const NewsFeed = () => {
  return (
    <div className="max-w-[680px] mx-auto py-4 px-4">
      <StoriesSection />
      <CreatePostCard />
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default NewsFeed;
