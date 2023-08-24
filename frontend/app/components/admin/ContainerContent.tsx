interface ContainerContentProps {
  children: React.ReactNode;
  label: string;
}

export default function ContainerContent({
  children,
  label,
}: ContainerContentProps) {
  return (
    <div className="flex flex-col gap-10 mb-10">
      <h1 className="text-center uppercase font-semibold text-3xl">{label}</h1>
      {children}
    </div>
  );
}
