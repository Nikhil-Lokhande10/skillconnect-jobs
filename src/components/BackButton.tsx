import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show back button on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
      className="mb-6 text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;