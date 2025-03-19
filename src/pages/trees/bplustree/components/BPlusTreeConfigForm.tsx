
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BPlusTreeConfigFormProps {
  onSetDegree: (degree: number) => void;
}

export const BPlusTreeConfigForm = ({ onSetDegree }: BPlusTreeConfigFormProps) => {
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
  );
};
