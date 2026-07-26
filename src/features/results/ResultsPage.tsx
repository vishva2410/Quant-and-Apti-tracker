import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, Clock, Zap, ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/stores/useProgressStore';
import { useQuizStore } from '@/stores/useQuizStore';
import { SPRINTS_PER_DAY } from '@/config/constants';

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

export function ResultsPage() {
  const { dayId, sprintId } = useParams();
  const navigate = useNavigate();
  const dayNum = parseInt(dayId || '1', 10);
  const sprintNum = parseInt(sprintId || '1', 10);
  
  const { dailyProgress } = useProgressStore();
  const { answers } = useQuizStore();

  const isLastSprint = sprintNum >= SPRINTS_PER_DAY;
  
  const dayProgress = dailyProgress.find(d => d.dayNumber === dayNum);
  const sprintResult = dayProgress?.sprints.find(s => s.sprintNumber === sprintNum);

  const score = sprintResult?.score || 0;
  const totalQuestions = sprintResult?.totalQuestions || 0;
  const timeTaken = sprintResult?.timeSpent || 0;

  const accuracy = Math.round((score / totalQuestions) * 100) || 0;
  
  const correct = answers.filter(a => a.isCorrect).length;
  const skipped = answers.filter(a => a.isSkipped).length;
  const wrong = totalQuestions - correct - skipped;

  const handleNext = () => {
    if (isLastSprint) {
      navigate(`/results/day/${dayNum}`);
    } else {
      navigate(`/break/${dayNum}/${sprintNum + 1}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 p-6 flex flex-col items-center justify-center font-sans">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl bg-[#18181B] rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div variants={itemVariants} className="text-center relative z-10">
          <h1 className="text-2xl font-bold text-zinc-400 mb-2">Sprint {sprintNum} Complete</h1>
          <div className="text-7xl md:text-8xl font-black text-white my-6 flex items-center justify-center gap-4">
            <AnimatedCounter value={score} /><span className="text-4xl text-zinc-500">/ {totalQuestions}</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-2 text-indigo-400 font-semibold">
              <Target className="w-5 h-5" />
              {accuracy}% Accuracy
            </div>
            <div className="px-4 py-2 bg-zinc-800/50 rounded-xl flex items-center gap-2 text-zinc-300 font-semibold">
              <Clock className="w-5 h-5" />
              {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}
            </div>
            <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2 text-amber-400 font-semibold">
              <Zap className="w-5 h-5" />
              +<AnimatedCounter value={score * 10} /> XP
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8 relative z-10">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
            <div className="text-emerald-400 text-sm font-semibold mb-1">Correct</div>
            <div className="text-2xl font-bold text-emerald-50">{correct}</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
            <div className="text-red-400 text-sm font-semibold mb-1">Wrong</div>
            <div className="text-2xl font-bold text-red-50">{wrong}</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 text-center">
            <div className="text-zinc-400 text-sm font-semibold mb-1">Skipped</div>
            <div className="text-2xl font-bold text-zinc-200">{skipped}</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-10 relative z-10">
          <h3 className="text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wider text-center">Question Summary</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {answers.map((ans, i) => (
              <div 
                key={i}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border",
                  ans.isCorrect ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" :
                  ans.isSkipped ? "bg-zinc-800 border-zinc-600 text-zinc-400" :
                  "bg-red-500/20 border-red-500 text-red-400"
                )}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-4 relative z-10">
          <button
            onClick={handleNext}
            className="w-full py-4 bg-[#6366F1] hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLastSprint ? 'View Day Results' : `Take Break → Sprint ${sprintNum + 1}`}
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => navigate('/review')}
            className="w-full py-3 bg-transparent hover:bg-zinc-800 text-zinc-300 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-zinc-800"
          >
            <BookOpen className="w-5 h-5" />
            Review Wrong Answers
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
