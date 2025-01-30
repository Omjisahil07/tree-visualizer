import React from 'react';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">About Us</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Tree-Visualizer! We are dedicated to providing the best tools for visualizing and understanding tree data structures.
      </p>
      <p className="text-gray-700 mb-4">
        Our mission is to make learning and working with trees easier and more intuitive. Whether you are a student, educator, or professional, our tools are designed to help you achieve your goals.
      </p>
      <p className="text-gray-700 mb-4">
        Thank you for choosing Tree-Visualizer. We hope you find our tools helpful and easy to use.
      </p>
      <h2 className="text-2xl font-bold mb-4 text-green-600">Key Features</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Support for various tree types: Binary Tree, Binary Search Tree (BST), AVL Tree, B-Tree</li>
        <li>Interactive controls for adding, deleting, and modifying nodes</li>
        <li>Dynamic visualization of changes in real time</li>
        <li>Perform key operations like insertion, deletion, traversal, and balancing</li>
        <li>Drag-and-drop nodes for better interaction</li>
        <li>Visual feedback for operations</li>
        <li>Step-by-step visualization of operations with explanations</li>
        <li>Custom tree settings and export/import functionality</li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Tech Stack</h2>
      <p className="text-gray-700 mb-4">
        Our frontend is built with React.js and uses D3.js for rendering tree structures. We use Tailwind CSS for styling to ensure a modern and responsive UI. For backend operations, we use Node.js with Express.js and MongoDB for storing custom trees or user data.
      </p>
      <h2 className="text-2xl font-bold mb-4 text-red-600">Implementation Approach</h2>
      <p className="text-gray-700 mb-4">
        We follow a structured approach to implement the Tree Data Structure Creator and Visualizer. This includes setting up the project, implementing core tree operations, creating dynamic visualizations, designing a user-friendly interface, and ensuring persistence through JSON files. We also focus on testing and optimization to handle edge cases and ensure smooth performance.
      </p>
      <h2 className="text-2xl text-primary mb-4 ">Email us at : treevisualizer@gmail.com</h2>
    <Footer/>
    </div>    
    
  );
};

export default About;
