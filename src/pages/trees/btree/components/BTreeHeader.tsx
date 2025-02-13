
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface BTreeHeaderProps {
  onGenerateRandom: () => void;
}

export const BTreeHeader = ({ onGenerateRandom }: BTreeHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">B-Tree Visualization</h1>
      <Button
        onClick={onGenerateRandom}
        variant="outline"
        className="gap-2"
      >
        <Wand2 className="w-4 h-4" />
        Generate Random Tree
      </Button>
    </div>
  );
};
