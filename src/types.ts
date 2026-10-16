export interface RAGSource {
  id: string;
  title: string;
  publisher: string;
  badge: string;
  excerpt: string;
  fullContent?: string;
  pageRef?: string;
}

export interface StoryStage {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  sources: RAGSource[];
  initialMessage: string;
  anchorEmoji: string;
  anchorTitle: string;
  anchorText: string;
  analogTitle: string;
  analogText: string;
  isUnlocked: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  sourceTag?: string;
  xpBonus?: number;
  stage?: number;
}

export interface HOTSQuestion {
  id: number;
  title: string;
  stageTopic: string;
  question: string;
  options: {
    key: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  xp: number;
  bloomTaxonomy: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  classRoom: string;
  currentStage: number;
  xp: number;
  monopolyMastery: 'Perlu Bimbingan' | 'Mulai Berkembang' | 'Mahir';
  chronologyMastery: 'Perlu Bimbingan' | 'Mulai Berkembang' | 'Mahir';
  criticalThinking: 'Perlu Bimbingan' | 'Mulai Berkembang' | 'Mahir';
  hintsUsed: number;
  lastActive: string;
  badgesCount: number;
}

export interface StudentUser {
  id: string;
  name: string;
  classRoom: string;
  xp: number;
  currentStage: number;
}
