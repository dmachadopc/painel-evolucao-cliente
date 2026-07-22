import React, { useState } from 'react';
import { StandaloneHeader } from '../../../components/StandaloneHeader';
import { ProjectHero } from '../components/ProjectHero';
import { ProjectTechnicalHealth } from '../components/ProjectTechnicalHealth';
import { ProjectTimeline } from '../components/ProjectTimeline';
import { ProjectReleaseCard } from '../components/ProjectReleaseCard';
import { ProjectComparison } from '../components/ProjectComparison';
import { ProjectRoadmap } from '../components/ProjectRoadmap';
import { ProjectAchievements } from '../components/ProjectAchievements';
import { ProjectHistory } from '../components/ProjectHistory';
import { ProjectDocuments } from '../components/ProjectDocuments';
import { Presentation, Minimize2 } from 'lucide-react';
import {
  project,
  milestones,
  releases,
  comparisons,
  roadmap,
  achievements,
  history,
  documents
} from '../data/mockProjectEvolution';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <div className="mb-6">
    <h2 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
      {title}
    </h2>
    {description && (
      <p className="mt-1 max-w-2xl text-xs text-muted-foreground sm:text-sm">{description}</p>
    )}
  </div>
);

export default function ProjectEvolutionPage() {
  const [presentationMode, setPresentationMode] = useState(false);

  return (
    <div className={`flex min-h-screen w-full flex-col bg-background font-sans text-foreground transition-all duration-300 ${presentationMode ? 'py-4 sm:py-8' : ''}`}>
      {!presentationMode && <StandaloneHeader />}

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-16">
          <ProjectHero
            project={project}
            title="Evolução do Projeto"
            subtitle="Acompanhe em tempo real a evolução do desenvolvimento do Ravem ERP."
          />

          <section>
            <SectionHeader
              title="Saúde & Qualidade Técnica"
              description="Métricas de integridade de código, cobertura de testes e performance do sistema."
            />
            <ProjectTechnicalHealth />
          </section>

          <section>
            <SectionHeader
              title="Etapas do Projeto"
              description="Da fundação técnica até as próximas entregas, veja o que já foi conquistado e o que ainda está por vir."
            />
            <ProjectTimeline milestones={milestones} />
          </section>

          <section>
            <SectionHeader
              title="Últimas Entregas"
              description="Principais novidades entregues nas últimas semanas de desenvolvimento."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {releases.map((release, index) => (
                <ProjectReleaseCard key={release.id} release={release} index={index} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              title="Antes x Depois"
              description="Comparações visuais das principais transformações do sistema."
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {comparisons.map((comparison, index) => {
                const isVideoComparison = !!(comparison.beforeVideoUrl || comparison.afterVideoUrl);
                return (
                  <div key={comparison.id} className={isVideoComparison ? 'lg:col-span-2' : ''}>
                    <ProjectComparison comparison={comparison} index={index} />
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <SectionHeader
              title="Próximas Entregas"
              description="O que está planejado para os próximos ciclos de desenvolvimento."
            />
            <ProjectRoadmap items={roadmap} />
          </section>

          <section>
            <SectionHeader
              title="Conquistas"
              description="Melhorias e marcos já implementados no sistema."
            />
            <ProjectAchievements achievements={achievements} />
          </section>

          <section>
            <SectionHeader
              title="Histórico de Atualizações"
              description="Linha do tempo detalhada das entregas por data."
            />
            <ProjectHistory history={history} />
          </section>

          <section>
            <SectionHeader
              title="Documentação"
              description="Referências e materiais complementares do projeto."
            />
            <ProjectDocuments documents={documents} />
          </section>
        </div>
      </div>

      {/* Controles do Modo Apresentação */}
      {presentationMode ? (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-full border border-border bg-card/90 backdrop-blur px-4 py-2 shadow-soft-xl">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider animate-pulse flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Modo Apresentação Ativo
          </span>
          <button
            onClick={() => setPresentationMode(false)}
            className="flex items-center gap-1 rounded-lg bg-primary hover:bg-primary/90 px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-flat transition-opacity cursor-pointer"
          >
            <Minimize2 className="h-3.5 w-3.5" />
            Sair
          </button>
        </div>
      ) : (
        <button
          onClick={() => setPresentationMode(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary hover:bg-primary/95 px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-soft-xl hover:scale-105 transition-all cursor-pointer"
        >
          <Presentation className="h-4 w-4" />
          Modo Apresentação
        </button>
      )}
    </div>
  );
}
