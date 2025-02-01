import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const BSTInstructions: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="instructions">
        <AccordionTrigger>How to use this visualization</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Insert nodes by entering a number and clicking "Insert Node"</li>
            <li>Click on a node to select it for updating</li>
            <li>Delete nodes by clicking the trash icon</li>
            <li>Use the traversal controls to visualize different tree traversals:
              <ul className="list-disc pl-6 mt-2">
                <li>Inorder: Left → Root → Right</li>
                <li>Preorder: Root → Left → Right</li>
                <li>Postorder: Left → Right → Root</li>
                <li>Level Order: Level by level, left to right</li>
              </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};