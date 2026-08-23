export type Category = 
  | 'graph' 
  | 'tree' 
  | 'array_string' 
  | 'linked_list'
  | 'dp' 
  | 'binary_search'
  | 'heap'
  | 'greedy'
  | 'math' 
  | 'design' 
  | 'general';

export type VisualizerType = 
  | 'array' 
  | 'linked_list' 
  | 'tree' 
  | 'graph' 
  | 'heap' 
  | 'trie' 
  | 'stack' 
  | 'queue'
  | 'sliding_window' 
  | 'two_pointers' 
  | 'bfs' 
  | 'dfs' 
  | 'dp' 
  | 'binary_search' 
  | 'greedy' 
  | 'prefix_sum';

export interface FlowchartOption {
  id: string;
  label: string; // 'Sí' | 'No' | 'Depende' | custom text
  description?: string;
  nextNodeId?: string;
  algorithmResultId?: string;
}

export interface FlowchartNode {
  id: string;
  question: string;
  subtitle?: string;
  category: Category;
  options: FlowchartOption[];
  tags?: string[];
  recommendedDS?: string[];
  recommendedAlgo?: string[];
}

export interface ClassicProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: 'LeetCode' | 'AlgoMonster' | 'Codeforces';
  problemNumber?: number;
  url?: string;
  summary: string;
  keyInsight: string;
  timeComplexity: string;
  spaceComplexity: string;
  pythonCode: string;
  tsCode: string;
  sampleInput: string;
  sampleOutput: string;
}

export interface AlgorithmResult {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  whyThisPattern: string;
  timeComplexity: string;
  spaceComplexity: string;
  dataStructures: string[];
  algorithms: string[];
  visualizerType?: VisualizerType;
  classicProblems: ClassicProblem[];
  whenToUse: string[];
  whenToAvoid: string[];
}
