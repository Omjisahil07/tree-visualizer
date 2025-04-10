
interface BinaryTreeHeaderProps {
  onGenerateRandomTree?: () => void;
}

export const BinaryTreeHeader = ({ onGenerateRandomTree }: BinaryTreeHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Binary Tree Visualization</h1>
    </>
  );
};
