export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  href: string;
}

export type FetchStatus = "idle" | "loading" | "success" | "error";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}
