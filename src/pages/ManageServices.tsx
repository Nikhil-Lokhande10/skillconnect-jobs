import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser, User as AuthUser } from "@/utils/auth";
import { Search, MapPin, Clock, Users, Filter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobListing {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  budget: string;
  urgency: 'normal' | 'urgent' | 'emergency';
  postedDate: string;
  customerName: string;
  status: 'open' | 'in-progress' | 'completed';
}

const ManageServices = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (currentUser.userType !== 'worker') {
      navigate("/");
      return;
    }
    setUser(currentUser);
    
    // Mock job listings based on user's skills
    const mockJobs: JobListing[] = [
      {
        id: "job_1",
        title: "Kitchen Sink Repair",
        description: "Need urgent plumbing repair for a leaking kitchen sink. Located on second floor.",
        location: "Mumbai, Maharashtra",
        category: "plumbing",
        budget: "₹2,000 - ₹5,000",
        urgency: "urgent",
        postedDate: "2 hours ago",
        customerName: "Rajesh Kumar",
        status: "open"
      },
      {
        id: "job_2",
        title: "Electrical Outlet Installation",
        description: "Install 3 new electrical outlets in home office. All materials provided.",
        location: "Delhi, Delhi",
        category: "electrical",
        budget: "₹3,000 - ₹6,000",
        urgency: "normal",
        postedDate: "1 day ago",
        customerName: "Priya Sharma",
        status: "open"
      },
      {
        id: "job_3",
        title: "Custom Bookshelf",
        description: "Build a custom wooden bookshelf for living room. Measurements provided.",
        location: "Pune, Maharashtra",
        category: "carpentry",
        budget: "₹8,000 - ₹15,000",
        urgency: "normal",
        postedDate: "3 days ago",
        customerName: "Amit Patel",
        status: "open"
      }
    ];
    
    setJobs(mockJobs);
  }, [navigate]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || job.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactCustomer = (job: JobListing) => {
    toast({
      title: "Contact Request Sent",
      description: `Your interest in "${job.title}" has been sent to ${job.customerName}.`,
    });
  };

  const urgencyColors = {
    normal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    urgent: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    emergency: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Available Jobs</h1>
            <p className="text-muted-foreground">
              Find jobs that match your skills and location
            </p>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">All Categories</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="painting">Painting</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                    <p>Try adjusting your search criteria or check back later for new opportunities.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.postedDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={urgencyColors[job.urgency]}>
                          {job.urgency.charAt(0).toUpperCase() + job.urgency.slice(1)}
                        </Badge>
                        <Badge variant="secondary">{job.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground">{job.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-semibold text-foreground">{job.budget}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Posted by</p>
                        <p className="font-semibold text-foreground">{job.customerName}</p>
                      </div>
                      <Button 
                        onClick={() => handleContactCustomer(job)}
                        className="flex-shrink-0"
                      >
                        Contact Customer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Create Job Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Get Job Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Set up alerts to get notified when jobs matching your skills are posted.
              </p>
              <Button variant="outline">
                Create Job Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;