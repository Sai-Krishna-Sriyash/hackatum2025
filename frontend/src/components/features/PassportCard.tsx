// File: src/components/PassportCard.tsx
import React from 'react';

interface PassportCardProps {
  title: string;
  imageUrl?: string;
  isStamped?: boolean;
}

const PassportCard = ({ title, imageUrl, isStamped = false }: PassportCardProps) => {
  return (
    // Added flex-shrink-0 to prevent squishing in the scroll view
    <div className="flex-shrink-0 flex flex-col items-center gap-2 p-2 transition-transform hover:scale-105 cursor-pointer w-36">

      {/* Flag Container */}
      <div className={`
        relative w-32 h-24 rounded-md overflow-hidden shadow-md border-2
        transition-all duration-300
        ${isStamped 
          ? 'grayscale-0 border-[#67C090]' // Visited: Full Color + Green Border
          : 'grayscale opacity-60 border-gray-300'} // Unvisited: Faded + Gray Border
      `}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
             <span className="text-2xl">🏳️</span>
          </div>
        )}
      </div>

      {/* Title - Using your Dark Blue #124170 */}
      <span className={`text-sm font-bold ${isStamped ? 'text-[#124170]' : 'text-[#26667F]/70'}`}>
        {title}
      </span>
    </div>
  );
};

export default PassportCard;