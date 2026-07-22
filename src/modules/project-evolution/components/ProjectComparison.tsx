import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ImageIcon, Play, X, Maximize2 } from 'lucide-react';
import { Comparison } from '../types';

interface ProjectComparisonProps {
  comparison: Comparison;
  index?: number;
}

const MediaPlaceholder: React.FC<{ label: string; imageUrl?: string; videoUrl?: string }> = ({
  label,
  imageUrl,
  videoUrl
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (videoUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
        <video
          src={videoUrl}
          className="h-full w-full object-contain"
          autoPlay
          loop
          muted
          playsInline
          controls
        />
      </div>
    );
  }

  if (imageUrl) {
    return (
      <>
        <div
          onClick={() => setIsOpen(true)}
          className="group relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted cursor-zoom-in"
        >
          <img
            src={imageUrl}
            alt={label}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Indicativo persistente no canto da imagem */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-background/80 backdrop-blur-sm px-2 py-0.5 text-[9px] font-semibold text-foreground border border-border/40 shadow-flat transition-opacity duration-200 group-hover:opacity-0">
            <Maximize2 className="h-2.5 w-2.5" />
            <span>Clique para ampliar</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="rounded-lg bg-card/90 p-2 text-foreground shadow-soft transition-transform duration-200 group-hover:scale-110">
              <Maximize2 className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-background/90 backdrop-blur-md cursor-zoom-out"
              />

              {/* Imagem Ampliada */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative z-10 max-h-[90vh] max-w-[90vw]"
              >
                <img
                  src={imageUrl}
                  alt={label}
                  className="rounded-xl max-h-[85vh] max-w-full object-contain shadow-soft-xl border border-border bg-card"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-soft hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/60 text-muted-foreground">
      <Play className="h-7 w-7" strokeWidth={1.5} />
      <span className="text-[11px] font-medium">Vídeo/Print em breve</span>
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
            <MediaPlaceholder
              label={comparison.beforeLabel || 'Antes'}
              imageUrl={comparison.beforeImageUrl}
              videoUrl={comparison.beforeVideoUrl}
            />
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
            <MediaPlaceholder
              label={comparison.afterLabel || 'Depois'}
              imageUrl={comparison.afterImageUrl}
              videoUrl={comparison.afterVideoUrl}
            />
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
