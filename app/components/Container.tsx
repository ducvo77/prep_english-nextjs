interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <section className="min-h-[3000px] mt-20 px-20">{children}</section>;
}
