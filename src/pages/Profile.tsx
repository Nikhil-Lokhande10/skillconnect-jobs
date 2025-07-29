import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser, User as AuthUser } from "@/utils/auth";
import { Upload, User, Mail, Phone, MapPin, Briefcase, Clock, History, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    
    // Load profile picture from localStorage
    const savedPicture = localStorage.getItem(`profile_picture_${currentUser.id}`);
    if (savedPicture) {
      setProfilePicture(savedPicture);
    }
  }, [navigate]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setProfilePicture(base64String);
      
      // Save to localStorage
      if (user) {
        localStorage.setItem(`profile_picture_${user.id}`, base64String);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been saved successfully.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleViewHistory = () => {
    navigate("/service-history");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">My Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                    {profilePicture ? (
                      <img 
                        src={profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                        <User className="h-16 w-16 text-white" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-secondary hover:bg-secondary/90 rounded-full p-2 cursor-pointer shadow-lg transition-colors">
                    <Upload className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-foreground">{user.fullName}</h1>
                  <p className="text-muted-foreground capitalize">{user.userType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{user.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Mobile</p>
                        <p className="font-medium">{user.mobile}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{user.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Professional Information for Workers */}
                  {user.userType === 'worker' && (
                    <div className="md:col-span-2 pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-primary" />
                        Professional Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Skills</p>
                          <p className="font-medium">{user.skills || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Experience</p>
                          <p className="font-medium">{user.experience || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Service Area</p>
                          <p className="font-medium">{user.serviceArea || "Not specified"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">Edit functionality coming soon...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleViewHistory}
              className="flex-1"
              size="lg"
            >
              <History className="h-5 w-5 mr-2" />
              View Service History
            </Button>
            
            {user.userType === 'customer' && (
              <Button
                onClick={() => navigate("/post-job")}
                variant="secondary"
                className="flex-1"
                size="lg"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Post a New Job
              </Button>
            )}
            
            {user.userType === 'worker' && (
              <Button
                onClick={() => navigate("/manage-services")}
                variant="secondary"
                className="flex-1"
                size="lg"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Manage Services
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;