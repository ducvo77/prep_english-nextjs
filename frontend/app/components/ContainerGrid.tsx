import React from "react";

interface ContainerGridProps {
  children: React.ReactNode;
}

export default function ContainerGrid({ children }: ContainerGridProps) {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 lg:gap-6 md:gap-4 gap-2">
      {children}
    </div>
  );
}
