import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Flame,
  Zap,
  Target,
  Clock,
  TrendingUp,
  ChevronRight,
  Play,
  CheckCircle2,
  Lock,
  Trophy,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { cn, formatTimeVerbose, getAccuracyColor } from '@/lib/utils';
import { useProgressStore } from '@/stores/useProgressStore';
import { DAY_TOPICS, SPRINTS_PER_DAY } from '@/config/constants';

export function DashboardPage() {
  const navigate = useNavigate();
  const {
    currentDay,
    dailyProgress,
    totalXP,
    level,
    currentStreak,
    longestStreak,
    initializeProgress,
  } = useProgressStore();

  useEffect(() => {
    initializeProgress();
  }, [initializeProgress]);

  const stats = useMemo(() => {
    const completed = dailyProgress.filter(d => d.status === 'completed');
    const totalQuestions = completed.reduce((sum, d) => sum + d.totalQuestions, 0);
    const totalCorrect = completed.reduce((sum, d) => sum + Math.round(d.accuracy * d.totalQuestions / 100), 0);
    const totalTime = completed.reduce((sum, d) => sum + d.totalTime, 0);
    const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    return { totalQuestions, totalCorrect, totalTime, overallAccuracy, daysCompleted: completed.length };
  }, [dailyProgress]);

  const todayProgress = dailyProgress.find(d => d.dayNumber === currentDay);
  const todayTopics = DAY_TOPICS[currentDay];

  const handleStartDay = () => {
    navigate(`/cheatsheet/${currentDay}`);
  };

  const handleContinueDay = () => {
    const nextSprint = todayProgress?.sprints.findIndex(s => s.status !== 'completed');
    const sprintNum = nextSprint !== undefined && nextSprint >= 0 ? nextSprint + 1 : 1;
    navigate(`/sprint/${currentDay}/${sprintNum}`);
  };

  // Calendar heatmap data
  const heatmapData = Array.from({ length: 30 }, (_, i) => {
    const day = dailyProgress[i];
    return {
      day: i + 1,
      status: day?.status || 'locked',
      accuracy: day?.accuracy || 0,
    };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#71717A] mt-1">Day {currentDay} of 30 — Keep pushing.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Flame size={16} className="text-orange-400" />
            <span className="text-sm font-bold text-orange-400">{currentStreak}</span>
          </div>
        </div>
      </div>

      {/* Today's Mission Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6366F1]/20 via-[#18181B] to-[#18181B] border border-[#6366F1]/20 p-6"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366F1]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Target size={16} className="text-[#6366F1]" />
            <span className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider">Today's Mission</span>
          </div>
          <h2 className="text-xl font-bold text-[#FAFAFA] mb-1">
            Day {currentDay}: {todayTopics?.title || 'Training Day'}
          </h2>
          <p className="text-sm text-[#A1A1AA] mb-4">{todayTopics?.description}</p>

          {/* Sprint progress dots */}
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: SPRINTS_PER_DAY }, (_, i) => {
              const sprint = todayProgress?.sprints[i];
              const isCompleted = sprint?.status === 'completed';
              const isActive = sprint?.status === 'in-progress';
              return (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    isCompleted && 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20',
                    isActive && 'bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/30 accent-glow',
                    !isCompleted && !isActive && 'bg-[#18181B] text-[#71717A] border border-[#27272A]'
                  )}
                >
                  {isCompleted ? <CheckCircle2 size={12} /> : <span className="w-3 h-3 rounded-full bg-current opacity-30" />}
                  S{i + 1}
                </div>
              );
            })}
          </div>

          <button
            onClick={todayProgress?.status === 'in-progress' ? handleContinueDay : handleStartDay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-sm transition-all duration-200 accent-glow hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play size={16} />
            {todayProgress?.status === 'in-progress' ? 'Continue Training' : 'Start Day'}
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'XP Earned', value: totalXP.toLocaleString(), icon: Zap, color: 'text-[#6366F1]', bg: 'bg-[#6366F1]/10' },
          { label: 'Accuracy', value: `${stats.overallAccuracy}%`, icon: Target, color: getAccuracyColor(stats.overallAccuracy), bg: 'bg-[#22C55E]/10' },
          { label: 'Time Invested', value: formatTimeVerbose(stats.totalTime), icon: Clock, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
          { label: 'Level', value: `Lvl ${level}`, icon: Trophy, color: 'text-[#818CF8]', bg: 'bg-[#818CF8]/10' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition-colors"
          >
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-3', stat.bg)}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className={cn('text-xl font-bold', stat.color)}>{stat.value}</div>
            <div className="text-xs text-[#71717A] mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Calendar Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-xl bg-[#18181B] border border-[#27272A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-[#6366F1]" />
            <h3 className="text-sm font-semibold text-[#FAFAFA]">30-Day Progress</h3>
            <span className="ml-auto text-xs text-[#71717A]">{stats.daysCompleted}/30 completed</span>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {heatmapData.map((cell) => (
              <div
                key={cell.day}
                className={cn(
                  'aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all cursor-default',
                  cell.status === 'completed' && cell.accuracy >= 80 && 'bg-[#22C55E]/30 text-[#22C55E] border border-[#22C55E]/20',
                  cell.status === 'completed' && cell.accuracy >= 50 && cell.accuracy < 80 && 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/20',
                  cell.status === 'completed' && cell.accuracy < 50 && 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/20',
                  cell.status === 'in-progress' && 'bg-[#6366F1]/20 text-[#818CF8] border border-[#6366F1]/30 accent-glow',
                  cell.status === 'available' && 'bg-[#27272A] text-[#A1A1AA] border border-[#3F3F46]',
                  cell.status === 'locked' && 'bg-[#0F0F12] text-[#3F3F46] border border-[#1E1E23]',
                  cell.day === currentDay && cell.status !== 'completed' && 'ring-1 ring-[#6366F1]/50'
                )}
                title={`Day ${cell.day}: ${cell.status}${cell.accuracy > 0 ? ` (${cell.accuracy}%)` : ''}`}
              >
                {cell.status === 'locked' ? <Lock size={10} /> : cell.day}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Streak & Progress */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-4"
        >
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-[#6366F1]" />
            <h3 className="text-sm font-semibold text-[#FAFAFA]">Quick Stats</h3>
          </div>

          {[
            { label: 'Questions Solved', value: stats.totalQuestions, max: 1500, icon: Target },
            { label: 'Days Completed', value: stats.daysCompleted, max: 30, icon: Calendar },
            { label: 'Current Streak', value: currentStreak, max: longestStreak || 30, icon: Flame },
            { label: 'Longest Streak', value: longestStreak, max: 30, icon: TrendingUp },
          ].map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <item.icon size={12} className="text-[#71717A]" />
                  <span className="text-xs text-[#A1A1AA]">{item.label}</span>
                </div>
                <span className="text-xs font-bold text-[#FAFAFA]">{item.value}</span>
              </div>
              <div className="h-1.5 bg-[#27272A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#6366F1] to-[#818CF8] rounded-full"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Recent achievements */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-5 rounded-xl bg-[#18181B] border border-[#27272A]"
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={16} className="text-[#F59E0B]" />
          <h3 className="text-sm font-semibold text-[#FAFAFA]">Achievements</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {[
            { icon: '⚡', name: 'First Sprint', locked: stats.totalQuestions === 0 },
            { icon: '☀️', name: 'First Day', locked: stats.daysCompleted === 0 },
            { icon: '🔥', name: '3-Day Streak', locked: longestStreak < 3 },
            { icon: '⭐', name: 'Perfect Sprint', locked: true },
            { icon: '🎯', name: 'Century', locked: stats.totalQuestions < 100 },
            { icon: '⏱️', name: 'Speed Demon', locked: true },
            { icon: '👑', name: 'Perfect Day', locked: true },
            { icon: '💼', name: 'Interview Ready', locked: stats.overallAccuracy < 80 },
          ].map((ach) => (
            <div
              key={ach.name}
              className={cn(
                'p-3 rounded-lg border text-center transition-all',
                ach.locked
                  ? 'bg-[#0F0F12] border-[#1E1E23] opacity-40'
                  : 'bg-[#F59E0B]/5 border-[#F59E0B]/20'
              )}
            >
              <span className="text-lg">{ach.icon}</span>
              <p className="text-[10px] font-medium text-[#A1A1AA] mt-1">{ach.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
