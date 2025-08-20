import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks";
import JobListings from "@/components/JobListings";
import AddJobForm from "@/components/AddJobForm"; // <-- Add this line

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServiceCategories />
      <HowItWorks />
      <AddJobForm /> {/* <-- Add this line */}
      <JobListings /> {/* <-- Add this line */}
    </div>
  );
};

export default Landing;
