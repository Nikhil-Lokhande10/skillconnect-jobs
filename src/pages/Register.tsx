import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, MapPin, Upload, Mail, Phone, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { supabase } from "@/lib/supabaseClient";

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'worker' ? 'worker' : 'customer';
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userFormData, setUserFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    location: "",
    password: "",
    confirmPassword: ""
  });

  const [workerFormData, setWorkerFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    location: "",
    password: "",
    confirmPassword: "",
    skills: "",
    experience: "",
    serviceArea: "",
    idProof: null as File | null,
    profilePicture: null as File | null
  });

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userFormData.password !== userFormData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: userFormData.email,
      password: userFormData.password
    });
    if (!error && data.user) {
      // Ensure we have a session (RLS requires authenticated user)
      if (!data.session) {
        await supabase.auth.signInWithPassword({
          email: userFormData.email,
          password: userFormData.password,
        });
      }
      // Update profile (trigger might have created a default 'client' row)
      const { error: profErr } = await supabase
        .from("profiles")
        .update({
          email: userFormData.email,
          full_name: userFormData.fullName,
          role: 'client'
        })
        .eq('user_id', data.user.id);
      if (profErr) {
        // Fallback to upsert with conflict on user_id
        await supabase
          .from("profiles")
          .upsert({
            user_id: data.user.id,
            email: userFormData.email,
            full_name: userFormData.fullName,
            role: 'client'
          }, { onConflict: 'user_id' });
      }
      
      toast({
        title: "Registration successful!",
        description: "Your customer account has been created successfully.",
      });
      
      // Navigate to login to complete email confirmation or session
      navigate("/login");
    } else {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleWorkerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (workerFormData.password !== workerFormData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: workerFormData.email,
      password: workerFormData.password
    });
    if (!error && data.user) {
      // Ensure we have a session (RLS requires authenticated user)
      if (!data.session) {
        await supabase.auth.signInWithPassword({
          email: workerFormData.email,
          password: workerFormData.password,
        });
      }
      // Update role and details (trigger might have created a default 'client' row)
      const { error: profErr } = await supabase
        .from("profiles")
        .update({
          email: workerFormData.email,
          full_name: workerFormData.fullName,
          role: 'worker',
          skills: workerFormData.skills.split(',').map(s => s.trim()),
          experience_years: parseInt(workerFormData.experience || '0', 10),
          availability: { serviceArea: workerFormData.serviceArea }
        })
        .eq('user_id', data.user.id);
      if (profErr) {
        await supabase
          .from("profiles")
          .upsert({
            user_id: data.user.id,
            email: workerFormData.email,
            full_name: workerFormData.fullName,
            role: 'worker',
            skills: workerFormData.skills.split(',').map(s => s.trim()),
            experience_years: parseInt(workerFormData.experience || '0', 10),
            availability: { serviceArea: workerFormData.serviceArea }
          }, { onConflict: 'user_id' });
      }
      
      // Save profile picture and ID proof
      if (workerFormData.profilePicture) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target?.result as string;
          localStorage.setItem(`profile_picture_${data.user.id}`, base64String);
        };
        reader.readAsDataURL(workerFormData.profilePicture);
      }
      
      if (workerFormData.idProof) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target?.result as string;
          localStorage.setItem(`id_proof_${data.user.id}`, base64String);
        };
        reader.readAsDataURL(workerFormData.idProof);
      }
      
      toast({
        title: "Registration successful!",
        description: "Your professional account has been created successfully.",
      });
      
      // Navigate to login
      navigate("/login");
    } else {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join SkillConnect
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose how you want to get started
            </p>
          </div>

          <Tabs defaultValue={initialTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                I need services
              </TabsTrigger>
              <TabsTrigger value="worker" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                I provide services
              </TabsTrigger>
            </TabsList>

            {/* Customer Registration */}
            <TabsContent value="customer">
              <Card className="shadow-card-hover border-border">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    Customer Registration
                  </CardTitle>
                  <CardDescription>
                    Create your account to start posting jobs and finding professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUserSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="user-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="user-name"
                            placeholder="Enter your full name"
                            className="pl-10"
                            value={userFormData.fullName}
                            onChange={(e) => setUserFormData({...userFormData, fullName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="user-email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={userFormData.email}
                            onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-mobile">Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="user-mobile"
                            placeholder="Enter mobile number"
                            className="pl-10"
                            value={userFormData.mobile}
                            onChange={(e) => setUserFormData({...userFormData, mobile: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="user-location"
                            placeholder="Enter your city"
                            className="pl-10"
                            value={userFormData.location}
                            onChange={(e) => setUserFormData({...userFormData, location: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="user-password"
                            type="password"
                            placeholder="Create password"
                            className="pl-10"
                            value={userFormData.password}
                            onChange={(e) => setUserFormData({...userFormData, password: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="user-confirm-password"
                            type="password"
                            placeholder="Confirm password"
                            className="pl-10"
                            value={userFormData.confirmPassword}
                            onChange={(e) => setUserFormData({...userFormData, confirmPassword: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Customer Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Worker Registration */}
            <TabsContent value="worker">
              <Card className="shadow-card-hover border-border">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    Professional Registration
                  </CardTitle>
                  <CardDescription>
                    Join our network of skilled professionals and grow your business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleWorkerSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="worker-name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="worker-name"
                              placeholder="Enter your full name"
                              className="pl-10"
                              value={workerFormData.fullName}
                              onChange={(e) => setWorkerFormData({...workerFormData, fullName: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="worker-email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="worker-email"
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10"
                              value={workerFormData.email}
                              onChange={(e) => setWorkerFormData({...workerFormData, email: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="worker-mobile">Mobile Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="worker-mobile"
                              placeholder="Enter mobile number"
                              className="pl-10"
                              value={workerFormData.mobile}
                              onChange={(e) => setWorkerFormData({...workerFormData, mobile: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="worker-location">Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="worker-location"
                              placeholder="Enter your city"
                              className="pl-10"
                              value={workerFormData.location}
                              onChange={(e) => setWorkerFormData({...workerFormData, location: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Professional Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="worker-skills">Skills & Services</Label>
                          <Input
                            id="worker-skills"
                            placeholder="e.g., Plumbing, Electrical, Carpentry"
                            value={workerFormData.skills}
                            onChange={(e) => setWorkerFormData({...workerFormData, skills: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="worker-experience">Years of Experience</Label>
                          <Input
                            id="worker-experience"
                            placeholder="e.g., 5 years"
                            value={workerFormData.experience}
                            onChange={(e) => setWorkerFormData({...workerFormData, experience: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="worker-area">Service Area</Label>
                          <Input
                            id="worker-area"
                            placeholder="Areas you can provide services (pincode/city)"
                            value={workerFormData.serviceArea}
                            onChange={(e) => setWorkerFormData({...workerFormData, serviceArea: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Documents & Photos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="worker-id">ID Proof</Label>
                          <label className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-accent/50 transition-colors block">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              {workerFormData.idProof ? workerFormData.idProof.name : "Click to upload ID proof"}
                            </p>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => setWorkerFormData({...workerFormData, idProof: e.target.files?.[0] || null})}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="worker-photo">Profile Picture</Label>
                          <label className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-accent/50 transition-colors block">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              {workerFormData.profilePicture ? workerFormData.profilePicture.name : "Click to upload photo"}
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setWorkerFormData({...workerFormData, profilePicture: e.target.files?.[0] || null})}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Security</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="worker-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="worker-password"
                              type="password"
                              placeholder="Create password"
                              className="pl-10"
                              value={workerFormData.password}
                              onChange={(e) => setWorkerFormData({...workerFormData, password: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="worker-confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="worker-confirm-password"
                              type="password"
                              placeholder="Confirm password"
                              className="pl-10"
                              value={workerFormData.confirmPassword}
                              onChange={(e) => setWorkerFormData({...workerFormData, confirmPassword: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Professional Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;