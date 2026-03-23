export type Axis = 'metaphysics' | 'politics' | 'epistemology' | 'technology' | 'humanNature';

export interface Answer {
  text: string;
  scores: Partial<Record<Axis, number>>;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export interface DimensionInfo {
  name: string;
  poleA: string;
  poleB: string;
  descA: string;
  descB: string;
  descMixed: string;
}

export interface Book {
  title: string;
  author: string;
  description: string;
}

export type Language = 'tr' | 'el';
