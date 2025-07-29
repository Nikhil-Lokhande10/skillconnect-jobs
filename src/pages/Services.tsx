import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Wrench, Zap, Home, Car, Paintbrush, Camera, Users, Shield, Briefcase, Hammer } from "lucide-react";

const allServices = [
  { icon: Wrench, name: "Plumbing", description: "Pipe repairs, installations, and maintenance", jobs: 342, color: "bg-blue-100 text-blue-600" },
  { icon: Zap, name: "Electrical", description: "Wiring, fixtures, and electrical repairs", jobs: 256, color: "bg-yellow-100 text-yellow-600" },
  { icon: Home, name: "Carpentry", description: "Custom woodwork and furniture making", jobs: 189, color: "bg-orange-100 text-orange-600" },
  { icon: Car, name: "Auto Repair", description: "Vehicle maintenance and repair services", jobs: 298, color: "bg-red-100 text-red-600" },
  { icon: Paintbrush, name: "Painting", description: "Interior and exterior painting services", jobs: 167, color: "bg-green-100 text-green-600" },
  { icon: Camera, name: "Photography", description: "Event and portrait photography", jobs: 89, color: "bg-purple-100 text-purple-600" },
  { icon: Users, name: "Cleaning", description: "House and office cleaning services", jobs: 234, color: "bg-pink-100 text-pink-600" },
  { icon: Shield, name: "Security", description: "Security systems and monitoring", jobs: 145, color: "bg-indigo-100 text-indigo-600" },
  { icon: Briefcase, name: "Landscaping", description: "Garden design and maintenance", jobs: 178, color: "bg-green-100 text-green-600" },
  { icon: Hammer, name: "Construction", description: "Building and renovation work", jobs: 312, color: "bg-gray-100 text-gray-600" },
  { icon: Wrench, name: "HVAC", description: "Heating and cooling system services", jobs: 156, color: "bg-blue-100 text-blue-600" },
  { icon: Car, name: "Moving", description: "Professional moving and relocation", jobs: 98, color: "bg-orange-100 text-orange-600" }
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const filteredServices = allServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            All Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Find the perfect professional for any job. Browse our complete catalog of skilled workers and services.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-card rounded-2xl p-6 shadow-lg border">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-background text-foreground"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Enter location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="pl-12 h-12 bg-background text-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="group relative">
                  <div className="bg-card rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                    <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{service.name}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{service.jobs} jobs available</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = `/service/${service.name.toLowerCase()}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;