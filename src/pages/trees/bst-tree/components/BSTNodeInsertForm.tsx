
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BSTNodeInsertFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleInsert: (e: React.FormEvent) => void;
}

export const BSTNodeInsertForm = ({
  inputValue,
  setInputValue,
  handleInsert
}: BSTNodeInsertFormProps) => {
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
            />
          </div>
          <Button type="submit" className="w-full gap-1" size="sm">
            <Plus className="w-4 h-4" />
            Insert Node
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
