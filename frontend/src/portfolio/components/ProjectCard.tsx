import type { MouseEvent } from "react";
import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, GitBranch } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = project.images.filter((image) => image.src);
  const activeImage = images[activeImageIndex];
  const canCycle = images.length > 1;

  const showPrevious = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setActiveImageIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const showNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setActiveImageIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <motion.article
      className="group perspective-[1800px]"
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      whileHover={{ y: -8 }}
    >
      <div
        className="block w-full cursor-pointer rounded-[2.6rem] border border-white/12 bg-[linear-gradient(180deg,rgba(22,22,22,0.94),rgba(4,4,4,0.98))] p-3 text-left shadow-[0_30px_80px_rgba(0,0,0,0.42)] transition duration-300 group-hover:border-white/20"
        onClick={() => onOpen(project)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen(project);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open project details for ${project.title}`}
      >
        <motion.div
          className="grid min-h-[30rem] gap-3 rounded-[2.1rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,rgba(28,28,28,0.98),rgba(10,10,10,0.98))] p-4 md:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.9fr)]"
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ rotateX: 2, rotateY: -2, scale: 1.005 }}
        >
          <div className="relative overflow-hidden rounded-[1.8rem] bg-black">
            {activeImage ? (
              <img
                alt={activeImage.alt}
                className="h-full min-h-[22rem] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                src={activeImage.src}
              />
            ) : (
              <div className="flex h-full min-h-[22rem] items-end rounded-[1.8rem] bg-[linear-gradient(180deg,#2e2e2e,#0d0d0d)] p-8">
                <span className="text-xs uppercase tracking-[0.34em] text-zinc-400">Utility project</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />

            {canCycle ? (
              <>
                <button
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/58 text-white opacity-0 transition duration-300 hover:bg-black/78 group-hover:opacity-100"
                  onClick={showPrevious}
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/58 text-white opacity-0 transition duration-300 hover:bg-black/78 group-hover:opacity-100"
                  onClick={showNext}
                  type="button"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.34em] text-zinc-400">
                  {project.expandable ? "Expanded preview" : "Utility snapshot"}
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {activeImage ? activeImage.label : project.title}
                </p>
              </div>

              <div className="rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[0.68rem] uppercase tracking-[0.32em] text-zinc-300">
                {images.length > 0 ? `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}` : "01 / 01"}
              </div>
            </div>
          </div>

          <div className="flex min-h-full flex-col justify-between rounded-[1.8rem] border border-white/8 bg-white/[0.02] p-6">
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-[0.68rem] uppercase tracking-[0.34em] text-zinc-500">Project card</p>
                  <h3 className="max-w-[18ch] text-3xl font-semibold tracking-tight text-white">{project.title}</h3>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 text-zinc-300 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <p className="max-w-xl text-sm leading-7 text-zinc-300">{project.shortDescription}</p>

              <div className="rounded-[1.5rem] border border-white/8 bg-black/32 p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-zinc-500">Current frame</p>
                <p className="mt-3 text-base font-medium text-white">{activeImage ? activeImage.label : "Project preview"}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  {activeImage ? activeImage.description : project.build}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 6).map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/8 pt-5 text-sm text-zinc-400">
              <div className="flex items-center gap-4">
                <span>{images.length > 0 ? `${images.length} preview frames` : "Lean utility build"}</span>
                {project.githubUrl ? (
                  <span className="inline-flex items-center gap-2">
                    <GitBranch className="h-4 w-4" />
                    Source attached
                  </span>
                ) : null}
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Open detail</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
