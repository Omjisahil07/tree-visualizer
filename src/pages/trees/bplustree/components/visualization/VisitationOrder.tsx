
import { memo } from 'react';

interface VisitationOrderProps {
  visitedNodes: number[];
}

export const VisitationOrder = memo(({ visitedNodes }: VisitationOrderProps) => {
  if (visitedNodes.length === 0) return null;
  
  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-sm border border-border">
      <h4 className="text-sm font-medium mb-2">Visitation Order</h4>
      <div className="flex gap-2">
        {visitedNodes.map((node, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold"
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
});

VisitationOrder.displayName = 'VisitationOrder';
