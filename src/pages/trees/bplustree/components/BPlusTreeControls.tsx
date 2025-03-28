
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This component is now deprecated in favor of BPlusTreeNodeInsertForm
// Kept for backwards compatibility
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
    <Card className="shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg">Insert Node</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Label htmlFor="nodeValue" className="text-sm">Node Value</Label>
            <Input
              id="nodeValue"
              type="number"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Enter a number"
              className="mt-1"
              disabled={disabled}
            />
          </div>
          <Button type="submit" className="w-full gap-1" size="sm" disabled={disabled}>
            <Plus className="w-4 h-4" />
            Insert Node
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
