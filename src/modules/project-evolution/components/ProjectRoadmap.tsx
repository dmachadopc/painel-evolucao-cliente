import React from 'react';
import { motion } from 'motion/react';
import { RoadmapItem, RoadmapPriority, RoadmapStatus } from '../types';

interface ProjectRoadmapProps {
  items: RoadmapItem[];
}

const priorityStyles: Record<RoadmapPriority, string> = {
  high: 'border-destructive/30 bg-destructive-subtle text-destructive-subtle-foreground',
  medium: 'border-warning/30 bg-warning-subtle text-warning-subtle-foreground',
  low: 'border-info/30 bg-info-subtle text-info-subtle-foreground'
};

const priorityLabel: Record<RoadmapPriority, string> = {
  high: 'Prioridade Alta',
  medium: 'Prioridade Média',
  low: 'Prioridade Baixa'
};

const statusLabel: Record<RoadmapStatus, string> = {
  in_progress: 'Em andamento',
  planned: 'Planejado',
  not_started: 'Não iniciado'
};

export const ProjectRoadmap: React.FC<ProjectRoadmapProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
          className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-flat"
        >
          <div className="flex items-center justify-between gap-2">
            <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${priorityStyles[item.priority]}`}>
              {priorityLabel[item.priority]}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground">
              {statusLabel[item.status]}
            </span>
          </div>
          <h3 className="mt-3 font-display text-sm font-bold text-foreground">{item.title}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
