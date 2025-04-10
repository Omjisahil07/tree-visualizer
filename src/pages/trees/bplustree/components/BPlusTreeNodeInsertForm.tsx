
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface BPlusTreeNodeInsertFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleInsert: (e: React.FormEvent) => void;
  disabled?: boolean;
}

export const BPlusTreeNodeInsertForm = ({
  inputValue,
  setInputValue,
  handleInsert,
  disabled = false
}: BPlusTreeNodeInsertFormProps) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const value = parseInt(inputValue);
    setIsValid(!isNaN(value) && inputValue.trim() !== "");
  }, [inputValue]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg">Insert Node</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <form onSubmit={handleInsert} className="space-y-3">
          <div>
            <Label htmlFor="nodeValue" className="text-sm">Node Value</Label>
            <Input
              id="nodeValue"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number"
              className="mt-1"
              disabled={disabled}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full gap-1 bg-primary hover:bg-primary/90" 
            size="sm" 
            disabled={disabled || !isValid}
          >
            <Plus className="w-4 h-4" />
            Insert Node
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
