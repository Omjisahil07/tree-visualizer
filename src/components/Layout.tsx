
import React from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MainSidebar } from "@/components/MainSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <MainSidebar />
        <main className="flex-grow md:ml-20 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
