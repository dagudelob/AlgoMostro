import type { VisualizerType } from './flowchart';

export interface DSItem {
  id: string;
  name: string;
  category: 'data_structure';
  type: VisualizerType;
  description: string;
  iconName: string;
  timeComplexity: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
  };
  spaceComplexity: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  snippet: string;
}

export interface AlgoItem {
  id: string;
  name: string;
  category: 'algorithm';
  type: VisualizerType;
  description: string;
  iconName: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  patterns: string[];
  keySignals: string[];
  snippet: string;
}

export interface StepAnimationState {
  stepIndex: number;
  totalSteps: number;
  description: string;
  highlightIndices?: number[];
  secondaryIndices?: number[];
  pointers?: { [key: string]: number | string };
  codeLine?: number;
  stateData?: any;
}
