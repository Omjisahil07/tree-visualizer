
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NodeInsertFormProps {
  onInsert: (value: number) => void;
}

export const NodeInsertForm = ({ onInsert }: NodeInsertFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInsertNode = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    onInsert(value);
    setInputValue("");
    toast.success(`Node ${value} inserted successfully`);
  };

  return (
    <form onSubmit={handleInsertNode} className="space-y-3">
      <div>
        <Label htmlFor="nodeValue" className="text-sm">Node Value</Label>
        <Input
          id="nodeValue"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full gap-1" size="sm">
        <Plus className="w-4 h-4" />
        Insert Node
      </Button>
    </form>
  );
};
