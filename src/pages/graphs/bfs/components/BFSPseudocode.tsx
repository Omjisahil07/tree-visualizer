
interface BFSPseudocodeProps {
  currentStep: string;
  currentLine: number;
}

export const BFSPseudocode = ({ currentStep, currentLine }: BFSPseudocodeProps) => {
  const lines = [
    "procedure BFS(G, start)",
    "  create queue Q",
    "  mark start as visited",
    "  Q.enqueue(start)",
    "  while Q is not empty",
    "    v = Q.dequeue()",
    "    for all neighbors w of v",
    "      if w is not visited",
    "        mark w as visited",
    "        Q.enqueue(w)",
  ];

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-medium mb-4">BFS Pseudocode</h3>
      <div className="font-mono text-sm bg-white p-4 rounded-lg shadow-sm mb-4 flex-grow">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`py-1 px-2 ${index === currentLine ? 'bg-primary text-white' : ''}`}
          >
            {line}
          </div>
        ))}
      </div>
      {currentStep && (
        <div className="p-3 bg-muted rounded-lg text-sm">
          <strong>Current step:</strong>
          <div className="mt-1">{currentStep}</div>
        </div>
      )}
    </div>
  );
};
