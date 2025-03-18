
import React from "react";

export const EmptyListMessage: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 text-center">
      <p className="text-muted-foreground">Empty list. Add nodes to visualize.</p>
    </div>
  );
};
