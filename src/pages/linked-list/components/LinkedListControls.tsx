
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Wand2, Pencil, Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface LinkedListControlsProps {
  onAddHead: (value: number) => void;
  onAddTail: (value: number) => void;
  onAddAt: (value: number, position: number) => void;
  onRemoveHead: () => void;
  onRemoveTail: () => void;
  onRemoveAt: (position: number) => void;
  onUpdateAt: (position: number, value: number) => void;
  onGenerate: (length: number) => void;
  onReset: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  isPlaying: boolean;
  disabled: boolean;
}

export const LinkedListControls: FC<LinkedListControlsProps> = ({
  onAddHead,
  onAddTail,
  onAddAt,
  onRemoveHead,
  onRemoveTail,
  onRemoveAt,
  onUpdateAt,
  onGenerate,
  onReset,
  onPlayPause,
  onNext,
  isPlaying,
  disabled
}) => {
  const [addValue, setAddValue] = useState<string>("");
  const [addPosition, setAddPosition] = useState<string>("");
  const [removePosition, setRemovePosition] = useState<string>("");
  const [updateValue, setUpdateValue] = useState<string>("");
  const [updatePosition, setUpdatePosition] = useState<string>("");
  const [generateLength, setGenerateLength] = useState<string>("5");

  const handleAddHead = () => {
    if (!addValue) {
      toast.error("Please enter a value");
      return;
    }
    onAddHead(parseInt(addValue));
    setAddValue("");
  };

  const handleAddTail = () => {
    if (!addValue) {
      toast.error("Please enter a value");
      return;
    }
    onAddTail(parseInt(addValue));
    setAddValue("");
  };

  const handleAddAt = () => {
    if (!addValue || !addPosition) {
      toast.error("Please enter both value and position");
      return;
    }
    onAddAt(parseInt(addValue), parseInt(addPosition));
    setAddValue("");
    setAddPosition("");
  };

  const handleRemoveAt = () => {
    if (!removePosition) {
      toast.error("Please enter a position");
      return;
    }
    onRemoveAt(parseInt(removePosition));
    setRemovePosition("");
  };

  const handleUpdateAt = () => {
    if (!updateValue || !updatePosition) {
      toast.error("Please enter both value and position");
      return;
    }
    onUpdateAt(parseInt(updatePosition), parseInt(updateValue));
    setUpdateValue("");
    setUpdatePosition("");
  };

  const handleGenerate = () => {
    if (!generateLength || parseInt(generateLength) <= 0) {
      toast.error("Please enter a valid length (> 0)");
      return;
    }
    onGenerate(parseInt(generateLength));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => onPlayPause()} 
              variant="outline" 
              size="icon" 
              disabled={disabled}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button 
              onClick={() => onNext()} 
              variant="outline" 
              size="icon" 
              disabled={disabled || isPlaying}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => onReset()} 
              variant="outline" 
              size="icon" 
              disabled={disabled}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Label htmlFor="addValue">Value</Label>
              <Input
                id="addValue"
                type="number"
                value={addValue}
                onChange={(e) => setAddValue(e.target.value)}
                placeholder="Value"
                disabled={disabled}
              />
            </div>
            <Button
              onClick={handleAddHead}
              disabled={disabled}
              variant="secondary"
              size="sm"
            >
              Add Head
            </Button>
            <Button
              onClick={handleAddTail}
              disabled={disabled}
              variant="secondary"
              size="sm"
            >
              Add Tail
            </Button>
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Label htmlFor="addPosition">Position</Label>
              <Input
                id="addPosition"
                type="number"
                value={addPosition}
                onChange={(e) => setAddPosition(e.target.value)}
                placeholder="Position"
                min="0"
                disabled={disabled}
              />
            </div>
            <Button
              onClick={handleAddAt}
              disabled={disabled}
              variant="outline"
              className="gap-1"
              size="sm"
            >
              <Plus className="h-3 w-3" /> Add at Position
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Remove</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => onRemoveHead()}
              disabled={disabled}
              variant="destructive"
              size="sm"
            >
              Remove Head
            </Button>
            <Button
              onClick={() => onRemoveTail()}
              disabled={disabled}
              variant="destructive"
              size="sm"
            >
              Remove Tail
            </Button>
          </div>
          
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Label htmlFor="removePosition">Position</Label>
              <Input
                id="removePosition"
                type="number"
                value={removePosition}
                onChange={(e) => setRemovePosition(e.target.value)}
                placeholder="Position"
                min="0"
                disabled={disabled}
              />
            </div>
            <Button
              onClick={handleRemoveAt}
              disabled={disabled}
              variant="destructive"
              className="gap-1"
              size="sm"
            >
              <Trash className="h-3 w-3" /> Remove at Position
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Update</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="updatePosition">Position</Label>
              <Input
                id="updatePosition"
                type="number"
                value={updatePosition}
                onChange={(e) => setUpdatePosition(e.target.value)}
                placeholder="Position"
                min="0"
                disabled={disabled}
              />
            </div>
            <div>
              <Label htmlFor="updateValue">New Value</Label>
              <Input
                id="updateValue"
                type="number"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
                placeholder="Value"
                disabled={disabled}
              />
            </div>
          </div>
          <Button
            onClick={handleUpdateAt}
            disabled={disabled}
            variant="outline"
            className="w-full gap-1"
            size="sm"
          >
            <Pencil className="h-3 w-3" /> Update Node
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Generate Random List</Label>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Label htmlFor="generateLength">Length</Label>
              <Input
                id="generateLength"
                type="number"
                value={generateLength}
                onChange={(e) => setGenerateLength(e.target.value)}
                placeholder="Length"
                min="1"
                max="15"
                disabled={disabled}
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={disabled}
              variant="outline"
              className="gap-1"
            >
              <Wand2 className="h-4 w-4" /> Generate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
