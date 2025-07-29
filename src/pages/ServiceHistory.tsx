import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser, User as AuthUser } from "@/utils/auth";
import { Calendar, MapPin, User, Star, DollarSign, Clock } from "lucide-react";

interface ServiceRecord {
  id: string;
  serviceName: string;
  description: string;
  price: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  rating?: number;
  customerName?: string;
  workerName?: string;
  location: string;
}

const ServiceHistory = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [serviceHistory, setServiceHistory] = useState<ServiceRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    
    // Load service history from localStorage
    const history = JSON.parse(localStorage.getItem(`service_history_${currentUser.id}`) || '[]');
    
    // If no history exists, create some sample data
    if (history.length === 0) {
      const sampleHistory: ServiceRecord[] = currentUser.userType === 'customer' ? [
        {
          id: '1',
          serviceName: 'Plumbing Repair',
          description: 'Kitchen sink pipe repair',
          price: 1500,
          date: '2024-01-15',
          status: 'completed' as const,
          rating: 5,
          workerName: 'Raj Kumar',
          location: 'Mumbai, Maharashtra'
        },
        {
          id: '2',
          serviceName: 'Electrical Work',
          description: 'Ceiling fan installation',
          price: 800,
          date: '2024-01-20',
          status: 'completed' as const,
          rating: 4,
          workerName: 'Amit Sharma',
          location: 'Mumbai, Maharashtra'
        },
        {
          id: '3',
          serviceName: 'House Cleaning',
          description: 'Deep cleaning service',
          price: 2000,
          date: '2024-01-25',
          status: 'pending' as const,
          workerName: 'Priya Services',
          location: 'Mumbai, Maharashtra'
        }
      ] : [
        {
          id: '1',
          serviceName: 'Plumbing Service',
          description: 'Bathroom pipe repair',
          price: 1200,
          date: '2024-01-10',
          status: 'completed' as const,
          rating: 5,
          customerName: 'Sunita Patel',
          location: 'Andheri, Mumbai'
        },
        {
          id: '2',
          serviceName: 'Kitchen Repair',
          description: 'Water leakage fix',
          price: 2500,
          date: '2024-01-18',
          status: 'completed' as const,
          rating: 4,
          customerName: 'Ramesh Gupta',
          location: 'Bandra, Mumbai'
        },
        {
          id: '3',
          serviceName: 'Emergency Call',
          description: 'Burst pipe emergency',
          price: 3000,
          date: '2024-01-22',
          status: 'pending' as const,
          customerName: 'Meera Shah',
          location: 'Powai, Mumbai'
        }
      ];
      
      localStorage.setItem(`service_history_${currentUser.id}`, JSON.stringify(sampleHistory));
      setServiceHistory(sampleHistory);
    } else {
      setServiceHistory(history);
    }
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'cancelled':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const getTotalEarnings = () => {
    return serviceHistory
      .filter(record => record.status === 'completed')
      .reduce((total, record) => total + record.price, 0);
  };

  const getCompletedJobs = () => {
    return serviceHistory.filter(record => record.status === 'completed').length;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Service History
            </h1>
            <p className="text-xl text-muted-foreground">
              {user.userType === 'customer' 
                ? "Track all your service requests and bookings"
                : "View your completed jobs and earnings"
              }
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total {user.userType === 'customer' ? 'Spent' : 'Earned'}</p>
                    <p className="text-2xl font-bold text-primary">₹{getTotalEarnings().toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Jobs</p>
                    <p className="text-2xl font-bold text-success">{getCompletedJobs()}</p>
                  </div>
                  <Clock className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Services</p>
                    <p className="text-2xl font-bold text-foreground">{serviceHistory.length}</p>
                  </div>
                  <User className="h-8 w-8 text-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service History List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {user.userType === 'customer' ? 'Your Service Requests' : 'Your Completed Jobs'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {serviceHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">No service history found</p>
                  <p className="text-muted-foreground">
                    {user.userType === 'customer' 
                      ? "Start by posting your first job request"
                      : "Complete your first service to see it here"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {serviceHistory.map((record) => (
                    <div key={record.id} className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {record.serviceName}
                              </h3>
                              <p className="text-muted-foreground">{record.description}</p>
                            </div>
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {record.location}
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {user.userType === 'customer' ? record.workerName : record.customerName}
                            </div>
                            {record.rating && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {record.rating}/5
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">₹{record.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;