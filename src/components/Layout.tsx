
import React from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  hideHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideFooter = false,
  hideHeader = false
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white">
      {!isHomePage && !hideHeader && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
