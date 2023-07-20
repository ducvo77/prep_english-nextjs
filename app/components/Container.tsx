"use client";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="min-h-[100vh] mt-20 xl:px-20 lg:px-10 md:px-5 px-2">
      {children}
    </main>
  );
}
