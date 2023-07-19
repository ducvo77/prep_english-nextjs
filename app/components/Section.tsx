interface SectionProps {
  children: React.ReactNode;
  label: string;
}

export default function Section({ children, label }: SectionProps) {
  return (
    <section className="py-10">
      <h1 className="text-center text-2xl font-semibold mb-4">{label}</h1>
      <>{children}</>
    </section>
  );
}
