
import { Card, CardContent } from "@/components/ui/card";
import { TreeVisualization } from "../TreeVisualization";
import { NodeVisitationSequence } from "./NodeVisitationSequence";
import { TraversalControls } from "./TraversalControls";
import { TraversalPseudocode } from "./TraversalPseudocode";
import { BinaryTreeNode, TraversalState } from "../types/BinaryTreeTypes";

interface BinaryTreeVisualizationPanelProps {
  tree: BinaryTreeNode;
  currentNode: number | null;
  visitedNodes: number[];
  nodeStates: Map<number, TraversalState>;
  isTraversing: boolean;
  traversalType: string;
  currentStep: string;
  currentLine: number;
  onStartTraversal: () => void;
  onPauseTraversal: () => void;
  onResetTraversal: () => void;
  onTraversalTypeChange: (type: string) => void;
}

export const BinaryTreeVisualizationPanel = ({
  tree,
  currentNode,
  visitedNodes,
  nodeStates,
  isTraversing,
  traversalType,
  currentStep,
  currentLine,
  onStartTraversal,
  onPauseTraversal,
  onResetTraversal,
  onTraversalTypeChange,
}: BinaryTreeVisualizationPanelProps) => {
  return (
    <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Visualization - 8 columns */}
      <div className="lg:col-span-8">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <TreeVisualization
              tree={tree}
              onNodeDelete={() => {}}
              onNodeClick={() => {}}
              onNodeHighlight={() => {}}
              currentNode={currentNode}
              visitedNodes={visitedNodes}
              nodeStates={nodeStates}
            />
          </CardContent>
        </Card>
        
        <div className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <TraversalControls
                onStart={onStartTraversal}
                onPause={onPauseTraversal}
                onReset={onResetTraversal}
                isTraversing={isTraversing}
                traversalType={traversalType}
                onTraversalTypeChange={onTraversalTypeChange}
              />
              
              <NodeVisitationSequence visitedNodes={visitedNodes} />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Pseudocode - 4 columns */}
      <div className="lg:col-span-4">
        <Card className="shadow-sm h-full">
          <CardContent className="p-4">
            <TraversalPseudocode
              currentStep={currentStep}
              currentLine={currentLine}
              traversalType={traversalType}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
