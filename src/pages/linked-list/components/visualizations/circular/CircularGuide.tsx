
import React from "react";
import { calculateNodePosition } from "./circularUtils";

interface CircularGuideProps {
  radius: number;
  centerX: number;
  centerY: number;
  nodeCount: number;
}

export const CircularGuide: React.FC<CircularGuideProps> = ({ 
  radius, 
  centerX, 
  centerY, 
  nodeCount 
}) => {
  return (
    <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -2 }}>
      {/* Circle guide */}
      <circle 
        cx={centerX} 
        cy={centerY} 
        r={radius} 
        stroke="#f1f5f9" 
        strokeWidth="2" 
        fill="none" 
        strokeDasharray="5,5"
      />
      
      {/* Index numbers */}
      {Array.from({ length: nodeCount }).map((_, index) => {
        const outerDistance = radius + 40;
        const { x, y } = calculateNodePosition(index, nodeCount, outerDistance, centerX, centerY);
        
        return (
          <text
            key={`index-${index}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="#94a3b8"
          >
            {index}
          </text>
        );
      })}
    </svg>
  );
};
