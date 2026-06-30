// src/components/Timeline/TimelineView.tsx
import { useStore } from '../../store';
import { CalendarDays, Flag, Clock } from 'lucide-react';

export default function TimelineView() {
  // Mock timeline extraction for demonstration
  return (
    <div className="h-full w-full p-12 overflow-y-auto hide-scrollbar">
      <h1 className="text-4xl font-bold text-white mb-12">الخط الزمني</h1>
      
      <div className="relative border-r-2 border-dark-700 pr-8 space-y-12 max-w-4xl">
        
        <div className="relative">
          <div className="absolute -right-[41px] bg-primary-600 p-2 rounded-full border-4 border-dark-900">
            <Flag size={16} className="text-white" />
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <span className="text-primary-400 text-sm font-bold tracking-wider">اليوم</span>
            <h3 className="text-xl font-bold text-white mt-1">إطلاق النسخة التجريبية</h3>
            <p className="text-gray-400 text-sm mt-2">مراجعة الأداء النهائي مع محمد أحمد والتأكد من توافقية الموبايل.</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-[41px] bg-dark-700 p-2 rounded-full border-4 border-dark-900">
            <Clock size={16} className="text-gray-400" />
          </div>
          <div className="glass-panel p-6 rounded-2xl opacity-70">
            <span className="text-gray-400 text-sm font-bold tracking-wider">1 أغسطس 2026</span>
            <h3 className="text-xl font-bold text-white mt-1">إنهاء مكتبة PyTorch</h3>
            <p className="text-gray-400 text-sm mt-2">هدف شخصي: تدريب نموذج ذكاء اصطناعي للتحليل المالي.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
