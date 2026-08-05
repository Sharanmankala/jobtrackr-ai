import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProjectModal from "./components/ProjectModal";
import Projects from "./components/Projects";
import SocialDock from "./components/SocialDock";
import TechStack from "./components/TechStack";
import { portfolioContent } from "./content";
import type { Project, SectionId } from "./types";

function PortfolioPage() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const sections = portfolioContent.navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id as SectionId);
        }
      },
      {
        threshold: [0.2, 0.35, 0.55],
        rootMargin: "-20% 0px -40% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const handleNavigate = (sectionId: SectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!shellRef.current || window.innerWidth < 768) {
      return;
    }

    const bounds = shellRef.current.getBoundingClientRect();
    shellRef.current.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    shellRef.current.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div className="portfolio-shell" onMouseMove={handlePointerMove} ref={shellRef}>
      <div className="portfolio-content">
        <Navbar
          activeSection={activeSection}
          name={portfolioContent.name}
          navItems={portfolioContent.navItems}
          onNavigate={handleNavigate}
        />
        <SocialDock links={portfolioContent.socialLinks} />
        <Hero
          actions={portfolioContent.heroActions}
          availability={portfolioContent.availability}
          heroStats={portfolioContent.heroStats}
          intro={portfolioContent.intro}
          location={portfolioContent.location}
          name={portfolioContent.name}
          onViewProjects={() => handleNavigate("projects")}
          profileImage={portfolioContent.profileImage}
          title={portfolioContent.title}
        />
        <Experience items={portfolioContent.experience} />
        <Projects onOpenProject={setSelectedProject} projects={portfolioContent.projects} />
        <TechStack groups={portfolioContent.stackGroups} />
        <Contact actions={portfolioContent.contactActions} />
        <Footer email={portfolioContent.email} name={portfolioContent.name} />
        <ProjectModal onClose={() => setSelectedProject(null)} project={selectedProject} />
      </div>
    </div>
  );
}

export default PortfolioPage;
