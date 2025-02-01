interface VisitationSequenceProps {
  sequence: number[];
}

export const VisitationSequence = ({ sequence }: VisitationSequenceProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Visitation Sequence</h3>
      <div className="flex flex-wrap gap-2">
        {sequence.map((value, index) => (
          <div
            key={index}
            className="px-3 py-1 bg-primary text-primary-foreground rounded-full font-medium animate-fade-in"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};