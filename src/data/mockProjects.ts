import type { Project } from "@/types/portfolio";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-01",
    title: "Neon Horizon",
    description:
      "Interactive WebGL environment with dynamic lighting and post-processing.",
    tags: ["R3F", "Three.js", "GLSL"],
    thumbnailUrl: "/projects/neon-horizon.jpg",
    href: "#proj-01",
  },
  {
    id: "proj-02",
    title: "Kinetic Type",
    description:
      "Typography-driven motion study built for mobile-first performance.",
    tags: ["React", "GSAP", "Canvas"],
    thumbnailUrl: "/projects/kinetic-type.jpg",
    href: "#proj-02",
  },
  {
    id: "proj-03",
    title: "Orbital UI",
    description:
      "Spatial interface prototype with gesture-based navigation layers.",
    tags: ["Next.js", "Drei", "Tailwind"],
    thumbnailUrl: "/projects/orbital-ui.jpg",
    href: "#proj-03",
  },
];
