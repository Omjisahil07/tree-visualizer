
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This component is now deprecated in favor of more focused components
// Kept for backwards compatibility
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
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">B+ Tree Visualization</h1>
      <p className="text-muted-foreground text-sm mb-4">
        Visualize B+ tree operations and understand how they maintain balance and order.
      </p>

      {!isConfigured ? (
        <Card className="shadow-sm">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-lg">Configure B+ Tree</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <form onSubmit={handleSetDegree} className="space-y-3">
              <div>
                <Label htmlFor="degree" className="text-sm">B+ Tree Degree (minimum 2)</Label>
                <Input
                  id="degree"
                  type="number"
                  min="2"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="Enter degree (e.g., 3)"
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full" size="sm">Set Degree</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-end">
          <Button onClick={onGenerateRandom} variant="outline" className="gap-1" size="sm">
            <Wand2 className="w-4 h-4" />
            Generate Random Tree
          </Button>
        </div>
      )}
    </div>
  );
};
