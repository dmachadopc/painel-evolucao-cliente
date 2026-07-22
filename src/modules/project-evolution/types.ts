import { LucideIcon } from 'lucide-react';

export interface ProjectInfo {
  name: string;
  status: string;
  lastUpdated: string;
  owner: string;
  version?: string;
  phase?: string;
}

export type MilestoneStatus = 'done' | 'in_progress' | 'upcoming';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  icon: LucideIcon;
  date?: string;
}

export interface Release {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  onClick?: () => void;
  href?: string;
}

export interface Comparison {
  id: string;
  title: string;
  description: string;
  result: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
}

export type RoadmapPriority = 'high' | 'medium' | 'low';
export type RoadmapStatus = 'planned' | 'in_progress' | 'not_started';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  priority: RoadmapPriority;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  description?: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  items: HistoryItem[];
  onClick?: () => void;
}

export type DocumentStatus = 'available' | 'coming_soon';

export interface DocumentRef {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  href?: string;
}
