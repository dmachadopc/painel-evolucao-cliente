import React from 'react';
import { motion } from 'motion/react';
import { ProjectInfo } from '../types';
import { ProjectProgressCard } from './ProjectProgressCard';

interface ProjectHeroProps {
  project: ProjectInfo;
  title: string;
  subtitle: string;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project, title, subtitle }) => {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col justify-center lg:col-span-2"
      >
        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
          Ravem ERP
        </span>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="rounded-full border border-border bg-card px-3 py-1.5 shadow-flat">
            Fase: {project.phase}
          </span>
          <span className="rounded-full border border-border bg-card px-3 py-1.5 shadow-flat">
            Versão: {project.version}
          </span>
        </div>
      </motion.div>

      <ProjectProgressCard project={project} />
    </section>
  );
};
