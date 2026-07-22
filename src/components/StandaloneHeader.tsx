import React from 'react';

export const StandaloneHeader: React.FC = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <img
          src="/assets/logos/ravem-erp-icone-logo1.webp"
          alt="Ravem ERP"
          className="h-9 w-9 shrink-0 rounded-lg object-contain"
        />
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
