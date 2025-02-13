
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface BPlusTreeControlsProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
}

export const BPlusTreeControls = ({
  inputValue,
  onInputChange,
  onSubmit,
  disabled = false
}: BPlusTreeControlsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Controls</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nodeValue">Node Value</Label>
          <Input
            id="nodeValue"
            type="number"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter a number"
          />
        </div>
        <Button type="submit" className="w-full gap-2" disabled={disabled}>
          <Plus className="h-4 w-4" />
          Insert Node
        </Button>
      </form>
    </div>
  );
};
