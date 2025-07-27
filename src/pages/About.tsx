import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Users, Shield, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            About SkillConnect
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're on a mission to connect skilled professionals with people who need their expertise, 
            creating opportunities and building stronger communities.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              SkillConnect was born from a simple observation: there are incredibly talented skilled workers 
              in every community, but finding them can be challenging. Whether you need a plumber, electrician, 
              carpenter, or any other professional service, the process of finding reliable, skilled workers 
              shouldn't be difficult.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              We created SkillConnect to bridge this gap, providing a platform where skilled professionals 
              can showcase their expertise and connect directly with customers who need their services. 
              Our goal is to make it easier for everyone involved – customers get quality work done, 
              and professionals get fair opportunities to grow their business.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to serve thousands of skilled workers and customers across the country, 
              facilitating meaningful connections that benefit entire communities.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Community First</h3>
              <p className="text-muted-foreground">
                We believe in building strong local communities by connecting neighbors and supporting local businesses.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Trust & Safety</h3>
              <p className="text-muted-foreground">
                Every professional on our platform is verified, ensuring peace of mind for all our users.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We're committed to helping skilled professionals deliver exceptional work and grow their careers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Fairness</h3>
              <p className="text-muted-foreground">
                Fair pricing, fair opportunities, and fair treatment for everyone in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Join Our Mission</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <p className="text-lg text-muted-foreground mb-6">
              Whether you're a skilled professional looking to grow your business or someone who needs 
              reliable services, we invite you to be part of the SkillConnect community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/register?tab=worker'}
              >
                Join as Professional
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/register?tab=customer'}
              >
                Find Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;