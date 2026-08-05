import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, GitBranch, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "../types";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = project?.images.filter((image) => image.src) ?? [];

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  const showPrevious = () => {
    setActiveImageIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveImageIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-md"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative max-h-[92vh] w-full max-w-6xl overflow-auto rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.98),rgba(6,6,6,0.98))] shadow-[0_40px_120px_rgba(0,0,0,0.58)]"
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <button
              className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/70 p-3 text-zinc-300 transition hover:border-white/20 hover:text-white"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.16fr_0.84fr]">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                  {images[activeImageIndex] ? (
                    <img
                      alt={images[activeImageIndex].alt}
                      className="aspect-[16/10] w-full object-cover"
                      src={images[activeImageIndex].src}
                    />
                  ) : (
                    <div className="flex aspect-[16/10] items-end bg-[linear-gradient(180deg,#2e2e2e,#0d0d0d)] p-6">
                      <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">No screenshot attached</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/8 to-transparent" />

                  {images.length > 1 ? (
                    <>
                      <button
                        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/58 text-white transition hover:bg-black/78"
                        onClick={showPrevious}
                        type="button"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/58 text-white transition hover:bg-black/78"
                        onClick={showNext}
                        type="button"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  ) : null}

                  {images[activeImageIndex] ? (
                    <div className="absolute bottom-5 left-5 max-w-md">
                      <p className="text-[0.68rem] uppercase tracking-[0.34em] text-zinc-400">
                        {images[activeImageIndex].label}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-zinc-200">
                        {images[activeImageIndex].description}
                      </p>
                    </div>
                  ) : null}
                </div>

                {images.length > 1 ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {images.map((image, index) => (
                      <button
                        key={image.src}
                        className={`overflow-hidden rounded-[1.4rem] border bg-white/[0.02] transition ${index === activeImageIndex ? "border-white/28" : "border-white/10 hover:border-white/18"}`}
                        onClick={() => setActiveImageIndex(index)}
                        type="button"
                      >
                        <img alt={image.alt} className="aspect-[16/10] w-full object-cover" src={image.src} />
                        <span className="block px-3 py-3 text-left text-[0.68rem] uppercase tracking-[0.25em] text-zinc-300">
                          {image.label}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[0.68rem] uppercase tracking-[0.34em] text-zinc-500">Project deep dive</p>
                  <h3 className="text-3xl font-semibold tracking-tight text-white">{project.title}</h3>
                  <p className="text-sm leading-7 text-zinc-300">{project.shortDescription}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.githubUrl ? (
                    <a
                      className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.08]"
                      href={project.githubUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <GitBranch className="h-4 w-4" />
                      GitHub
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a
                      className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-transparent px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06]"
                      href={project.liveUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live demo
                    </a>
                  ) : null}
                </div>

                <div className="space-y-5 text-sm leading-7 text-zinc-300">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Problem</h4>
                    <p className="mt-2">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">What I built</h4>
                    <p className="mt-2">{project.build}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Architecture / Flow</h4>
                    <ul className="mt-2 grid gap-2">
                      {project.architecture.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 rounded-full bg-zinc-200" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Results / Impact</h4>
                    <ul className="mt-2 grid gap-2">
                      {project.results.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Tech stack</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.techStack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ProjectModal;
