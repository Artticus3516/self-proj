"use client";

import { useCallback, useEffect, useState } from "react";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import type { FetchStatus, Project } from "@/types/portfolio";

const MOCK_FETCH_DELAY_MS = 400;

interface UseProjectsResult {
  projects: Project[];
  status: FetchStatus;
  error: string | null;
  refetch: () => void;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, MOCK_FETCH_DELAY_MS));
      setProjects(MOCK_PROJECTS);
      setStatus("success");
    } catch {
      setError("Failed to load projects.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, status, error, refetch: fetchProjects };
}
