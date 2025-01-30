import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TraversalStepsProps {
  currentStep: string;
  visitationSequence: number[];
  currentNode: number | null;
  traversalType: string;
}

const TraversalSteps = ({ 
  currentStep, 
  visitationSequence, 
  currentNode,
  traversalType 
}: TraversalStepsProps) => {
  return (
    <div className="mt-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{traversalType} Traversal</CardTitle>
        </CardHeader>
        <CardContent>
          {currentNode !== null && (
            <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
              <p className="font-medium">Visit vertex with value {currentNode}</p>
              <p>Visitation sequence: {visitationSequence.join(',')}</p>
            </div>
          )}
          <pre className="font-mono text-sm whitespace-pre-wrap">
            {currentStep.split('\n').map((line, i) => (
              <div 
                key={i}
                className={`p-2 ${
                  line.includes('visit') ? 'bg-black text-white' : 
                  line.includes('if') ? 'bg-red-500 text-white' :
                  line.includes('Inorder') ? 'bg-red-500 text-white' : ''
                }`}
              >
                {line}
              </div>
            ))}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default TraversalSteps;