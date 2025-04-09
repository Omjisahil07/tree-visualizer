
import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Trees, 
  Link2, 
  GitGraph, 
  Menu, 
  X,
  ChevronRight
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  return (
    <header className="border-b sticky top-0 bg-background z-30">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Button variant="ghost" size="icon" asChild className="mr-4 md:hidden">
          <SheetTrigger>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
        </Button>
        
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Trees className="h-6 w-6" />
            <span>Data Visualizer</span>
          </Link>
        </div>
        
        <Sheet>
          {/* Mobile sidebar */}
          <SheetContent side="left" className="w-[260px] md:hidden pt-10">
            <nav className="grid gap-4 py-4">
              <Link
                to="/"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/tree"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Trees className="h-5 w-5" />
                <span>Tree Structures</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/linked-list"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Link2 className="h-5 w-5" />
                <span>Linked Lists</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/graph"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <GitGraph className="h-5 w-5" />
                <span>Graph Visualization</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/contact"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>Contact</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/about"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>About</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center ml-auto space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/">
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/tree">
                    <Trees className="h-5 w-5" />
                    <span className="sr-only">Tree Structures</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tree Structures</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/linked-list">
                    <Link2 className="h-5 w-5" />
                    <span className="sr-only">Linked Lists</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Linked Lists</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/graph">
                    <GitGraph className="h-5 w-5" />
                    <span className="sr-only">Graph Visualization</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Graph Visualization</TooltipContent>
            </Tooltip>
            
            <Button variant="ghost" asChild className="text-sm">
              <Link to="/contact">Contact</Link>
            </Button>
            
            <Button variant="ghost" asChild className="text-sm">
              <Link to="/about">About</Link>
            </Button>
          </TooltipProvider>
        </nav>
      </div>
    </header>
  );
};
