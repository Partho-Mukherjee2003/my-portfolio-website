import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";
import ProjectDetailsClient from "./ProjectDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.id.toLowerCase(),
  }));
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  // Next.js 16 App Router requires awaiting params
  const { slug } = await params;

  const projects = projectsData.projects;
  const projectIndex = projects.findIndex(
    (p) => p.id.toLowerCase() === slug.toLowerCase(),
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  // Calculate previous and next projects for cyclic pagination
  const prevIndex = (projectIndex - 1 + projects.length) % projects.length;
  const nextIndex = (projectIndex + 1) % projects.length;

  const prevProject = {
    id: projects[prevIndex].id,
    name: projects[prevIndex].name,
  };

  const nextProject = {
    id: projects[nextIndex].id,
    name: projects[nextIndex].name,
  };

  return (
    <ProjectDetailsClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
