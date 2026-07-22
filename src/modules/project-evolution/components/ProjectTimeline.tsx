import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Milestone } from '../types';

interface ProjectTimelineProps {
  milestones: Milestone[];
}

const statusStyles = {
  done: {
    dot: 'bg-success text-success-foreground border-success/30',
    title: 'text-foreground',
    description: 'text-muted-foreground',
    card: 'border-border bg-card'
  },
  in_progress: {
    dot: 'bg-warning-subtle text-warning-subtle-foreground border-warning/40',
    title: 'text-foreground',
    description: 'text-muted-foreground',
    card: 'border-warning/30 bg-card shadow-soft'
  },
  upcoming: {
    dot: 'bg-muted text-muted-foreground border-border',
    title: 'text-muted-foreground',
    description: 'text-muted-foreground/70',
    card: 'border-dashed border-border bg-card/60'
  }
} as const;

const statusLabel = {
  done: 'Concluído',
  in_progress: 'Em andamento',
  upcoming: 'Futuro'
} as const;

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ milestones }) => {
  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border sm:left-[23px]" aria-hidden="true" />

      <ol className="space-y-6">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const styles = statusStyles[milestone.status];

          return (
            <motion.li
              key={milestone.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: 'easeOut' }}
              className="relative flex gap-4 sm:gap-5"
            >
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border sm:h-12 sm:w-12 ${styles.dot}`}
              >
                {milestone.status === 'done' ? (
                  <Check className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2.5} />
                ) : (
                  <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.75} />
                )}
              </div>

              <div className={`flex-1 rounded-xl border p-4 sm:p-5 ${styles.card}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className={`font-display text-sm font-bold sm:text-base ${styles.title}`}>
                    {milestone.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      milestone.status === 'done'
                        ? 'border border-success/30 bg-success-subtle text-success-subtle-foreground'
                        : milestone.status === 'in_progress'
                        ? 'border border-warning/30 bg-warning-subtle text-warning-subtle-foreground'
                        : 'border border-border bg-muted text-muted-foreground'
                    }`}
                  >
                    {statusLabel[milestone.status]}
                  </span>
                </div>
                <p className={`mt-1.5 text-xs leading-relaxed sm:text-sm ${styles.description}`}>
                  {milestone.description}
                </p>
                {milestone.date && (
                  <span className="mt-2 inline-block font-mono text-[10px] uppercase text-muted-foreground/80">
                    {milestone.date}
                  </span>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
};
