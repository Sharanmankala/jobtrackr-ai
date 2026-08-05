import SectionHeading from "./SectionHeading";
import type { StackGroup } from "../types";

type TechStackProps = {
  groups: StackGroup[];
};

function TechStack({ groups }: TechStackProps) {
  return (
    <section className="section-anchor-offset mx-auto max-w-6xl px-4 py-20 sm:px-6" id="tech-stack">
      <SectionHeading
        description="Grouped around the areas I work across most: AI/ML, backend systems, data platforms, cloud infrastructure, and tooling."
        label="Tech Stack"
        title="A stack profile built around retrieval, backend systems, and data-heavy workflows"
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {groups.map((group) => (
          <article key={group.title} className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,24,0.94),rgba(10,10,10,0.98))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TechStack;
