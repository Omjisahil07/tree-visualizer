
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import { LinkedListOperations } from "../types/LinkedListTypes";

interface LinkedListControlsProps {
  onInsert: (value: number, position: number) => void;
  onDelete: (position: number) => void;
  onUpdate: (position: number, value: number) => void;
  onReplaceNode?: (position: number, value: number) => void;
  onTraverse: () => void;
  isTraversing: boolean;
  listLength: number;
  operations: LinkedListOperations[];
}

export const LinkedListControls: React.FC<LinkedListControlsProps> = ({
  onInsert,
  onDelete,
  onUpdate,
  onReplaceNode,
  onTraverse,
  isTraversing,
  listLength,
  operations
}) => {
  const [value, setValue] = useState("");
  const [position, setPosition] = useState("");
  const [operation, setOperation] = useState<LinkedListOperations>(LinkedListOperations.INSERT_AT_END);
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    const needsValueInput = operation !== LinkedListOperations.DELETE_FROM_BEGINNING && 
                           operation !== LinkedListOperations.DELETE_FROM_END;
    
    const needsPositionInput = operation === LinkedListOperations.INSERT_AT_POSITION || 
                             operation === LinkedListOperations.DELETE_FROM_POSITION || 
                             operation === LinkedListOperations.UPDATE ||
                             operation === LinkedListOperations.REPLACE_NODE;
    
    // Validate based on the current operation
    if (needsValueInput && !value) {
      setIsFormValid(false);
      return;
    }
    
    if (needsPositionInput && !position) {
      setIsFormValid(false);
      return;
    }
    
    setIsFormValid(true);
  }, [value, position, operation]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numValue = parseInt(value);
    const numPosition = parseInt(position) || 0;
    
    if (operation === LinkedListOperations.UPDATE) {
      if (isNaN(numValue) || numPosition < 0 || numPosition >= listLength) {
        return;
      }
      onUpdate(numPosition, numValue);
    } else if (operation === LinkedListOperations.REPLACE_NODE) {
      if (isNaN(numValue) || numPosition < 0 || numPosition >= listLength) {
        return;
      }
      onReplaceNode && onReplaceNode(numPosition, numValue);
    } else if (
      operation === LinkedListOperations.DELETE_FROM_BEGINNING ||
      operation === LinkedListOperations.DELETE_FROM_END ||
      operation === LinkedListOperations.DELETE_FROM_POSITION
    ) {
      let posToDelete = 0;
      if (operation === LinkedListOperations.DELETE_FROM_END) {
        posToDelete = listLength - 1;
      } else if (operation === LinkedListOperations.DELETE_FROM_POSITION) {
        posToDelete = numPosition;
      }
      onDelete(posToDelete);
    } else {
      if (isNaN(numValue)) {
        return;
      }
      
      let posToInsert = 0;
      if (operation === LinkedListOperations.INSERT_AT_END) {
        posToInsert = listLength;
      } else if (operation === LinkedListOperations.INSERT_AT_POSITION) {
        posToInsert = numPosition;
      }
      
      onInsert(numValue, posToInsert);
    }
    
    setValue("");
    setPosition("");
  };
  
  const needsValueInput = operation !== LinkedListOperations.DELETE_FROM_BEGINNING && 
                         operation !== LinkedListOperations.DELETE_FROM_END;
  
  const needsPositionInput = operation === LinkedListOperations.INSERT_AT_POSITION || 
                           operation === LinkedListOperations.DELETE_FROM_POSITION || 
                           operation === LinkedListOperations.UPDATE ||
                           operation === LinkedListOperations.REPLACE_NODE;
  
  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-base">List Operations</CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="operation" className="text-sm">Operation</Label>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {operations.map((op) => (
                  <Button
                    key={op}
                    type="button"
                    variant={operation === op ? "default" : "outline"}
                    onClick={() => setOperation(op)}
                    className="justify-start py-1 h-8 text-xs"
                    size="sm"
                  >
                    {op === LinkedListOperations.INSERT_AT_BEGINNING && "Insert at Beginning"}
                    {op === LinkedListOperations.INSERT_AT_END && "Insert at End"}
                    {op === LinkedListOperations.INSERT_AT_POSITION && "Insert at Position"}
                    {op === LinkedListOperations.DELETE_FROM_BEGINNING && "Delete from Beginning"}
                    {op === LinkedListOperations.DELETE_FROM_END && "Delete from End"}
                    {op === LinkedListOperations.DELETE_FROM_POSITION && "Delete from Position"}
                    {op === LinkedListOperations.UPDATE && "Update Node"}
                    {op === LinkedListOperations.REPLACE_NODE && "Replace Node"}
                  </Button>
                ))}
              </div>
            </div>
            
            {needsValueInput && (
              <div className="space-y-1">
                <Label htmlFor="value" className="text-sm">Value</Label>
                <Input
                  id="value"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter a number"
                  className="h-8 text-sm"
                />
              </div>
            )}
            
            {needsPositionInput && (
              <div className="space-y-1">
                <Label htmlFor="position" className="text-sm">Position</Label>
                <Input
                  id="position"
                  type="number"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder={`0 - ${listLength > 0 ? listLength - 1 : 0}`}
                  min={0}
                  max={operation === LinkedListOperations.INSERT_AT_POSITION ? listLength : listLength - 1}
                  className="h-8 text-sm"
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-8 text-sm" 
              size="sm" 
              disabled={!isFormValid}
            >
              {operation.includes("insert") && <ChevronRight className="mr-1 h-3 w-3" />}
              {operation.includes("delete") && <RotateCcw className="mr-1 h-3 w-3" />}
              {(operation === LinkedListOperations.UPDATE || operation === LinkedListOperations.REPLACE_NODE) && <ChevronLeft className="mr-1 h-3 w-3" />}
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-base">Traversal</CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4">
          <Button 
            onClick={onTraverse} 
            disabled={isTraversing || listLength === 0}
            className="w-full h-9 flex items-center justify-center"
            size="sm"
          >
            <Play className="mr-2 h-3 w-3" />
            Start Traversal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
