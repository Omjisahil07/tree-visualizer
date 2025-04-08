
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodeInsertForm } from "./NodeInsertForm";

interface BinaryTreeControlPanelProps {
  onInsertNode: (value: number) => void;
}

export const BinaryTreeControlPanel = ({
  onInsertNode,
}: BinaryTreeControlPanelProps) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-lg">Controls</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <NodeInsertForm onInsert={onInsertNode} />
        </CardContent>
      </Card>
    </div>
  );
};
