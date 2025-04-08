
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface BinaryTreeHeaderProps {
  onGenerateRandomTree: () => void;
}

export const BinaryTreeHeader = ({ onGenerateRandomTree }: BinaryTreeHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Binary Tree Visualization</h1>
      
      <div className="flex justify-end mb-2">
        <Button
          onClick={onGenerateRandomTree}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <Wand2 className="w-4 h-4" />
          Generate Random Tree
        </Button>
      </div>
    </>
  );
};
