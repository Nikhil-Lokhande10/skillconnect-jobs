import { Wrench, Zap, Paintbrush, Hammer, Car, Home, Droplets, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServiceCategories = () => {
  const categories = [
    { 
      icon: Wrench, 
      name: "Plumbing", 
      description: "Pipe repairs, installations, leak fixes",
      jobs: "1,200+ jobs",
      color: "bg-blue-500"
    },
    { 
      icon: Zap, 
      name: "Electrical", 
      description: "Wiring, repairs, installations",
      jobs: "950+ jobs",
      color: "bg-yellow-500"
    },
    { 
      icon: Paintbrush, 
      name: "Painting", 
      description: "Interior & exterior painting services",
      jobs: "800+ jobs",
      color: "bg-green-500"
    },
    { 
      icon: Hammer, 
      name: "Carpentry", 
      description: "Furniture, repairs, custom work",
      jobs: "650+ jobs",
      color: "bg-orange-500"
    },
    { 
      icon: Car, 
      name: "Automotive", 
      description: "Car repairs, maintenance, detailing",
      jobs: "400+ jobs",
      color: "bg-red-500"
    },
    { 
      icon: Home, 
      name: "Cleaning", 
      description: "House cleaning, deep cleaning",
      jobs: "1,100+ jobs",
      color: "bg-purple-500"
    },
    { 
      icon: Droplets, 
      name: "HVAC", 
      description: "Heating, cooling, ventilation",
      jobs: "300+ jobs",
      color: "bg-cyan-500"
    },
    { 
      icon: Shield, 
      name: "Security", 
      description: "Installation, maintenance, monitoring",
      jobs: "200+ jobs",
      color: "bg-gray-600"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Popular Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through our most requested services and find the perfect professional for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-card-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {category.jobs}
                    </p>
                  </div>

                  {/* Button appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" size="sm" className="w-full">
                      View Services
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;