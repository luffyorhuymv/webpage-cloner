import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import ZaloButton from "@/components/ZaloButton";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  showSidebar?: boolean;
  sidebarPosition?: "left" | "right";
  sidebarProps?: {
    showCategories?: boolean;
    showBestSellers?: boolean;
    showContact?: boolean;
    showSearch?: boolean;
  };
}

const PageLayout = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  showSidebar = true,
  sidebarPosition = "right",
  sidebarProps = {},
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Page Header - WordPress Style */}
      <div className="pt-32 lg:pt-40">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8 lg:py-12">
          <div className="container-custom">
            <h1 className="text-2xl lg:text-4xl font-bold">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-primary-foreground/80 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Main Content */}
      <main className="py-8 lg:py-12">
        <div className="container-custom">
          {showSidebar ? (
            <div className={`flex flex-col lg:flex-row gap-8 ${sidebarPosition === "left" ? "lg:flex-row-reverse" : ""}`}>
              {/* Content Area */}
              <div className="flex-1 min-w-0">
                {children}
              </div>

              {/* Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <Sidebar {...sidebarProps} />
              </div>
            </div>
          ) : (
            <div>{children}</div>
          )}
        </div>
      </main>

      <Footer />
      <ZaloButton />
    </div>
  );
};

export default PageLayout;
