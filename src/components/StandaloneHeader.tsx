import React from 'react';
import { Rocket } from 'lucide-react';

export const StandaloneHeader: React.FC = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
          <Rocket className="h-4.5 w-4.5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-widest text-primary">
            Ravem ERP
          </p>
          <h1 className="truncate font-display text-sm font-bold text-foreground sm:text-base">
            Evolução do Projeto
          </h1>
        </div>
      </div>
    </header>
  );
};
