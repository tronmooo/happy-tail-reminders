
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, PawPrint, Bell, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b p-4 sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Happy Tail Reminders</h1>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={isActive("/community") ? "bg-muted" : ""}
              onClick={() => navigate("/community")}
            >
              <Users className="h-4 w-4 mr-2" />
              Community
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container py-4">
        {children}
      </main>
      
      <footer className="sticky bottom-0 border-t bg-background">
        <div className="container py-2">
          <nav className="flex justify-between items-center">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="flex flex-col items-center rounded-full h-16 w-16"
              onClick={() => navigate("/")}
            >
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
            
            <Button
              variant={isActive("/calendar") ? "default" : "ghost"}
              size="sm"
              className="flex flex-col items-center rounded-full h-16 w-16"
              onClick={() => navigate("/calendar")}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Calendar</span>
            </Button>
            
            <Button
              variant="default"
              size="icon"
              className="rounded-full h-14 w-14 shadow-lg -mt-5 animate-bounce-slight bg-pet-teal hover:bg-pet-teal/90"
              onClick={() => navigate("/reminders/new")}
            >
              <Plus className="h-6 w-6" />
            </Button>
            
            <Button
              variant={isActive("/reminders") ? "default" : "ghost"}
              size="sm"
              className="flex flex-col items-center rounded-full h-16 w-16"
              onClick={() => navigate("/reminders")}
            >
              <Bell className="h-5 w-5 mb-1" />
              <span className="text-xs">Reminders</span>
            </Button>
            
            <Button
              variant={isActive("/pets") ? "default" : "ghost"}
              size="sm"
              className="flex flex-col items-center rounded-full h-16 w-16"
              onClick={() => navigate("/pets")}
            >
              <PawPrint className="h-5 w-5 mb-1" />
              <span className="text-xs">Pets</span>
            </Button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
