
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Tree from "./pages/Tree";
import Graph from "./pages/Graph";
import LinkedList from "./pages/LinkedList";
import SinglyLinkedList from "./pages/linked-list/singly";
import DoublyLinkedList from "./pages/linked-list/doubly";
import CircularLinkedList from "./pages/linked-list/circular";
import DoubleCircularLinkedList from "./pages/linked-list/double-circular";
import BSTTree from "./pages/trees/bst-tree";
import BinaryTree from "./pages/trees/binary-tree";
import AVLTree from "./pages/trees/avl-tree";
import BPlusTree from "./pages/trees/bplustree";
import DFS from "./pages/graphs/dfs";
import BFS from "./pages/graphs/bfs";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="/tree/binary-tree" element={<BinaryTree />} />
          <Route path="/tree/bst-tree" element={<BSTTree/>} />
          <Route path="/tree/avl-tree" element={<AVLTree />} />
          <Route path="/tree/bplustree" element={<BPlusTree />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/graph/dfs" element={<DFS />} />
          <Route path="/graph/bfs" element={<BFS />} />
          <Route path="/linked-list" element={<LinkedList />} />
          <Route path="/linked-list/singly" element={<SinglyLinkedList />} />
          <Route path="/linked-list/doubly" element={<DoublyLinkedList />} />
          <Route path="/linked-list/circular" element={<CircularLinkedList />} />
          <Route path="/linked-list/double-circular" element={<DoubleCircularLinkedList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
