
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BPlusTreeActionsProps {
  onGenerateRandom: () => void;
  isConfigured: boolean;
}

export const BPlusTreeActions = ({
  onGenerateRandom,
  isConfigured
}: BPlusTreeActionsProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg">Tree Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button 
          onClick={onGenerateRandom} 
          variant="outline" 
          className="w-full gap-1 bg-white hover:bg-gray-50" 
          size="sm" 
          disabled={!isConfigured}
        >
          <Wand2 className="w-4 h-4" />
          Generate Random Tree
        </Button>
      </CardContent>
    </Card>
  );
};
