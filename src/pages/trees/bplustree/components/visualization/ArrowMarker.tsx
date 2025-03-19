
import { FC } from 'react';

export const ArrowMarker: FC = () => (
  <defs>
    <marker
      id="arrowhead"
      viewBox="-0 -5 10 10"
      refX={5}
      refY={0}
      orient="auto"
      markerWidth={6}
      markerHeight={6}
    >
      <path d="M 0,-5 L 10,0 L 0,5" fill="hsl(var(--primary))" />
    </marker>
  </defs>
);

ArrowMarker.displayName = 'ArrowMarker';
