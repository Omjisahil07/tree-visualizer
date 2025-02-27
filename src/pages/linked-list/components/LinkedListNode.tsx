
import { FC } from "react";

interface LinkedListNodeProps {
  value: number | string;
  isActive?: boolean;
  isPrevious?: boolean;
  isCurrent?: boolean;
  showArrows?: boolean;
  isDoubleArrow?: boolean;
  isCircular?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export const LinkedListNode: FC<LinkedListNodeProps> = ({
  value,
  isActive = false,
  isPrevious = false,
  isCurrent = false,
  showArrows = true,
  isDoubleArrow = false,
  isCircular = false,
  isFirst = false,
  isLast = false
}) => {
  const getNodeColor = () => {
    if (isCurrent) return "bg-primary text-white";
    if (isActive) return "bg-primary-light text-primary-foreground";
    if (isPrevious) return "bg-muted-foreground text-white";
    return "bg-background border-2 border-gray-300";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${getNodeColor()} shadow-md font-semibold text-lg transition-all duration-300`}
        >
          {value}
        </div>
        
        {showArrows && !isLast && (
          <div className="flex flex-col items-center mx-2">
            {isDoubleArrow && (
              <div className="h-0.5 w-10 bg-gray-500 mb-1 relative">
                <div className="absolute -top-1.5 right-0 w-3 h-3 border-t-2 border-r-2 border-gray-500 transform rotate-45"></div>
              </div>
            )}
            <div className="h-0.5 w-10 bg-gray-500 relative">
              <div className="absolute -top-1.5 right-0 w-3 h-3 border-t-2 border-r-2 border-gray-500 transform rotate-45"></div>
            </div>
          </div>
        )}
        
        {isCircular && isLast && (
          <div className="flex flex-col">
            <div className="h-0.5 w-16 bg-gray-500 relative transform translate-x-2">
              <div className="absolute -top-1.5 right-0 w-3 h-3 border-t-2 border-r-2 border-gray-500 transform rotate-45"></div>
            </div>
            {isDoubleArrow && (
              <div className="h-0.5 w-16 bg-gray-500 mt-1 relative transform translate-x-2">
                <div className="absolute -bottom-1.5 right-0 w-3 h-3 border-b-2 border-r-2 border-gray-500 transform rotate-45"></div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {isCircular && isLast && (
        <div className="w-[calc(100%+2rem)] h-16 border-t-2 border-r-2 border-l-2 border-gray-500 rounded-t-3xl -mt-8"></div>
      )}
    </div>
  );
};
