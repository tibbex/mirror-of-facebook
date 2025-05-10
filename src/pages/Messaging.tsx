
import React from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Messaging = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <Card className="bg-white rounded-lg shadow-lg p-6 text-center">
          <CardContent className="pt-4">
            <MessageCircle className="h-12 w-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Messaging</h2>
            <p className="text-gray-500">Sign in to connect with real students and educators.</p>
            <Button asChild className="mt-4" variant="outline">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messaging;
