import { Search, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-workers.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Connect with
                <span className="block text-secondary">Skilled Workers</span>
                Near You
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-lg">
                Find trusted professionals for all your home and business needs. 
                From plumbing to electrical work, we've got you covered.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="What service do you need?"
                    className="pl-12 h-12 bg-white border-0 text-foreground placeholder:text-gray-500"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Your location"
                    className="pl-12 h-12 bg-white border-0 text-foreground placeholder:text-gray-500"
                  />
                </div>
              </div>
              <Button variant="secondary" size="lg" className="w-full mt-4">
                <Search className="h-5 w-5 mr-2" />
                Find Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">10K+</div>
                <div className="text-white/80">Skilled Workers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">50K+</div>
                <div className="text-white/80">Jobs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">95%</div>
                <div className="text-white/80">Customer Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - Call to Action Cards */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Need a Service?</h3>
                <p className="text-white/80">
                  Post your job and get quotes from verified professionals in your area.
                </p>
                <Button variant="secondary" size="lg" className="w-full">
                  Post a Job
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Are You a Professional?</h3>
                <p className="text-white/80">
                  Join our platform and connect with customers who need your skills.
                </p>
                <Link to="/register?tab=worker">
                  <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-primary">
                    Join as Worker
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;