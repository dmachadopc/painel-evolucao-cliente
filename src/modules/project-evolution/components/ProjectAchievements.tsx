import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Achievement } from '../types';

interface ProjectAchievementsProps {
  achievements: Achievement[];
}

export const ProjectAchievements: React.FC<ProjectAchievementsProps> = ({ achievements }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-xl border border-border bg-card p-6 shadow-flat sm:p-7"
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <li key={achievement.id} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" strokeWidth={1.75} />
            <div>
              <p className="text-sm font-semibold text-foreground">{achievement.title}</p>
              {achievement.description && (
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {achievement.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
