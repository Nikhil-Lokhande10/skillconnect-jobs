import { Search, UserCheck, Calendar, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Search & Discover",
      description: "Browse our categories or search for specific services you need. Filter by location, price, and ratings."
    },
    {
      icon: UserCheck,
      number: "02", 
      title: "Choose Professional",
      description: "Review profiles, read reviews, and compare quotes from verified professionals in your area."
    },
    {
      icon: Calendar,
      number: "03",
      title: "Book & Schedule",
      description: "Select your preferred date and time. Communicate directly with the professional through our platform."
    },
    {
      icon: Star,
      number: "04",
      title: "Complete & Review",
      description: "Get your job done professionally and leave a review to help other customers make informed decisions."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How SkillConnect Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting professional help for your needs is easier than ever. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full">
                    <div className="h-0.5 bg-gradient-to-r from-primary to-primary/30 w-3/4"></div>
                  </div>
                )}

                {/* Step Card */}
                <div className="text-center space-y-6">
                  {/* Number Badge */}
                  <div className="relative inline-block">
                    <div className="w-32 h-32 bg-gradient-hero rounded-full flex items-center justify-center mx-auto shadow-glow">
                      <IconComponent className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-secondary rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-sm font-bold text-white">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">
            Ready to get started?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-primary transform hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => window.location.href = '/register?tab=customer'}
            >
              Post Your First Job
            </button>
            <button 
              className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-primary transition-all duration-300"
              onClick={() => window.location.href = '/register?tab=worker'}
            >
              Join as Professional
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;