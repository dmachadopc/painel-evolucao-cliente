import React from 'react';
import { motion } from 'motion/react';
import { CalendarDays } from 'lucide-react';
import { HistoryEntry } from '../types';

interface ProjectHistoryProps {
  history: HistoryEntry[];
}

export const ProjectHistory: React.FC<ProjectHistoryProps> = ({ history }) => {
  return (
    <div className="space-y-5">
      {history.map((entry, index) => {
        const Wrapper = entry.onClick ? 'button' : 'div';
        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
          >
            <Wrapper
              type={entry.onClick ? 'button' : undefined}
              onClick={entry.onClick}
              className={`w-full rounded-xl border border-border bg-card p-5 text-left shadow-flat sm:p-6 ${
                entry.onClick ? 'cursor-pointer transition-colors hover:border-primary/30' : ''
              }`}
            >
              <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>{entry.date}</span>
              </div>
              <ul className="space-y-2.5 border-l border-border pl-4">
                {entry.items.map((item) => (
                  <li key={item.id}>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    {item.description && (
                      <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </Wrapper>
          </motion.div>
        );
      })}
    </div>
  );
};
