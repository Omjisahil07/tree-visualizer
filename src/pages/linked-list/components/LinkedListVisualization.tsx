
import { FC } from "react";
import { LinkedListNode } from "./LinkedListNode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LinkedListVisualizationProps {
  nodes: number[];
  currentStep: number;
  steps: { description: string; nodeIndices: number[] }[];
  isCircular?: boolean;
  isDoublyLinked?: boolean;
}

export const LinkedListVisualization: FC<LinkedListVisualizationProps> = ({
  nodes,
  currentStep,
  steps,
  isCircular = false,
  isDoublyLinked = false
}) => {
  const currentStepData = steps[currentStep] || { description: "", nodeIndices: [] };
  const [currentNodeIndex, previousNodeIndex] = currentStepData.nodeIndices;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {nodes.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-muted-foreground">
            Empty linked list. Add nodes to visualize.
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center mb-4 overflow-x-auto py-8">
              <div className="flex space-x-1">
                {nodes.map((value, index) => (
                  <LinkedListNode
                    key={index}
                    value={value}
                    isActive={currentStepData.nodeIndices.includes(index)}
                    isCurrent={index === currentNodeIndex}
                    isPrevious={index === previousNodeIndex}
                    showArrows={true}
                    isDoubleArrow={isDoublyLinked}
                    isCircular={isCircular && index === nodes.length - 1}
                    isFirst={index === 0}
                    isLast={index === nodes.length - 1}
                  />
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Step {currentStep + 1}/{steps.length}:</span> {currentStepData.description}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
