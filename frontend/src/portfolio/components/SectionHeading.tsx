type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
};

function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">{label}</p>
      <div className="space-y-3">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
        <p className="text-base leading-7 text-zinc-400 md:text-lg">{description}</p>
      </div>
    </div>
  );
}

export default SectionHeading;
