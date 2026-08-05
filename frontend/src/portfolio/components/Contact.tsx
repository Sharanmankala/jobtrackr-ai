import SectionHeading from "./SectionHeading";
import type { ActionLink } from "../types";

type ContactProps = {
  actions: ActionLink[];
};

function Contact({ actions }: ContactProps) {
  return (
    <section className="section-anchor-offset mx-auto max-w-6xl px-4 py-20 sm:px-6" id="contact">
      <div className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(26,26,26,0.94),rgba(8,8,8,0.98))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.42)] md:p-10">
        <SectionHeading
          description="Open to AI/ML opportunities."
          label="Contact"
          title="Let’s Connect"
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;
            const className =
              action.variant === "primary"
                ? "border-white/16 bg-white text-black hover:bg-zinc-200"
                : action.variant === "secondary"
                  ? "border-white/12 bg-white/6 text-white hover:bg-white/10"
                  : "border-white/10 bg-transparent text-zinc-200 hover:bg-white/[0.06]";

            return (
              <a
                className={`flex min-h-[64px] items-center justify-center gap-2 rounded-full border px-5 py-3 text-center text-sm font-medium transition ${className} ${action.disabled ? "cursor-not-allowed opacity-60" : ""}`}
                download={action.download}
                href={action.disabled ? undefined : action.url}
                key={action.label}
                onClick={action.disabled ? (event) => event.preventDefault() : undefined}
                rel="noreferrer"
                target={action.download ? undefined : "_blank"}
              >
                <Icon className={`h-4 w-4 shrink-0 ${action.variant === "primary" ? "text-black" : "text-current"}`} />
                <span className={action.variant === "primary" ? "text-black" : "text-current"}>{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Contact;
