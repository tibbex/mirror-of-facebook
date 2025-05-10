
import React, { useState, useEffect, useContext } from 'react';
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
import { AuthContext } from '@/App';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  school_name?: string;
  school_location?: string;
  grade?: string;
  date_of_birth?: string;
}

interface UserSettings {
  id: string;
  theme?: string;
  notification_comments?: boolean;
  notification_tags?: boolean;
  notification_messages?: boolean;
  notification_resources?: boolean;
  profile_visibility?: string;
  post_visibility?: string;
}

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    school: '',
    grade: '',
    bio: ''
  });
  
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  
  // Load user profile and settings
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        setProfile(profileData);
        setFormData({
          fullName: profileData?.full_name || '',
          username: profileData?.username || '',
          school: profileData?.school_name || '',
          grade: profileData?.grade || '',
          bio: user?.user_metadata?.bio || ''
        });
        
        // Fetch user settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('user_settings')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (settingsError && settingsError.code !== 'PGRST116') { // No rows found
          throw settingsError;
        }
        
        if (settingsData) {
          setSettings(settingsData);
          setDarkMode(settingsData.theme === 'dark');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate('/sign-in');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error("Failed to log out");
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          username: formData.username,
          school_name: formData.school,
          grade: formData.grade
        })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      
      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { 
          bio: formData.bio,
          full_name: formData.fullName,
          username: formData.username
        }
      });
      
      if (metadataError) throw metadataError;
      
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = async (isDark: boolean) => {
    if (!user) return;
    
    try {
      setDarkMode(isDark);
      
      // Update theme in settings
      const { error } = await supabase
        .from('user_settings')
        .update({
          theme: isDark ? 'dark' : 'light'
        })
        .eq('id', user.id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error updating theme:', error);
      toast.error("Failed to update theme");
    }
  };

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;
    
    const file = e.target.files[0];
    
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('profile-pictures')
        .upload(fileName, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: publicUrlData } = supabase
        .storage
        .from('profile-pictures')
        .getPublicUrl(fileName);
      
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrlData.publicUrl })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrlData.publicUrl }
      });
      
      if (metadataError) throw metadataError;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, avatar_url: publicUrlData.publicUrl } : null);
      
      toast.success("Profile picture updated");
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error("Failed to update profile picture");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex justify-center">
          <LeftSidebar />
          <main className="flex-1 max-w-4xl p-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">Loading settings...</p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

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
                      <AvatarImage 
                        src={profile?.avatar_url || user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                        alt={profile?.full_name || user?.user_metadata?.full_name || "User"} 
                      />
                      <AvatarFallback>{(profile?.full_name || user?.user_metadata?.full_name || "U")[0]}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                      <h3 className="font-medium">
                        {profile?.full_name || user?.user_metadata?.full_name || "User"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Student at {profile?.school_name || user?.user_metadata?.school_name || "School"}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => document.getElementById('avatarInput')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                        <input 
                          id="avatarInput"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfilePhotoChange}
                        />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={formData.fullName} 
                        onChange={handleFormChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={formData.username} 
                        onChange={handleFormChange} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="school">School</Label>
                      <Input 
                        id="school" 
                        value={formData.school} 
                        onChange={handleFormChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Input 
                        id="grade" 
                        value={formData.grade} 
                        onChange={handleFormChange} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    <textarea 
                      id="bio" 
                      className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Tell us about yourself"
                      value={formData.bio}
                      onChange={handleFormChange}
                    />
                  </div>

                  <Button 
                    onClick={handleSaveChanges} 
                    className="bg-blue-600 hover:bg-blue-700" 
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
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
                        onCheckedChange={handleThemeChange} 
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
