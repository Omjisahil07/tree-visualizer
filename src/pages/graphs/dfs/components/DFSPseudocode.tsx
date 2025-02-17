
interface DFSPseudocodeProps {
  currentStep: string;
  currentLine: number;
}

export const DFSPseudocode = ({ currentStep, currentLine }: DFSPseudocodeProps) => {
  const lines = [
    "procedure DFS(G, v)",
    "  mark v as visited",
    "  for all neighbors w of v",
    "    if w is not visited",
    "      DFS(G, w)",
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium mb-4">DFS Pseudocode</h3>
      <div className="font-mono text-sm">
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
        <div className="mt-4 p-2 bg-muted text-sm">
          Current step: {currentStep}
        </div>
      )}
    </div>
  );
};
