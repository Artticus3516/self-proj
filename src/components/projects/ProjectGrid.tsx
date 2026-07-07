"use client";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProjects } from "@/hooks/useProjects";

export function ProjectGrid() {
  const { projects, status, error, refetch } = useProjects();

  return (
    <section id="projects" className="scroll-mt-[calc(var(--nav-height)+1rem)]">
      <div className="mb-6 space-y-2">
        <p className="text-xs tracking-[0.25em] text-white/45 uppercase">Selected work</p>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Projects</h2>
      </div>

      {status === "loading" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="min-h-[280px] animate-pulse rounded-2xl border border-white/10 bg-white/5"
              aria-hidden
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-red-400/20 bg-red-950/30 p-4">
          <p className="text-sm text-red-200">{error}</p>
          <button
            type="button"
            className="pointer-events-auto mt-3 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            onClick={refetch}
          >
            Retry
          </button>
        </div>
      )}

      {status === "success" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
