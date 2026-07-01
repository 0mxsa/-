// src/components/Dashboard/DailyDashboard.tsx
import { useStore } from '../../store';
import { CheckCircle2, Clock, Flame, AlertCircle } from 'lucide-react';

export default function DailyDashboard() {
  const data = useStore(state => state.data);
  const urgentTasks = data.personalGoals.flatMap(g => g.subTasks).filter(t => t.priority === 'urgent' && t.status !== 'completed');

  return (
    <div className="h-full w-full p-8 overflow-y-auto hide-scrollbar text-white">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">لوحة التحكم اليومية</h1>
        <p className="text-gray-400">نظرة عامة على أولويات اليوم والمهام العاجلة.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'المهام المنجزة', value: data.user.completedTasks, icon: CheckCircle2, color: 'text-green-400' },
          { label: 'مهام قيد الانتظار', value: data.user.pendingTasks, icon: Clock, color: 'text-blue-400' },
          { label: 'مستوى الإنتاجية', value: `${data.user.productivityRate}%`, icon: Flame, color: 'text-orange-400' },
          { label: 'مهام متأخرة', value: 2, icon: AlertCircle, color: 'text-red-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
            <stat.icon size={32} className={stat.color} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" />
              أولويات اليوم القصوى
            </h2>
            <div className="space-y-4">
              {urgentTasks.map(task => (
                <div key={task.id} className="bg-dark-900/50 p-4 rounded-xl flex items-center justify-between border border-white/5 hover:border-red-500/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-500 cursor-pointer hover:bg-white/10" />
                    <div>
                      <h4 className="font-semibold">{task.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">الموعد النهائي: {task.deadline}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                    عاجل جداً
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">اقتراحات الذكاء الاصطناعي</h2>
            <div className="space-y-3">
              {data.personalGoals[0].aiSuggestions.map((sug, i) => (
                <div key={i} className="flex gap-3 items-start bg-primary-900/20 p-4 rounded-xl border border-primary-500/20">
                  <BrainCircuit className="text-primary-400 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-gray-200 leading-relaxed">{sug}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-bold mb-4">الأهداف النشطة</h2>
            <div className="space-y-5">
              {data.personalGoals.map(goal => (
                <div key={goal.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{goal.name}</span>
                    <span className="text-primary-400">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-primary-500 h-full rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
