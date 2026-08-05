import { Download } from "lucide-react";
import type { NavItem, SectionId } from "../types";

type NavbarProps = {
  name: string;
  navItems: NavItem[];
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
};

function Navbar({ name, navItems, activeSection, onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-black/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-white transition hover:border-white/18 hover:bg-white/[0.08]"
          onClick={() => onNavigate("home")}
          type="button"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-sm font-semibold text-white">
            SM
          </span>
          <span>
            <span className="block text-sm font-semibold">{name}</span>
            <span className="block text-xs text-zinc-500">Portfolio</span>
          </span>
        </button>

        <nav className="flex flex-1 items-center justify-end gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                className={[
                  "rounded-full px-4 py-2 text-sm transition",
                  isActive
                    ? "bg-white/[0.08] text-white shadow-[0_12px_28px_rgba(255,255,255,0.06)]"
                    : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                ].join(" ")}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                {item.label}
              </button>
            );
          })}

          <a
            className="hidden items-center gap-2 rounded-full border border-white/12 bg-white text-sm font-medium text-black transition hover:bg-zinc-200 md:inline-flex px-4 py-2"
            download
            href="/resume.pdf"
          >
            <Download className="h-4 w-4 text-black" />
            <span className="text-black">Resume</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
