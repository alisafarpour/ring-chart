import React, { useEffect, useState } from 'react';

const CircularRings = ({ data = [], centerText = "22K" }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate ring dimensions
  const calculateRing = (index) => {
    const gap = 20;
    const baseSize = 400;
    const ringWidth = 10;
    const size = baseSize - (index * (ringWidth + gap));
    return {
      size: baseSize,
      radius: (size / 2) - ringWidth,
      circumference: (size - ringWidth) * Math.PI,
      strokeWidth: ringWidth
    };
  };

  return (
    <div className="relative w-[400px] h-[400px] bg-white rounded-full">
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <span className="text-1xl font-bold text-gray-800">{centerText}</span>
        </div>
      </div>
      
      {/* Gradients definitions */}
      <svg width="0" height="0">
        <defs>
          {data.map((item, index) => (
            <linearGradient key={`gradient-${index}`} id={`gradient-${index}`}>
              <stop offset="0%" stopColor={item.startColor || item.color} />
              <stop offset="100%" stopColor={item.endColor || item.color} />
            </linearGradient>
          ))}
        </defs>
      </svg>
      
      {/* Rings */}
      <div className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
        {data.map((_, index) => {
          const { size, radius, circumference, strokeWidth } = calculateRing(index);
          const dataItem = data[index];
          const progress = animated ? dataItem.value : 0;
          const dashOffset = circumference - (progress / 100) * circumference;

          return (
            <div 
              key={index}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="absolute"
              >
                {/* Background circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  className="stroke-gray-100"
                  fill="none"
                  strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  style={{
                    stroke: `url(#gradient-${index})`,
                    strokeDasharray: circumference,
                    strokeDashoffset: dashOffset
                  }}
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircularRings;