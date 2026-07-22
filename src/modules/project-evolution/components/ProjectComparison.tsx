import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ImageIcon } from 'lucide-react';
import { Comparison } from '../types';

interface ProjectComparisonProps {
  comparison: Comparison;
  index?: number;
}

const ImagePlaceholder: React.FC<{ label: string; imageUrl?: string }> = ({ label, imageUrl }) => {
  if (imageUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
        <img src={imageUrl} alt={label} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/60 text-muted-foreground">
      <ImageIcon className="h-7 w-7" strokeWidth={1.5} />
      <span className="text-[11px] font-medium">Prints em breve</span>
    </div>
  );
};

export const ProjectComparison: React.FC<ProjectComparisonProps> = ({ comparison, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
    >
      <div className="border-b border-border p-5 sm:p-6">
        <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
          {comparison.title}
        </h3>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {comparison.beforeLabel || 'Antes'}
            </span>
            <ImagePlaceholder label={comparison.beforeLabel || 'Antes'} imageUrl={comparison.beforeImageUrl} />
          </div>

          <div className="flex justify-center sm:rotate-[-90deg]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {comparison.afterLabel || 'Depois'}
            </span>
            <ImagePlaceholder label={comparison.afterLabel || 'Depois'} imageUrl={comparison.afterImageUrl} />
          </div>
        </div>

        <div className="mt-5 space-y-2 border-t border-border pt-4">
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {comparison.description}
          </p>
          <p className="text-xs font-semibold text-success-subtle-foreground sm:text-sm">
            Resultado: {comparison.result}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
