
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodeInsertForm } from "./NodeInsertForm";
import { TraversalPseudocode } from "./TraversalPseudocode";

interface BinaryTreeControlPanelProps {
  traversalType: string;
  currentStep: string;
  currentLine: number;
  onInsertNode: (value: number) => void;
}

export const BinaryTreeControlPanel = ({
  traversalType,
  currentStep,
  currentLine,
  onInsertNode,
}: BinaryTreeControlPanelProps) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-lg">Controls</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <NodeInsertForm onInsert={onInsertNode} />
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-lg">
            {traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <TraversalPseudocode
            currentStep={currentStep}
            currentLine={currentLine}
            traversalType={traversalType}
          />
        </CardContent>
      </Card>
    </div>
  );
};
