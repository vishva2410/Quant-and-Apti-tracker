import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Brain, Heart } from 'lucide-react';
import { useQuizStore } from '@/stores/useQuizStore';

export function BreakPage() {
  const { dayId, nextSprintId } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
  const { answers } = useQuizStore();

  const score = answers.filter(a => a.isCorrect).length;
  const totalQuestions = answers.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/sprint/${dayId}/${nextSprintId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, dayId, nextSprintId]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* CSS Animation for breathing */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
        }
        .breathe-circle {
          animation: breathe 8s ease-in-out infinite;
        }
      `}} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500 rounded-full blur-[120px] breathe-circle pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center text-center max-w-md w-full"
      >
        <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm mb-12 w-full flex justify-around">
           <div className="text-center">
             <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Last Sprint</div>
             <div className="text-xl font-bold text-white">{score}/{totalQuestions}</div>
           </div>
           <div className="w-px bg-zinc-800" />
           <div className="text-center">
             <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Accuracy</div>
             <div className="text-xl font-bold text-indigo-400">{totalQuestions > 0 ? Math.round((score/totalQuestions)*100) : 0}%</div>
           </div>
        </div>

        <Heart className="w-12 h-12 text-indigo-400 mb-6 animate-pulse" />
        
        <h1 className="text-3xl font-bold mb-2">Time for a quick break</h1>
        <p className="text-zinc-400 mb-12">Rest your eyes, stretch, and take deep breaths.</p>

        <div className="text-8xl font-black text-white mb-12 font-mono tracking-tighter">
          {minutes}:{seconds}
        </div>

        <div className="flex items-center gap-3 text-zinc-400 font-medium">
          <Brain className="w-5 h-5" />
          <span>Sprint {nextSprintId} starts automatically</span>
        </div>
      </motion.div>
    </div>
  );
}
