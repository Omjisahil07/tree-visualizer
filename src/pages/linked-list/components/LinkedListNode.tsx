
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LinkedListNodeProps {
  value: number;
  index: number;
  isHighlighted: boolean;
  isVisited: boolean;
  nextAddress?: number | null;
  prevAddress?: number | null;
}

export const LinkedListNodeComponent: React.FC<LinkedListNodeProps> = ({
  value,
  index,
  isHighlighted,
  isVisited,
  nextAddress,
  prevAddress
}) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    // If the value has changed, trigger the update animation
    if (value !== prevValue) {
      setIsUpdating(true);
      
      // Reset the animation state after animation completes
      const timer = setTimeout(() => {
        setIsUpdating(false);
        setPrevValue(value);
      }, 600); // Slightly longer than the animation duration
      
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all duration-300",
          isHighlighted 
            ? "bg-primary text-primary-foreground scale-110 ring-2 ring-primary ring-offset-2" 
            : isVisited 
              ? "bg-primary/20 text-primary" 
              : "bg-white text-foreground border border-gray-200",
          isUpdating && "animate-pulse bg-yellow-100"
        )}
      >
        <span 
          className={cn(
            "font-bold text-lg transition-all",
            isUpdating && "scale-110 animate-bounce"
          )}
        >
          {value}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-1">
        {index}
      </span>
      {(nextAddress !== undefined || prevAddress !== undefined) && 
        <div className="text-xs mt-1 flex flex-col items-center">
          {prevAddress !== undefined && 
            <span className="text-blue-500 font-normal">
              prev: {prevAddress !== null ? prevAddress : 'null'}
            </span>
          }
          {nextAddress !== undefined && 
            <span className="text-green-500">
              next: {nextAddress !== null ? nextAddress : 'null'}
            </span>
          }
        </div>
      }
    </div>
  );
};
