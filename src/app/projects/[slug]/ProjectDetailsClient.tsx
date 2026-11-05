"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiServer,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiShield,
  FiMapPin,
  FiGlobe,
  FiCode,
} from "react-icons/fi";

/* -------------------------------------------------------------------------- */
/* STRICT TYPESCRIPT INTERFACES (ZERO `any` TYPES)                            */
/* -------------------------------------------------------------------------- */

export interface ProjectAuthor {
  name: string;
  email: string;
  github: string;
  linkedin?: string;
}

export interface TechStackFrontend {
  framework?: string | string[];
  language?: string;
  styling?: string | string[];
  uiComponents?: string;
  authentication?: string | { library?: string; methods?: string[] };
  slider?: string;
  notifications?: string;
  icons?: string | string[];
  imageUpload?: string;
}

export interface TechStackBackend {
  runtime?: string;
  framework?: string | string[];
  database?: string;
  authVerification?: string;
  other?: string[];
}

export interface TechStackDatabase {
  name?: string;
  collections?: string[];
}

export interface TechStackDeployment {
  client?: string;
  server?: string;
}

export interface TechStackDetails {
  frontend?: TechStackFrontend;
  backend?: TechStackBackend;
  database?: TechStackDatabase | string;
  deployment?: TechStackDeployment | string;
  uiLibrary?: string;
  stateManagement?: string;
  dataSource?: string;
  uiExtras?: string[];
  framework?: string | string[];
  styling?: string | string[];
  authentication?: string | { library?: string; methods?: string[] };
}

export interface ProjectPageInfo {
  name: string;
  route: string;
  access?: string;
  description?: string;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  auth: string;
}

export interface ProjectArchitecture {
  pattern?: string;
  authFlow?: string[];
}

export interface StateManagementInfo {
  approach?: string;
  stores?: string[];
  behaviors?: string[];
}

export interface DesignInfo {
  theme?: string;
  colors?: {
    background?: string[];
    accent?: string;
  };
  typography?: string;
  ui?: string;
  breakpoints?: Record<string, string>;
}

export interface ProjectData {
  id: string;
  name: string;
  nameBn?: string;
  subtitle?: string;
  tagline: string;
  taglineEn?: string;
  type: string;
  status: string;
  images?: string[];
  origin?: string;
  language?: string;
  author?: ProjectAuthor;
  liveLink?: string;
  serverLiveLink?: string;
  clientRepo?: string;
  serverRepo?: string;
  repo?: string | null;
  repoNote?: string;
  shortDescription: string;
  features?: string[];
  keyTechnologies?: string[];
  techStack?: TechStackDetails;
  architecture?: ProjectArchitecture;
  pages?: ProjectPageInfo[];
  apiBaseUrl?: string;
  apiEndpoints?: ApiEndpoint[];
  statusCodes?: Record<string, string>;
  dataModels?: Record<string, string[]>;
  environmentVariables?: { client?: string[]; server?: string[] } | string[];
  environmentNotes?: string[];
  prerequisites?: string[];
  deploymentNotes?: string[];
  futureImprovements?: string[];
  stateManagement?: StateManagementInfo;
  design?: DesignInfo;
}

export interface ProjectDetailsClientProps {
  project: ProjectData;
  prevProject: { id: string; name: string };
  nextProject: { id: string; name: string };
}

/* -------------------------------------------------------------------------- */
/* HELPER FUNCTIONS FOR TYPE SAFE RENDERING                                   */
/* -------------------------------------------------------------------------- */

function renderValue(val: string | string[] | undefined): string {
  if (!val) return "N/A";
  return Array.isArray(val) ? val.join(", ") : val;
}

function renderAuthInfo(
  auth: string | { library?: string; methods?: string[] } | undefined,
): string {
  if (!auth) return "N/A";
  if (typeof auth === "string") return auth;
  const lib = auth.library ? `${auth.library} ` : "";
  const methods = auth.methods ? `(${auth.methods.join(", ")})` : "";
  return `${lib}${methods}`.trim();
}

/* -------------------------------------------------------------------------- */
/* COMPONENT CODE                                                             */
/* -------------------------------------------------------------------------- */

export default function ProjectDetailsClient({
  project,
  prevProject,
  nextProject,
}: ProjectDetailsClientProps) {
  const images =
    project.images && project.images.length > 0
      ? project.images
      : ["/Pictures/p1.1.png"];

  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  // Determine repository links correctly for all 3 projects
  const clientRepoUrl = project.clientRepo || project.repo || null;
  const serverRepoUrl = project.serverRepo || null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-4 py-12 text-[#F3F4F6] sm:px-6 sm:py-20 lg:px-8">
      {/* Background Glowing Ambient Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-[#3B82F6]/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* 1. Header & Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-800 bg-[#111827]/80 px-4 py-2 text-sm font-medium text-[#D1D5DB] transition-all duration-300 hover:border-[#00E5FF]/50 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1
                  className="text-3xl font-extrabold tracking-tight text-[#F3F4F6] sm:text-5xl"
                  style={{ textShadow: "0 0 30px rgba(0, 229, 255, 0.4)" }}
                >
                  {project.name}
                  {project.nameBn && (
                    <span className="ml-3 text-2xl font-normal text-[#00E5FF]/80">
                      ({project.nameBn})
                    </span>
                  )}
                </h1>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-3 py-1 text-xs font-semibold text-[#00E5FF]">
                  <span className="h-2 w-2 animate-ping rounded-full bg-[#00E5FF]" />
                  {project.status || "Live / Deployed"}
                </span>
              </div>

              <p className="mt-2 text-lg font-medium text-[#00E5FF]/90">
                {project.tagline}
              </p>
            </div>

            <span className="rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
              {project.type}
            </span>
          </div>
        </motion.div>

        {/* 2. Primary CTAs (Live & Repositories) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap items-center gap-4 border-b border-gray-800/80 pb-8"
        >
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] px-6 py-3 text-sm font-bold text-[#0B0F19] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,229,255,0.6)]"
            >
              <FiExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}

          {clientRepoUrl && (
            <a
              href={clientRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-[#111827] px-5 py-3 text-sm font-semibold text-[#F3F4F6] transition-all duration-300 hover:border-[#00E5FF]/60 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              <FiGithub className="h-4 w-4" /> Client Code
            </a>
          )}

          {serverRepoUrl && (
            <a
              href={serverRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-[#111827] px-5 py-3 text-sm font-semibold text-[#F3F4F6] transition-all duration-300 hover:border-[#3B82F6]/60 hover:text-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              <FiServer className="h-4 w-4" /> Server Code
            </a>
          )}

          {project.serverLiveLink && (
            <a
              href={project.serverLiveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-800 bg-[#0B0F19] px-4 py-3 text-sm font-medium text-gray-400 transition-all duration-300 hover:border-gray-600 hover:text-white"
            >
              <FiGlobe className="h-4 w-4 text-[#00E5FF]" /> Server API
            </a>
          )}
        </motion.div>

        {/* 3. Interactive Image Gallery */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-14"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#3B82F6]/30 bg-[#111827]/90 p-2 shadow-[0_0_35px_rgba(11,15,25,0.8)] backdrop-blur-md">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0B0F19]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={`${project.name} screenshot`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  onMouseEnter={() => setSelectedImage(img)}
                  className={`relative h-16 w-28 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    selectedImage === img
                      ? "scale-105 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                      : "border-gray-800 opacity-60 hover:border-gray-600 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.section>

        {/* 4. Overview & Key Tech Badges */}
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brief Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-gray-800 bg-[#111827]/90 p-6 lg:col-span-2"
          >
            <div className="mb-4 flex items-center gap-2.5 text-[#00E5FF]">
              <FiLayers className="h-5 w-5" />
              <h2 className="text-xl font-bold text-[#F3F4F6]">
                Project Overview
              </h2>
            </div>
            <p className="leading-relaxed text-[#D1D5DB] sm:text-base">
              {project.shortDescription}
            </p>

            {project.author && (
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-800/80 pt-4 text-xs text-gray-400">
                <span>
                  Author:{" "}
                  <strong className="text-white">{project.author.name}</strong>
                </span>
                <span>•</span>
                <span>{project.author.email}</span>
              </div>
            )}
          </motion.div>

          {/* Key Tech Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-gray-800 bg-[#111827]/90 p-6"
          >
            <div className="mb-4 flex items-center gap-2.5 text-[#3B82F6]">
              <FiCpu className="h-5 w-5" />
              <h2 className="text-xl font-bold text-[#F3F4F6]">Technologies</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.keyTechnologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 text-xs font-medium text-[#F3F4F6] transition-all duration-300 hover:border-[#00E5FF] hover:text-[#00E5FF] hover:shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 5. Detailed Categorized Tech Stack */}
        {project.techStack && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 rounded-2xl border border-gray-800 bg-[#111827]/90 p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-2.5 text-[#00E5FF]">
              <FiCode className="h-6 w-6" />
              <h2 className="text-2xl font-bold text-[#F3F4F6]">
                Detailed Tech Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Frontend */}
              <div className="rounded-xl border border-gray-800/80 bg-[#0B0F19] p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#00E5FF]">
                  Frontend
                </h3>
                <ul className="space-y-2 text-xs text-[#D1D5DB]">
                  {project.techStack.frontend?.framework && (
                    <li>
                      <strong className="text-white">Framework:</strong>{" "}
                      {renderValue(project.techStack.frontend.framework)}
                    </li>
                  )}
                  {project.techStack.framework &&
                    !project.techStack.frontend && (
                      <li>
                        <strong className="text-white">Framework:</strong>{" "}
                        {renderValue(project.techStack.framework)}
                      </li>
                    )}
                  {project.techStack.frontend?.styling && (
                    <li>
                      <strong className="text-white">Styling:</strong>{" "}
                      {renderValue(project.techStack.frontend.styling)}
                    </li>
                  )}
                  {project.techStack.styling && !project.techStack.frontend && (
                    <li>
                      <strong className="text-white">Styling:</strong>{" "}
                      {renderValue(project.techStack.styling)}
                    </li>
                  )}
                  {project.techStack.frontend?.uiComponents && (
                    <li>
                      <strong className="text-white">UI Components:</strong>{" "}
                      {project.techStack.frontend.uiComponents}
                    </li>
                  )}
                  {project.techStack.frontend?.authentication && (
                    <li>
                      <strong className="text-white">Auth:</strong>{" "}
                      {renderAuthInfo(
                        project.techStack.frontend.authentication,
                      )}
                    </li>
                  )}
                  {project.techStack.authentication &&
                    !project.techStack.frontend && (
                      <li>
                        <strong className="text-white">Auth:</strong>{" "}
                        {renderAuthInfo(project.techStack.authentication)}
                      </li>
                    )}
                  {project.techStack.uiLibrary && (
                    <li>
                      <strong className="text-white">UI Library:</strong>{" "}
                      {project.techStack.uiLibrary}
                    </li>
                  )}
                </ul>
              </div>

              {/* Backend */}
              <div className="rounded-xl border border-gray-800/80 bg-[#0B0F19] p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#3B82F6]">
                  Backend
                </h3>
                <ul className="space-y-2 text-xs text-[#D1D5DB]">
                  {project.techStack.backend?.runtime && (
                    <li>
                      <strong className="text-white">Runtime:</strong>{" "}
                      {project.techStack.backend.runtime}
                    </li>
                  )}
                  {project.techStack.backend?.framework && (
                    <li>
                      <strong className="text-white">Framework:</strong>{" "}
                      {renderValue(project.techStack.backend.framework)}
                    </li>
                  )}
                  {project.techStack.backend?.authVerification && (
                    <li>
                      <strong className="text-white">Verification:</strong>{" "}
                      {project.techStack.backend.authVerification}
                    </li>
                  )}
                  {project.techStack.dataSource && (
                    <li>
                      <strong className="text-white">Data Source:</strong>{" "}
                      {project.techStack.dataSource}
                    </li>
                  )}
                </ul>
              </div>

              {/* Database */}
              <div className="rounded-xl border border-gray-800/80 bg-[#0B0F19] p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#00E5FF]">
                  Database
                </h3>
                {typeof project.techStack.database === "object" ? (
                  <ul className="space-y-2 text-xs text-[#D1D5DB]">
                    {project.techStack.database.name && (
                      <li>
                        <strong className="text-white">Name:</strong>{" "}
                        {project.techStack.database.name}
                      </li>
                    )}
                    {project.techStack.database.collections && (
                      <li>
                        <strong className="text-white">Collections:</strong>{" "}
                        {project.techStack.database.collections.join(", ")}
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-xs text-[#D1D5DB]">
                    {project.techStack.database || "N/A"}
                  </p>
                )}
              </div>

              {/* Deployment */}
              <div className="rounded-xl border border-gray-800/80 bg-[#0B0F19] p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#3B82F6]">
                  Deployment
                </h3>
                {typeof project.techStack.deployment === "object" ? (
                  <ul className="space-y-2 text-xs text-[#D1D5DB]">
                    {project.techStack.deployment.client && (
                      <li>
                        <strong className="text-white">Client:</strong>{" "}
                        {project.techStack.deployment.client}
                      </li>
                    )}
                    {project.techStack.deployment.server && (
                      <li>
                        <strong className="text-white">Server:</strong>{" "}
                        {project.techStack.deployment.server}
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-xs text-[#D1D5DB]">
                    {project.techStack.deployment || "N/A"}
                  </p>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* 6. Key Features Grid */}
        {project.features && project.features.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="mb-6 flex items-center gap-2.5">
              <FiGrid className="h-6 w-6 text-[#00E5FF]" />
              <h2 className="text-2xl font-bold text-[#F3F4F6]">
                Key Features
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group rounded-xl border border-gray-800/80 bg-[#111827]/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#00E5FF]/60 hover:bg-[#111827] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                >
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#00E5FF] transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm leading-snug text-[#D1D5DB]">
                      {feature}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 7. Architecture & Auth Insights / State Management */}
        {(project.architecture || project.stateManagement) && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 rounded-2xl border border-[#3B82F6]/30 bg-[#111827]/80 p-6 sm:p-8"
          >
            <div className="mb-4 flex items-center gap-2.5 text-[#3B82F6]">
              <FiShield className="h-6 w-6 text-[#00E5FF]" />
              <h2 className="text-2xl font-bold text-[#F3F4F6]">
                Architecture & System Logic
              </h2>
            </div>

            {/* Architecture Pattern */}
            {project.architecture?.pattern && (
              <p className="mb-4 text-sm font-medium text-[#00E5FF]">
                Repository Pattern:{" "}
                <span className="text-[#D1D5DB]">
                  {project.architecture.pattern}
                </span>
              </p>
            )}

            {/* Auth Flow */}
            {project.architecture?.authFlow && (
              <div className="mb-6 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F3F4F6]">
                  Authentication & Data Verification Flow:
                </h3>
                <ul className="space-y-2">
                  {project.architecture.authFlow.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#D1D5DB]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/20 text-xs font-bold text-[#3B82F6]">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* State Management logic (FitLog specific) */}
            {project.stateManagement && (
              <div className="space-y-3 border-t border-gray-800/80 pt-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#00E5FF]">
                  State Management ({project.stateManagement.approach}):
                </h3>
                {project.stateManagement.behaviors && (
                  <ul className="space-y-2">
                    {project.stateManagement.behaviors.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-[#D1D5DB]"
                      >
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#3B82F6]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.section>
        )}

        {/* 8. Application Pages List */}
        {project.pages && project.pages.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="mb-6 flex items-center gap-2.5 text-[#00E5FF]">
              <FiMapPin className="h-6 w-6" />
              <h2 className="text-2xl font-bold text-[#F3F4F6]">
                Application Routes & Pages
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.pages.map((page, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-800 bg-[#111827]/80 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#F3F4F6]">
                      {page.name}
                    </span>
                    {page.access && (
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          page.access === "private" ||
                          page.access === "login required"
                            ? "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                            : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {page.access}
                      </span>
                    )}
                  </div>
                  <code className="mt-2 block text-xs text-[#00E5FF]">
                    {page.route}
                  </code>
                  {page.description && (
                    <p className="mt-2 text-xs text-gray-400">
                      {page.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 9. Future Improvements */}
        {project.futureImprovements &&
          project.futureImprovements.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 rounded-2xl border border-gray-800 bg-[#111827]/90 p-6 sm:p-8"
            >
              <div className="mb-4 flex items-center gap-2.5 text-[#00E5FF]">
                <FiTrendingUp className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-[#F3F4F6]">
                  Future Roadmap & Enhancements
                </h2>
              </div>
              <ul className="space-y-3">
                {project.futureImprovements.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[#D1D5DB]"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#00E5FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

        {/* 10. Bottom Navigation Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-6 border-t border-gray-800/80 pt-8 sm:flex-row"
        >
          <Link
            href={`/projects/${prevProject.id.toLowerCase()}`}
            className="group flex items-center gap-3 rounded-xl border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm font-medium text-[#D1D5DB] transition-all duration-300 hover:border-[#00E5FF]/50 hover:text-[#00E5FF]"
          >
            <FiChevronLeft className="h-5 w-5 text-[#00E5FF] transition-transform group-hover:-translate-x-1" />
            <div className="text-left">
              <span className="block text-[10px] uppercase text-gray-500">
                Previous Project
              </span>
              <span>{prevProject.name}</span>
            </div>
          </Link>

          <Link
            href="/projects"
            className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] px-6 py-2.5 text-sm font-semibold text-[#0B0F19] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            All Projects
          </Link>

          <Link
            href={`/projects/${nextProject.id.toLowerCase()}`}
            className="group flex items-center gap-3 rounded-xl border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm font-medium text-[#D1D5DB] transition-all duration-300 hover:border-[#00E5FF]/50 hover:text-[#00E5FF]"
          >
            <div className="text-right">
              <span className="block text-[10px] uppercase text-gray-500">
                Next Project
              </span>
              <span>{nextProject.name}</span>
            </div>
            <FiChevronRight className="h-5 w-5 text-[#00E5FF] transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
