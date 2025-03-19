
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export const BPlusTreeInstructions = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Available Operations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm">
        <ul className="space-y-2 list-disc pl-5">
          <li>Set the B+ tree degree first, then insert nodes or generate a random tree.</li>
          <li>Enter a number to insert a new node in the B+ tree.</li>
          <li>B+ Trees store keys in both <strong>internal nodes</strong> and <strong>leaf nodes</strong>.</li>
          <li>Leaf nodes are connected by <strong>next pointers</strong> for efficient range queries.</li>
          <li>Use the traversal controls to visualize different ways to navigate the tree.</li>
          <li>Watch the pseudocode highlight as the traversal progresses.</li>
        </ul>
      </CardContent>
    </Card>
  );
};
