import type { ActionLink } from "../types";

type SocialDockProps = {
  links: ActionLink[];
};

function SocialDock({ links }: SocialDockProps) {
  return (
    <>
      <div className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <a
              aria-label={link.label}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/78 text-zinc-300 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white ${link.disabled ? "cursor-not-allowed opacity-60" : ""}`}
              download={link.download}
              href={link.disabled ? undefined : link.url}
              key={link.label}
              onClick={link.disabled ? (event) => event.preventDefault() : undefined}
              rel="noreferrer"
              target={link.download ? undefined : "_blank"}
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute left-full ml-3 rounded-full border border-white/10 bg-black/90 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                {link.disabled ? `${link.label} link placeholder` : link.label}
              </span>
            </a>
          );
        })}
      </div>

      <div className="fixed inset-x-4 bottom-4 z-30 flex justify-center xl:hidden">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-3 py-2 backdrop-blur-xl">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <a
                aria-label={link.label}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/[0.08] hover:text-white ${link.disabled ? "cursor-not-allowed opacity-60" : ""}`}
                download={link.download}
                href={link.disabled ? undefined : link.url}
                key={link.label}
                onClick={link.disabled ? (event) => event.preventDefault() : undefined}
                rel="noreferrer"
                target={link.download ? undefined : "_blank"}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SocialDock;
