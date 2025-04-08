
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitFork, TreePine, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const treeTypes = [
  {
    icon: <TreePine className="w-12 h-12" />,
    title: "Binary Tree",
    description: "A tree data structure in which each node has at most two children, referred to as the left child and the right child.",
    link: "/tree/binary-tree"
  },
  {
    icon: <TreePine className="w-12 h-12" />,
    title: "Binary Search Tree (BST)",
    description: "A binary tree where the left subtree of a node contains only nodes with keys lesser than the node's key and the right subtree contains only nodes with keys greater than the node's key.",
    link: "/tree/bst-tree"
  },
  {
    icon: <GitFork className="w-12 h-12" />,
    title: "AVL Tree",
    description: "Self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one for all nodes.",
    link: "/tree/avl-tree"
  },
  {
    icon: <Database className="w-12 h-12" />,
    title: "B+ Tree",
    description: "A variant of B-tree that stores all data in leaf nodes and maintains all leaf nodes at the same level, optimized for systems that read and write large blocks of data.",
    link: "/tree/bplustree"
  }
];

const Tree = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Tree Data Structures</h1>
        <p className="text-muted-foreground text-lg">
          Explore different types of tree data structures and their implementations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {treeTypes.map((tree, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center justify-center mb-6 text-primary">
                {tree.icon}
              </div>
              <CardTitle className="text-center">{tree.title}</CardTitle>
              <CardDescription className="text-center">
                {tree.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button asChild>
                <Link to={tree.link}>Explore {tree.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Tree;
