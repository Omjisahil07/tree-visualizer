
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BPlusTreeInstructions = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg">Instructions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm">
        <ul className="space-y-2 list-disc pl-5">
          <li>B+ Trees store keys in both <strong>internal nodes</strong> (for navigation) and <strong>leaf nodes</strong> (for data).</li>
          <li>Leaf nodes are connected by <strong>next pointers</strong> for efficient range queries.</li>
          <li>Set the B+ tree degree first, then insert nodes or generate a random tree.</li>
          <li>Use the traversal controls to visualize different ways to navigate the tree.</li>
          <li>The <strong>In-order</strong> traversal is especially important for B+ trees as it visits leaf nodes sequentially.</li>
        </ul>
      </CardContent>
    </Card>
  );
};
