import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TraversalStepsProps {
  currentStep: string;
  traversalArray: number[];
  traversalType: string;
}

const TraversalSteps = ({ currentStep, traversalArray, traversalType }: TraversalStepsProps) => {
  return (
    <div className="mt-4">
      {currentStep && (
        <Card className="mb-4 bg-black text-white">
          <CardHeader>
            <CardTitle className="text-xl">{traversalType} Traversal</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {currentStep.split('\n').map((line, i) => (
                <div 
                  key={i}
                  className={`p-1 ${
                    line.includes('visit') ? 'bg-yellow-500 text-black' : 
                    line.includes('if') ? 'bg-red-500' : ''
                  }`}
                >
                  {line}
                </div>
              ))}
            </pre>
          </CardContent>
        </Card>
      )}
      {traversalArray.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Visitation sequence:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {traversalArray.map((value, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full"
                >
                  {value}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TraversalSteps;