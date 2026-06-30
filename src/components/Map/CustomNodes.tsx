// src/components/Map/CustomNodes.tsx
import { Handle, Position } from 'reactflow';
import { cn, getPriorityColor, getPriorityGlow } from '../Shared/Utils';
import { useStore } from '../../store';
import { User, Target, Users, Briefcase, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const CenterNode = ({ data }: any) => {
  const stats = useStore(state => state.data.user);
  
  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="relative flex flex-col items-center justify-center w-64 h-64 bg-dark-800/90 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_0_50px_rgba(99,102,241,0.3)] animate-glow-pulse"
    >
      <Handle type="source" position={Position.Top} className="opacity-0" id="top" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" id="bottom" />
      
      <div className="absolute inset-2 rounded-full border-4 border-t-primary-500 border-r-primary-500/30 border-b-primary-500/10 border-l-primary-500/30 rotate-45" />
      
      <div className="z-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-primary-600 to-purple-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
          <User size={36} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-wide">أنا</h1>
        <div className="mt-2 text-center">
          <div className="text-sm text-gray-400">الإنجاز العام</div>
          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
            {stats.generalProgress}%
          </div>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-400"/> {stats.focusLevel}% تركيز</span>
        </div>
      </div>
    </motion.div>
  );
};

export const PersonalGoalNode = ({ data }: any) => {
  return (
    <div className={cn(
      "glass-panel p-4 w-56 rounded-2xl flex flex-col gap-3 transition-transform hover:scale-105 cursor-pointer",
      getPriorityGlow(data.priority)
    )}>
      <Handle type="target" position={Position.Bottom} className="opacity-0" />
      <Handle type="source" position={Position.Top} className="opacity-0" />
      
      <div className="flex justify-between items-start">
        <div className={cn("p-2 rounded-lg", getPriorityColor(data.priority))}>
          <Target size={20} />
        </div>
        <span className="text-xs text-gray-400 font-semibold">{data.progress}%</span>
      </div>
      
      <div>
        <h3 className="font-bold text-white text-lg leading-tight">{data.name}</h3>
        <p className="text-xs text-gray-400 mt-1">{data.description}</p>
      </div>

      <div className="w-full bg-dark-900 rounded-full h-1.5 mt-1 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-primary-500 to-purple-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${data.progress}%` }}
        />
      </div>
    </div>
  );
};

export const PersonNode = ({ data }: any) => {
  return (
    <div className={cn(
      "glass-panel p-4 w-60 rounded-2xl flex gap-4 items-center transition-transform hover:scale-105 cursor-pointer",
      getPriorityGlow(data.priority)
    )}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      
      <div className="relative">
        <div className="w-14 h-14 bg-dark-700 rounded-full flex items-center justify-center border border-white/10">
          <Users size={24} className="text-gray-300" />
        </div>
        <div className={cn(
          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-dark-800",
          data.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
        )} />
      </div>
      
      <div className="flex-1">
        <h3 className="font-bold text-white">{data.name}</h3>
        <p className="text-xs text-primary-400">{data.role}</p>
        <div className="w-full bg-dark-900 rounded-full h-1 mt-2">
          <div className="bg-white h-full rounded-full" style={{ width: `${data.progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export const SharedGoalNode = ({ data }: any) => {
  return (
    <div className="glass-panel p-3 w-48 rounded-xl border-dashed border-2 hover:border-solid transition-all cursor-pointer">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      <div className="flex items-center gap-2 mb-2">
        <Briefcase size={16} className="text-gray-400" />
        <h4 className="text-sm font-bold text-white truncate">{data.name}</h4>
      </div>
      
      <div className="flex justify-between items-center text-xs">
        <span className={cn("px-2 py-0.5 rounded-full", getPriorityColor(data.priority))}>
          مهمة مشتركة
        </span>
        <span className="text-gray-400">{data.progress}%</span>
      </div>
    </div>
  );
}
