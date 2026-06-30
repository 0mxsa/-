// src/store.ts
import { create } from 'zustand';
import { LifeData, PriorityLevel } from './types';

interface StoreState {
  data: LifeData;
  searchQuery: string;
  activeFilter: PriorityLevel | 'all';
  setSearchQuery: (q: string) => void;
  setActiveFilter: (f: PriorityLevel | 'all') => void;
  updateProgress: (id: string, progress: number) => void;
}

const mockData: LifeData = {
  user: {
    generalProgress: 68,
    productivityRate: 85,
    weeklyProgress: 72,
    monthlyProgress: 65,
    completedTasks: 142,
    pendingTasks: 38,
    focusLevel: 90,
  },
  personalGoals: [
    {
      id: 'g1',
      name: 'تعلم الذكاء الاصطناعي',
      description: 'بناء وتدريب النماذج اللغوية',
      progress: 45,
      priority: 'urgent',
      deadline: '2026-12-30',
      difficulty: 'hard',
      estimatedHours: 200,
      streakDays: 14,
      aiSuggestions: ['ابدأ بفهم الـ Transformers اليوم', 'راجع كود مشروعك الأخير'],
      subTasks: [
        { id: 't1', name: 'أساسيات Python', progress: 100, priority: 'low', deadline: '2026-05-01', status: 'completed', estimatedHours: 20 },
        { id: 't2', name: 'مكتبة PyTorch', progress: 30, priority: 'high', deadline: '2026-08-01', status: 'in_progress', estimatedHours: 50 },
      ]
    },
    {
      id: 'g2',
      name: 'الصحة واللياقة',
      description: 'الجري 5كم يومياً',
      progress: 80,
      priority: 'high',
      deadline: '2026-12-31',
      difficulty: 'medium',
      estimatedHours: 365,
      streakDays: 42,
      aiSuggestions: ['لا تنسَ تمرين الإطالة اليوم'],
      subTasks: []
    }
  ],
  people: [
    {
      id: 'p1',
      name: 'محمد أحمد',
      role: 'مطور واجهات',
      description: 'شريك في منصة التعليم',
      phone: '+9647700000000',
      email: 'mohamed@example.com',
      progress: 60,
      priority: 'urgent',
      status: 'active',
      sharedGoals: [
        {
          id: 'sg1',
          name: 'إطلاق النسخة التجريبية',
          progress: 75,
          priority: 'urgent',
          deadline: '2026-07-15',
          aiSuggestions: ['تحقق من أداء الموقع على الموبايل'],
          tasks: [
            { id: 'st1', name: 'تصميم الواجهة', progress: 100, priority: 'high', deadline: '2026-06-01', status: 'completed', estimatedHours: 40 },
            { id: 'st2', name: 'ربط الـ API', progress: 50, priority: 'urgent', deadline: '2026-07-01', status: 'in_progress', estimatedHours: 30 },
          ]
        }
      ]
    },
    {
      id: 'p2',
      name: 'سارة خالد',
      role: 'صانعة محتوى',
      description: 'إدارة قناة اليوتيوب',
      phone: '+9647800000000',
      email: 'sara@example.com',
      progress: 30,
      priority: 'medium',
      status: 'waiting',
      sharedGoals: [
        {
          id: 'sg2',
          name: 'خطة محتوى الربع الثالث',
          progress: 30,
          priority: 'medium',
          deadline: '2026-08-01',
          aiSuggestions: ['عقد اجتماع لتحديد الأفكار'],
          tasks: []
        }
      ]
    }
  ]
};

export const useStore = create<StoreState>((set) => ({
  data: mockData,
  searchQuery: '',
  activeFilter: 'all',
  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveFilter: (f) => set({ activeFilter: f }),
  updateProgress: (id, progress) => set((state) => {
    // In a real app, deeply update the state
    return state;
  }),
}));
