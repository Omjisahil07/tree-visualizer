
import { TreeVisualization } from "../TreeVisualization";
import { NodeVisitationSequence } from "./NodeVisitationSequence";
import { TraversalControls } from "./TraversalControls";
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
    <div className="space-y-4">
      <div className="w-full">
        <TreeVisualization
          tree={tree}
          onNodeDelete={() => {}}
          onNodeClick={() => {}}
          onNodeHighlight={() => {}}
          currentNode={currentNode}
          visitedNodes={visitedNodes}
          nodeStates={nodeStates}
        />
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
        <TraversalControls
          onStart={onStartTraversal}
          onPause={onPauseTraversal}
          onReset={onResetTraversal}
          isTraversing={isTraversing}
          traversalType={traversalType}
          onTraversalTypeChange={onTraversalTypeChange}
        />
        
        <NodeVisitationSequence visitedNodes={visitedNodes} />
      </div>
    </div>
  );
};
