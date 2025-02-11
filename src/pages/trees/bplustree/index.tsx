
import { BPlusTreePseudocode } from "./components/BPlusTreePseudocode";
import { useState } from "react";
import { Footer } from "@/components/Footer";

const BPlusTree = () => {
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [traversalType, setTraversalType] = useState("inorder");

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">B+ Tree Visualization</h1>
        <p className="text-muted-foreground text-lg">
          Explore B+ Tree data structure and its traversal algorithms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <p className="text-center text-muted-foreground">
              B+ Tree visualization coming soon...
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <BPlusTreePseudocode
            currentStep={currentStep}
            currentLine={currentLine}
            traversalType={traversalType}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BPlusTree;
