import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import type { Project } from "../types";

type ProjectsProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

function Projects({ projects, onOpenProject }: ProjectsProps) {
  return (
    <section className="section-anchor-offset mx-auto max-w-7xl px-4 py-24 sm:px-6" id="projects">
      <SectionHeading
        description="A selection of applied AI, data, and platform builds shown through interactive previews and system detail."
        label="Projects"
        title="Selected systems and applied AI builds"
      />

      <div className="mt-14 grid gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} onOpen={onOpenProject} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
