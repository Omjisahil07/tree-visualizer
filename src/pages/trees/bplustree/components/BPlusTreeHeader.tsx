
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BPlusTreeHeaderProps {
  onGenerateRandom: () => void;
  onSetDegree: (degree: number) => void;
  isConfigured: boolean;
}

export const BPlusTreeHeader = ({
  onGenerateRandom,
  onSetDegree,
  isConfigured
}: BPlusTreeHeaderProps) => {
  const [degree, setDegree] = useState("");

  const handleSetDegree = (e: React.FormEvent) => {
    e.preventDefault();
    const degreeNum = parseInt(degree);
    
    if (isNaN(degreeNum) || degreeNum < 2) {
      toast.error("Please enter a valid degree (minimum 2)");
      return;
    }

    onSetDegree(degreeNum);
    toast.success(`B+ tree degree set to ${degreeNum}`);
  };

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">B+ Tree Visualization</h1>
      <p className="text-muted-foreground text-lg mb-6">
        Visualize B+ tree operations and understand how they maintain balance and order.
      </p>

      {!isConfigured ? (
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSetDegree} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Enter B+ Tree Degree (minimum 2)</Label>
              <Input
                id="degree"
                type="number"
                min="2"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Enter degree (e.g., 3)"
              />
            </div>
            <Button type="submit" className="w-full">Set Degree</Button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          <Button onClick={onGenerateRandom} variant="outline" className="gap-2">
            <Wand2 className="w-4 h-4" />
            Generate Random Tree
          </Button>
        </div>
      )}
    </div>
  );
};
