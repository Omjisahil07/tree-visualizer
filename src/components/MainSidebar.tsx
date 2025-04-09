
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Trees, 
  Link2 as LinkIcon, 
  GitGraph, 
  ChevronRight,
  Info,
  MessageSquare,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const MainSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const menuItems = [
    { 
      name: "Home", 
      path: "/", 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      name: "Tree Structures", 
      path: "/tree", 
      icon: <Trees className="h-5 w-5" /> 
    },
    { 
      name: "Linked Lists", 
      path: "/linked-list", 
      icon: <LinkIcon className="h-5 w-5" /> 
    },
    { 
      name: "Graph Visualization", 
      path: "/graph", 
      icon: <GitGraph className="h-5 w-5" /> 
    },
    { 
      name: "About", 
      path: "/about", 
      icon: <Info className="h-5 w-5" /> 
    },
    { 
      name: "Contact", 
      path: "/contact", 
      icon: <MessageSquare className="h-5 w-5" /> 
    }
  ];
  
  return (
    <div className="hidden md:block">
      <div 
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r transition-all duration-300 ease-in-out z-20",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-3 top-3" 
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
          
          <div className="mt-12 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center group rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors",
                  location.pathname === item.path && "bg-accent/50 font-medium"
                )}
              >
                <div className="mr-3">{item.icon}</div>
                <span className={cn(
                  "transition-opacity duration-300",
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                )}>
                  {item.name}
                </span>
                {!isOpen && (
                  <div className="absolute left-full ml-2 p-2 rounded bg-popover text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Adjust content margin when sidebar is open */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isOpen ? "ml-64" : "ml-20"
      )}>
        {/* Content will be rendered here */}
      </div>
    </div>
  );
};
