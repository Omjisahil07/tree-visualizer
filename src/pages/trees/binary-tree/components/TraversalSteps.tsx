import { Card } from "@/components/ui/card";

interface TraversalStepsProps {
  currentNode: number | null;
  visitationSequence: number[];
  currentStep: string;
}

export const TraversalSteps = ({ currentNode, visitationSequence, currentStep }: TraversalStepsProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-yellow-400">
        <div className="space-y-2">
          {currentNode && (
            <p className="font-mono">Visit vertex with value {currentNode}.</p>
          )}
          <p className="font-mono">
            Visitation sequence: {visitationSequence.join(',')}
          </p>
        </div>
      </Card>
      
      <Card className="p-4 bg-red-500 text-white font-mono">
        <pre className="whitespace-pre-wrap">
          {currentStep === 'check' && 'if this is null\n    return'}
          {currentStep === 'left' && 'Inorder(left)'}
          {currentStep === 'visit' && 'visit this'}
          {currentStep === 'right' && 'Inorder(right)'}
        </pre>
      </Card>
    </div>
  );
};