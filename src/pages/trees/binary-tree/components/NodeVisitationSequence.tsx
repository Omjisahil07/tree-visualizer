
interface NodeVisitationSequenceProps {
  visitedNodes: number[];
}

export const NodeVisitationSequence = ({ visitedNodes }: NodeVisitationSequenceProps) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Visitation Sequence:</h3>
      <div className="flex flex-wrap gap-2">
        {visitedNodes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No nodes visited yet</p>
        ) : (
          visitedNodes.map((node, index) => (
            <div
              key={`${node}-${index}`}
              className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {node}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
