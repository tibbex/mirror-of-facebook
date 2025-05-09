
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Moon, Sun, Upload, LogOut, User, Bell, Lock, Shield, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { currentUser } from '@/data/mockData';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/sign-in');
  };

  const handleSaveChanges = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center">
        <LeftSidebar />
        <main className="flex-1 max-w-4xl p-4">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>

          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile details here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center mb-4 sm:flex-row sm:items-start">
                    <Avatar className="w-24 h-24 border-2 border-gray-200">
                      <AvatarImage src={currentUser.profilePic} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                      <h3 className="font-medium">{currentUser.name}</h3>
                      <p className="text-sm text-gray-500">Student at Example High School</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={currentUser.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe123" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="school">School</Label>
                      <Input id="school" defaultValue="Example High School" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Input id="grade" defaultValue="11" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    <textarea 
                      id="bio" 
                      className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Tell us about yourself"
                      defaultValue="High school student interested in science and technology."
                    />
                  </div>

                  <Button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Sun className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Theme Preference</p>
                        <p className="text-sm text-gray-500">Switch between light and dark mode</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch 
                        checked={darkMode} 
                        onCheckedChange={setDarkMode} 
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control when and how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="comments">Comments</Label>
                        <p className="text-sm text-gray-500">Receive notifications when someone comments on your posts</p>
                      </div>
                      <Switch id="comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="tags">Tags</Label>
                        <p className="text-sm text-gray-500">Receive notifications when you are tagged in a post</p>
                      </div>
                      <Switch id="tags" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="messages">Direct Messages</Label>
                        <p className="text-sm text-gray-500">Receive notifications for new messages</p>
                      </div>
                      <Switch id="messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="updates">Resource Updates</Label>
                        <p className="text-sm text-gray-500">Get notified about new resources relevant to your courses</p>
                      </div>
                      <Switch id="updates" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="profile-visibility">Profile Visibility</Label>
                        <p className="text-sm text-gray-500">Who can see your profile information</p>
                      </div>
                      <select 
                        id="profile-visibility" 
                        className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                      >
                        <option>Everyone</option>
                        <option>School Only</option>
                        <option>Friends Only</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="post-visibility">Post Visibility</Label>
                        <p className="text-sm text-gray-500">Who can see your posts by default</p>
                      </div>
                      <select 
                        id="post-visibility" 
                        className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                      >
                        <option>Everyone</option>
                        <option>School Only</option>
                        <option>Friends Only</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="help" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>Find answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-1">How do I change my password?</h3>
                      <p className="text-sm text-gray-500">Go to Account Settings and select "Change Password" option.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-1">How can I report inappropriate content?</h3>
                      <p className="text-sm text-gray-500">Click the three dots on any post and select "Report".</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-1">How can I download resources?</h3>
                      <p className="text-sm text-gray-500">Navigate to the Resources page and click the download button on any resource card.</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
