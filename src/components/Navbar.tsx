import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Briefcase, Moon, Sun, LogOut, Bell } from "lucide-react";
import { useTheme } from "next-themes";
import { getCurrentUser, logoutUser, User as AuthUser, AUTH_STORAGE_KEY } from "@/utils/auth";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import NotificationCenter from "@/components/NotificationCenter";

interface ProfileButtonProps {
  user: AuthUser;
  isMobile?: boolean;
}

const ProfileButton = ({ user, isMobile = false }: ProfileButtonProps) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPicture = localStorage.getItem(`profile_picture_${user.id}`);
    if (savedPicture) {
      setProfilePicture(savedPicture);
    }
  }, [user.id]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  if (isMobile) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start"
        onClick={handleProfileClick}
      >
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-hero flex items-center justify-center">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="h-3 w-3 text-white" />
            )}
          </div>
          <span className="text-sm font-medium">{user.fullName}</span>
        </div>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleProfileClick}
      className="flex items-center space-x-2 hover:bg-accent"
    >
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-hero flex items-center justify-center">
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <User className="h-4 w-4 text-white" />
        )}
      </div>
      <span className="text-sm font-medium text-foreground">
        {user.fullName}
      </span>
    </Button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    // Load from local cache first
    setCurrentUser(getCurrentUser());
    // Then sync with Supabase profile to ensure correct role/user data
    supabase.auth.getUser().then(async ({ data }) => {
      if (data?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, full_name, email, phone, location')
          .eq('user_id', data.user.id)
          .single();
        if (profile) {
          const cached = getCurrentUser();
          if (cached) {
            const synced: AuthUser = {
              ...cached,
              userType: profile.role === 'worker' ? 'worker' : 'customer',
              fullName: profile.full_name ?? cached.fullName,
              email: profile.email ?? cached.email,
              mobile: profile.phone ?? cached.mobile,
              location: profile.location ?? cached.location,
            };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(synced));
            setCurrentUser(synced);
          }
        }
      }
    });
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate("/");
  };

  return (
    <nav className="bg-background dark:bg-background shadow-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="favicon.ico"
                alt="SkillConnect Logo"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="text-2xl font-bold text-primary">SkillConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-accent"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {currentUser && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </Button>
                <NotificationCenter 
                  isOpen={showNotifications} 
                  onClose={() => setShowNotifications(false)} 
                />
              </div>
            )}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <ProfileButton user={currentUser} />
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm">
                    Join SkillConnect
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-accent"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-accent"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
                {currentUser && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                )}
                {currentUser ? (
                  <div className="space-y-2">
                    <ProfileButton user={currentUser} isMobile />
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="default" size="sm" className="w-full">
                        Join SkillConnect
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;