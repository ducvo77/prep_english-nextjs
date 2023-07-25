"use client";

interface SectionProps {
  children: React.ReactNode;
  label: string;
}

export default function Section({ children, label }: SectionProps) {
  return (
    <section className="my-16">
      <h1 className="text-center text-2xl font-semibold mb-8 uppercase">
        {label}
      </h1>
      <>{children}</>
    </section>
  );
}
