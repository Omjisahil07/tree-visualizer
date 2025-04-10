
import { Link } from "react-router-dom";
import { Home, TreePine, List, GitGraph } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Trees", href: "/tree", icon: TreePine },
    { name: "Linked Lists", href: "/linked-list", icon: List },
    { name: "Graphs", href: "/graph", icon: GitGraph },
  ];

  return (
    <header className="w-full bg-primary/10 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">
            Data Structure Visualizer
          </Link>
          
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = 
                item.href === "/" 
                  ? location.pathname === "/" 
                  : location.pathname.startsWith(item.href);
                  
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/10 hover:text-primary hover:scale-105"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
