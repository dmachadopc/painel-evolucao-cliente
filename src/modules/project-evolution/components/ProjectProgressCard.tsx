import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CalendarClock, ChevronRight } from 'lucide-react';
import { ProjectInfo } from '../types';

interface ProjectProgressCardProps {
  project: ProjectInfo;
}

const modulesProgress = [
  { name: 'Banco de Dados & Infra (Supabase)', percentage: 100 },
  { name: 'Login, Auth & Permissões (RBAC)', percentage: 100 },
  { name: 'Módulo Financeiro (Nativo)', percentage: 100 },
  { name: 'Design System & Padrão Premium', percentage: 95 },
  { name: 'Módulo REURB & Engenharia', percentage: 80 },
  { name: 'Evolução do CRM Comercial', percentage: 50 },
  { name: 'Responsividade Mobile (UX-002)', percentage: 40 },
  { name: 'Portal do Cliente (Autônomo)', percentage: 0 },
];

export const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({ project }) => {
  // Média simples do progresso dos módulos
  const totalProgress = Math.round(
    modulesProgress.reduce((acc, curr) => acc + curr.percentage, 0) / modulesProgress.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card via-card to-info-subtle p-6 shadow-soft-md sm:p-7 flex flex-col justify-between"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-6 translate-x-6 rounded-full bg-primary/10 blur-2xl" />

      <div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-info-subtle-foreground">
          <Sparkles className="h-4 w-4" />
          <span>Progresso Real do ERP</span>
        </div>

        {/* Progresso Geral */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-[26px] font-display font-extrabold tracking-tight text-foreground">
              {totalProgress}%
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Sistema Completo
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-info rounded-full"
            />
          </div>
        </div>

        {/* Detalhamento de Módulos */}
        <div className="mt-6 space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
            Status por Módulo
          </span>
          <div className="max-h-48 overflow-y-auto pr-1 space-y-2 scrollbar-thin">
            {modulesProgress.map((mod, idx) => (
              <div key={idx} className="flex flex-col gap-1 rounded-lg border border-border/40 bg-card/50 p-2 text-[11px]">
                <div className="flex justify-between items-center font-medium">
                  <span className="text-foreground/90 truncate pr-2">{mod.name}</span>
                  <span className={mod.percentage === 100 ? 'text-success font-semibold' : 'text-muted-foreground'}>
                    {mod.percentage}%
                  </span>
                </div>
                <div className="h-1 w-full rounded-full bg-muted/65 overflow-hidden">
                  <div
                    style={{ width: `${mod.percentage}%` }}
                    className={`h-full rounded-full ${
                      mod.percentage === 100 
                        ? 'bg-success' 
                        : mod.percentage > 0 
                        ? 'bg-primary/80' 
                        : 'bg-muted'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2.5 border-t border-border/70 pt-4 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-muted-foreground">Fase do Projeto</span>
          <span className="rounded-full border border-warning/30 bg-warning-subtle px-2 py-0.5 text-[9px] font-bold text-warning-subtle-foreground uppercase">
            {project.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-semibold text-muted-foreground">
            <CalendarClock className="h-3 w-3" />
            Atualizado em
          </span>
          <span className="font-semibold text-foreground">{project.lastUpdated}</span>
        </div>
      </div>
    </motion.div>
  );
};
