import React from "react";

interface BSTVisitationSequenceProps {
  sequence: number[];
}

export const BSTVisitationSequence: React.FC<BSTVisitationSequenceProps> = ({
  sequence,
}) => {
  if (sequence.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Visitation Sequence:</h3>
      <div className="flex flex-wrap gap-2">
        {sequence.map((value, index) => (
          <span
            key={index}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary"
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};