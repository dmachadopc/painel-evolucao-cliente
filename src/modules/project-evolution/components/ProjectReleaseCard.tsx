import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Release } from '../types';

interface ProjectReleaseCardProps {
  release: Release;
  index?: number;
}

export const ProjectReleaseCard: React.FC<ProjectReleaseCardProps> = ({ release, index = 0 }) => {
  const isInteractive = Boolean(release.onClick || release.href);
  const Wrapper = isInteractive ? 'button' : 'div';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Wrapper
        type={isInteractive ? 'button' : undefined}
        onClick={release.onClick}
        className={`flex h-full w-full flex-col rounded-xl border border-border bg-card p-5 text-left shadow-flat transition-all duration-200 ${
          isInteractive ? 'cursor-pointer hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-primary/20 bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
            {release.category}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">{release.date}</span>
        </div>

        <h3 className="mt-3 font-display text-sm font-bold text-foreground">{release.title}</h3>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
          {release.description}
        </p>

        {isInteractive && (
          <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-primary">
            <span>Ver detalhes</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
};
