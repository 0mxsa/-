// src/types.ts
export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'low';

export interface BaseEntity {
  id: string;
  name: string;
  progress: number;
  priority: PriorityLevel;
  tags?: string[];
}

export interface Task extends BaseEntity {
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  estimatedHours: number;
}

export interface PersonalGoal extends BaseEntity {
  description: string;
  deadline: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedHours: number;
  streakDays: number;
  subTasks: Task[];
  aiSuggestions: string[];
}

export interface Person extends BaseEntity {
  role: string;
  description: string;
  phone: string;
  email: string;
  status: 'active' | 'waiting' | 'inactive';
  sharedGoals: SharedGoal[];
}

export interface SharedGoal extends BaseEntity {
  deadline: string;
  tasks: Task[];
  aiSuggestions: string[];
}

export interface UserStats {
  generalProgress: number;
  productivityRate: number;
  weeklyProgress: number;
  monthlyProgress: number;
  completedTasks: number;
  pendingTasks: number;
  focusLevel: number;
}

export interface LifeData {
  user: UserStats;
  personalGoals: PersonalGoal[];
  people: Person[];
}
