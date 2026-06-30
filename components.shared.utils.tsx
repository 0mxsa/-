// src/components/Shared/Utils.tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PriorityLevel } from '../../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPriorityColor = (priority: PriorityLevel) => {
  switch (priority) {
    case 'urgent': return 'text-priority-urgent bg-priority-urgent/10 border-priority-urgent/30';
    case 'high': return 'text-priority-high bg-priority-high/10 border-priority-high/30';
    case 'medium': return 'text-priority-medium bg-priority-medium/10 border-priority-medium/30';
    case 'low': return 'text-priority-low bg-priority-low/10 border-priority-low/30';
  }
};

export const getPriorityGlow = (priority: PriorityLevel) => {
  switch (priority) {
    case 'urgent': return 'drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]';
    case 'high': return 'drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]';
    case 'medium': return 'drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]';
    case 'low': return 'drop-shadow-[0_0_5px_rgba(59,130,246,0.2)]';
  }
};
