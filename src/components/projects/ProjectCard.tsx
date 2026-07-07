import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-white/5">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.25em] text-white/30 uppercase">
          Preview
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-white/65">
            {project.description}
          </p>
        </div>

        <ul className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] tracking-wide text-white/55 uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>

        <a
          href={project.href}
          className="pointer-events-auto inline-flex w-fit items-center text-sm font-medium text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          View project
        </a>
      </div>
    </article>
  );
}
