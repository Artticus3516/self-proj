export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export type NavItemId = (typeof NAV_ITEMS)[number]["id"];
