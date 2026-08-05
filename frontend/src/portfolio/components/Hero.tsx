import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { ActionLink, HeroStat } from "../types";

type HeroProps = {
  name: string;
  title: string;
  intro: string;
  location: string;
  availability: string;
  profileImage: string;
  heroStats: HeroStat[];
  actions: ActionLink[];
  onViewProjects: () => void;
};

type HeroAction = ActionLink & {
  onClick?: () => void;
};

function Hero({
  name,
  title,
  intro,
  location,
  availability,
  profileImage,
  heroStats,
  actions,
  onViewProjects
}: HeroProps) {
  const [showPhoto, setShowPhoto] = useState(true);

  const preparedActions = useMemo<HeroAction[]>(() => {
    return actions.map((action) => {
      if (action.label === "View Projects") {
        return {
          ...action,
          onClick: onViewProjects
        };
      }

      return action;
    });
  }, [actions, onViewProjects]);

  return (
    <section className="section-anchor-offset mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-10 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pt-18" id="home">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative"
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,24,0.94),rgba(6,6,6,0.98))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.48)]">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <div className="relative rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(28,28,28,0.98),rgba(8,8,8,1))] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.32em] text-zinc-500">
              <span>Selected profile</span>
              <span>Monochrome portfolio</span>
            </div>

            <div className="relative mx-auto aspect-[4/5] max-w-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#232323,#050505)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              {showPhoto ? (
                <img
                  alt={`${name} profile`}
                  className="h-full w-full object-cover"
                  onError={() => setShowPhoto(false)}
                  src={profileImage}
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-8">
                  <div className="space-y-3">
                    <div className="h-20 w-20 rounded-3xl border border-white/12 bg-white/[0.05]" />
                    <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Photo slot ready</p>
                  </div>
                  <div>
                    <div className="text-6xl font-semibold tracking-tight text-white">{name.split(" ").map((part) => part[0]).join("")}</div>
                    <p className="mt-3 max-w-[18rem] text-sm leading-6 text-zinc-300">
                      Drop a headshot into <span className="font-medium text-white">frontend/public/profile-photo.jpg</span> and it will appear here automatically.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">{stat.label}</p>
                  <p className="mt-2 text-sm font-medium text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
        initial={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
      >
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-white" />
            {availability}
          </div>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-500">Sai Sharan Portfolio</p>
            <h1 className="text-balance max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-300">
              {intro}
            </p>
          </div>

          <div className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-1 lg:grid-cols-2">
            <span className="inline-flex min-w-0 items-center gap-2">
              <MapPin className="h-4 w-4 text-zinc-400" />
              {location}
            </span>
            <span className="inline-flex min-w-0 items-start gap-2">
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
              Search, forecasting, retrieval, and production APIs
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {preparedActions.map((action) => {
            const Icon = action.icon;
            const className =
              action.variant === "primary"
                ? "border-white/16 bg-white text-black hover:bg-zinc-200"
                : action.variant === "secondary"
                  ? "border-white/12 bg-white/6 text-white hover:bg-white/10"
                  : "border-white/10 bg-transparent text-zinc-200 hover:bg-white/[0.06]";

            if (action.onClick) {
              return (
                <button
                  key={action.label}
                  className={`flex min-h-[76px] items-center justify-center gap-2 rounded-full border px-5 py-3 text-center text-sm font-medium transition ${className}`}
                  onClick={action.onClick}
                  type="button"
                >
                  <Icon className={`h-4 w-4 shrink-0 ${action.variant === "primary" ? "text-black" : "text-current"}`} />
                  <span className={action.variant === "primary" ? "text-black" : "text-current"}>{action.label}</span>
                </button>
              );
            }

            return (
              <a
                key={action.label}
                className={`flex min-h-[76px] items-center justify-center gap-2 rounded-full border px-5 py-3 text-center text-sm font-medium transition ${className} ${action.disabled ? "cursor-not-allowed opacity-60" : ""}`}
                download={action.download}
                href={action.disabled ? undefined : action.url}
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

        <div className="grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
          {[
            "Built hybrid search, reranking, and grounded response flows for AI-powered systems.",
            "Delivered forecasting and pipeline work across ML modeling, batch processing, and cloud workflows.",
            "Showcases real project depth, readable architecture, and measurable outcomes."
          ].map((point) => (
            <p key={point} className="text-sm leading-7 text-zinc-500">
              {point}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
