
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BSTNodeUpdateFormProps {
  selectedNode: number;
  updateValue: string;
  setUpdateValue: (value: string) => void;
  handleUpdate: (e: React.FormEvent) => void;
}

export const BSTNodeUpdateForm = ({
  selectedNode,
  updateValue,
  setUpdateValue,
  handleUpdate
}: BSTNodeUpdateFormProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg">Update Node {selectedNode}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <form onSubmit={handleUpdate} className="space-y-3">
          <div>
            <Label htmlFor="updateValue" className="text-sm">New Value</Label>
            <Input
              id="updateValue"
              type="number"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              placeholder="Enter new value"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full" size="sm">
            Update Node
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
