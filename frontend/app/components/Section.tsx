"use client";

interface SectionProps {
  children: React.ReactNode;
  label: string;
  id?: string;
}

export default function Section({ children, label, id }: SectionProps) {
  return (
    <section className="my-16">
      <h1
        id={id}
        className="text-center md:text-2xl text-xl font-semibold mb-8 uppercase scroll-m-24"
      >
        {label}
      </h1>
      <>{children}</>
    </section>
  );
}
