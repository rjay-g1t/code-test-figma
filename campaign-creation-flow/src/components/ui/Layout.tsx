import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Stepper from './Stepper';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main layout with sidebar and content */}
      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 md:ml-0 mt-0 h-[calc(100vh)] overflow-hidden bg-white">
          {/* Header */}
          <Header />
          <div className="h-full max-w-7xl mx-auto flex gap-2 md:gap-4 lg:gap-8 p-2 md:p-4 lg:p-8">
            {/* Progress stepper positioned near content - Hidden on mobile, show on tablet+ */}
            <div className="hidden md:flex w-12 lg:w-16 justify-center pt-4 lg:pt-8 flex-shrink-0">
              <Stepper />
            </div>

            {/* Content with gradient border card - scrollable */}
            <div className="flex-1 h-full overflow-y-auto">
              {/* Gradient border container exactly like Figma */}
              <div className="p-0.5 md:p-1 bg-gradient-to-r rounded-xl md:rounded-2xl h-full">
                <div className="rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 bg-white h-full overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
