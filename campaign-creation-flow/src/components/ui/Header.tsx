import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-12 right-0 h-[40px] md:h-[48px] bg-white border-b border-gray-200 z-20 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center space-x-3">
        {/* Mobile menu button - Show only on mobile */}
        <button className="md:hidden p-1 rounded hover:bg-gray-100">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo - Show on mobile */}
        <div className="md:hidden w-6 h-6 flex items-center justify-center">
          <Image
            src="/icons/cheerful-bot.png"
            alt="Cheerful Bot"
            width={24}
            height={24}
            className="rounded"
          />
        </div>

        <h1 className="text-sm md:text-lg font-medium md:font-large text-gray-900 truncate">
          Untitled Campaign
        </h1>
      </div>

      {/* Mobile stepper indicator - Show only on mobile */}
      <div className="md:hidden text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        1/4
      </div>
    </div>
  );
};

export default Header;
