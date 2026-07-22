import React from 'react';
import { StandaloneHeader } from '../../../components/StandaloneHeader';
import { ProjectHero } from '../components/ProjectHero';
import { ProjectTimeline } from '../components/ProjectTimeline';
import { ProjectReleaseCard } from '../components/ProjectReleaseCard';
import { ProjectComparison } from '../components/ProjectComparison';
import { ProjectRoadmap } from '../components/ProjectRoadmap';
import { ProjectAchievements } from '../components/ProjectAchievements';
import { ProjectHistory } from '../components/ProjectHistory';
import { ProjectDocuments } from '../components/ProjectDocuments';
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
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      <StandaloneHeader />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-16">
          <ProjectHero
            project={project}
            title="Evolução do Projeto"
            subtitle="Acompanhe em tempo real a evolução do desenvolvimento do Ravem ERP."
          />

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
              {comparisons.map((comparison, index) => (
                <ProjectComparison key={comparison.id} comparison={comparison} index={index} />
              ))}
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
    </div>
  );
}
