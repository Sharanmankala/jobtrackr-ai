import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import type { ExperienceItem } from "../types";

type ExperienceProps = {
  items: ExperienceItem[];
};

function Experience({ items }: ExperienceProps) {
  return (
    <section className="section-anchor-offset mx-auto max-w-6xl px-4 py-20 sm:px-6" id="experience">
      <SectionHeading
        description="Work spanning production AI search, retrieval systems, real-time data pipelines, and large-scale ML forecasting."
        label="Experience"
        title="Production-focused work across AI search and ML forecasting"
      />

      <div className="mt-12 space-y-8">
        {items.map((item, index) => (
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,24,0.94),rgba(10,10,10,0.98))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.36)] lg:grid-cols-[0.34fr_0.66fr] lg:p-8"
            initial={{ opacity: 0, y: 24 }}
            key={item.company}
            transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{item.period}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.company}</h3>
                <p className="mt-2 text-sm font-medium text-zinc-300">{item.role}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.focus.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <p className="max-w-2xl text-base leading-7 text-zinc-300">{item.description}</p>
              <ul className="grid gap-3 text-sm leading-7 text-zinc-200">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
