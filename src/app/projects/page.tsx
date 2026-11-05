"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import projectsData from "@/data/projects.json";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0B0F19] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* Background Glowing Blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#3B82F6]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#00E5FF]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00E5FF]">
            My Work
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#F3F4F6] sm:text-4xl lg:text-5xl">
            Featured{" "}
            <span
              className="text-[#00E5FF]"
              style={{ textShadow: "0 0 24px rgba(0,229,255,0.6)" }}
            >
              Projects
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.projects.map((project, index) => {
            // Dynamic Route slug matching
            const slug = project.id.toLowerCase();
            const mainImage = project.images?.[0] || "/Pictures/p1.1.png";

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#3B82F6]/20 bg-[#111827]/90 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00E5FF]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#111827] to-[#0B0F19]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mainImage}
                      alt={`${project.name} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111827] via-[#3B82F6]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    {/* App Type Badge */}
                    <span className="absolute top-3 right-3 rounded-full bg-[#0B0F19]/80 px-2.5 py-1 text-[10px] font-semibold text-[#00E5FF] border border-[#00E5FF]/30 backdrop-blur-md">
                      {project.type}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-[#F3F4F6] transition-colors duration-300 group-hover:text-[#00E5FF]">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-[#00E5FF]/90">
                      {project.tagline}
                    </p>

                    <p className="mt-3 text-sm text-[#D1D5DB]/80 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.keyTechnologies.slice(0, 7).map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-2 py-0.5 text-[11px] font-medium text-[#F3F4F6]/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between border-t border-gray-800/80 p-4 sm:px-6">
                  {/* Quick External Links */}
                  <div className="flex items-center gap-3 text-gray-400">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[#00E5FF]"
                        title="Live Demo"
                      >
                        <FiExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.clientRepo && (
                      <a
                        href={project.clientRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[#00E5FF]"
                        title="GitHub Client Repository"
                      >
                        <FiGithub className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Link
                    href={`/projects/${slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] px-3.5 py-1.5 text-xs font-semibold text-[#0B0F19] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
                  >
                    View Details
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
