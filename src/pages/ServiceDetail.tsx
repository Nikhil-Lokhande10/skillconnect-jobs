import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, MapPin, Phone, Mail, Shield, Clock } from "lucide-react";
import { useState } from "react";

const serviceDetails = {
  plumbing: {
    name: "Plumbing Services",
    description: "Professional plumbing services for residential and commercial properties",
    longDescription: "Our certified plumbers provide comprehensive plumbing services including pipe repairs, installations, leak detection, drain cleaning, and emergency plumbing services. We use the latest tools and techniques to ensure quality work that lasts.",
    services: ["Pipe Installation & Repair", "Leak Detection & Repair", "Drain Cleaning", "Water Heater Installation", "Emergency Plumbing", "Bathroom & Kitchen Plumbing"],
    averagePrice: "$75-150/hour",
    responseTime: "Within 2 hours for emergencies"
  },
  electrical: {
    name: "Electrical Services",
    description: "Licensed electricians for all your electrical needs",
    longDescription: "Our licensed electricians handle everything from simple outlet installations to complex electrical system upgrades. We prioritize safety and code compliance in all our work.",
    services: ["Wiring & Rewiring", "Outlet & Switch Installation", "Circuit Breaker Repair", "Lighting Installation", "Electrical Panel Upgrades", "Safety Inspections"],
    averagePrice: "$80-120/hour",
    responseTime: "Same day for urgent requests"
  },
  carpentry: {
    name: "Carpentry Services",
    description: "Custom woodwork and furniture craftsmanship",
    longDescription: "Skilled carpenters who create beautiful, functional woodwork for your home or business. From custom furniture to structural repairs, we deliver quality craftsmanship.",
    services: ["Custom Furniture", "Cabinet Installation", "Trim & Molding", "Deck & Patio Construction", "Structural Repairs", "Built-in Storage Solutions"],
    averagePrice: "$50-100/hour",
    responseTime: "Within 24-48 hours"
  }
};

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const { toast } = useToast();
  const [jobRequest, setJobRequest] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    urgency: "normal"
  });

  const service = serviceDetails[serviceName as keyof typeof serviceDetails];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-4">The service you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.href = '/services'}>
            Browse All Services
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Job Request Submitted!",
      description: "We'll connect you with qualified professionals in your area within 24 hours.",
    });
    setJobRequest({
      name: "",
      email: "",
      phone: "",
      location: "",
      description: "",
      urgency: "normal"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setJobRequest(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {service.longDescription}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Service Information */}
            <div className="space-y-8">
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">What We Offer</h2>
                <div className="grid gap-4">
                  {service.services.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Pricing & Response</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Average Rate:</span>
                    <span className="font-semibold text-foreground">{service.averagePrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-semibold text-foreground">{service.responseTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Professionals</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Highly Rated Professionals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Reliable & Punctual</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Request Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Request This Service</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      value={jobRequest.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={jobRequest.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={jobRequest.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location *
                    </label>
                    <Input
                      name="location"
                      value={jobRequest.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Description *
                  </label>
                  <Textarea
                    name="description"
                    value={jobRequest.description}
                    onChange={handleChange}
                    placeholder="Describe your project in detail..."
                    rows={5}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Urgency
                  </label>
                  <select
                    name="urgency"
                    value={jobRequest.urgency}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="normal">Normal (within a week)</option>
                    <option value="urgent">Urgent (within 2-3 days)</option>
                    <option value="emergency">Emergency (same day)</option>
                  </select>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Job Request
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  By submitting, you agree to receive quotes from qualified professionals in your area.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;