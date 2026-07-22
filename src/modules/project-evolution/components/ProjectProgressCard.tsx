import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CalendarClock } from 'lucide-react';
import { ProjectInfo } from '../types';

interface ProjectProgressCardProps {
  project: ProjectInfo;
}

export const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card via-card to-info-subtle p-6 shadow-soft-md sm:p-7"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-6 translate-x-6 rounded-full bg-primary/10 blur-2xl" />

      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-info-subtle-foreground">
        <Sparkles className="h-4 w-4" />
        <span>Status do Projeto</span>
      </div>

      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
        {project.name}
      </h3>

      <div className="mt-5 space-y-3.5 text-xs">
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <span className="font-semibold text-muted-foreground">Status</span>
          <span className="rounded-full border border-warning/30 bg-warning-subtle px-2.5 py-1 text-[10px] font-bold text-warning-subtle-foreground">
            {project.status}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <span className="font-semibold text-muted-foreground">Responsável</span>
          <span className="font-semibold text-foreground text-right">{project.owner}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-semibold text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5" />
            Última atualização
          </span>
          <span className="font-semibold text-foreground">{project.lastUpdated}</span>
        </div>
      </div>
    </motion.div>
  );
};
