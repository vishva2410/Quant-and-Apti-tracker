import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Map, Lock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DAY_TOPICS } from '@/config/constants';
import { useProgressStore } from '@/stores/useProgressStore';

export function RoadmapPage() {
  const navigate = useNavigate();
  const { dailyProgress } = useProgressStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const getStatus = (dayNum: number) => {
    return dailyProgress.find(d => d.dayNumber === dayNum)?.status || 'locked';
  };

  const handleCardClick = (dayNum: number, status: string) => {
    if (status === 'locked') return;
    if (status === 'completed') {
      navigate(`/results/day/${dayNum}`);
    } else {
      navigate(`/cheatsheet/${dayNum}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-800">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Map className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Placement Roadmap</h1>
            <p className="text-zinc-400 mt-1">30 days to mastery</p>
          </div>
        </header>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-800" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {Object.entries(DAY_TOPICS).map(([dayNumStr, dayInfo]) => {
              const dayNum = parseInt(dayNumStr);
              const status = getStatus(dayNum);
              
              return (
                <motion.div key={dayNum} variants={itemVariants} className="relative flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className={cn(
                    "relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-[#09090B] shrink-0 font-bold",
                    status === 'completed' && "bg-emerald-500 text-[#09090B]",
                    status === 'in-progress' && "bg-[#6366F1] text-white animate-pulse shadow-[0_0_20px_rgba(99,102,241,0.5)]",
                    status === 'available' && "bg-zinc-800 text-white border-indigo-500",
                    status === 'locked' && "bg-zinc-900 text-zinc-600"
                  )}>
                    {status === 'completed' ? <CheckCircle2 className="w-8 h-8" /> : `D${dayNum}`}
                  </div>

                  {/* Content Card */}
                  <div
                    onClick={() => handleCardClick(dayNum, status)}
                    className={cn(
                      "flex-1 p-6 rounded-2xl bg-[#18181B] border transition-all duration-300 group",
                      status === 'locked' ? "border-zinc-800 opacity-60 cursor-not-allowed" : "border-zinc-800 hover:border-indigo-500/50 cursor-pointer hover:bg-[#1c1c20]",
                      status === 'in-progress' && "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]",
                    )}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className={cn("text-xl font-bold", status === 'locked' ? "text-zinc-500" : "text-zinc-100")}>
                          {dayInfo.title}
                        </h3>
                        <p className="text-zinc-400 mt-1">{dayInfo.description}</p>
                      </div>
                      <div className="shrink-0 ml-4 text-zinc-500 group-hover:text-indigo-400 transition-colors">
                        {status === 'locked' ? <Lock className="w-5 h-5" /> : <ChevronRight className="w-6 h-6" />}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {dayInfo.topics.map((topic, i) => (
                        <span key={i} className={cn(
                          "px-3 py-1 text-xs font-medium rounded-full",
                          status === 'locked' ? "bg-zinc-800/50 text-zinc-600" : "bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 transition-colors"
                        )}>
                          {topic}
                        </span>
                      ))}
                    </div>

                    {status === 'in-progress' && (
                      <div className="mt-5 flex items-center gap-2 text-indigo-400 text-sm font-medium">
                        <Zap className="w-4 h-4" fill="currentColor" />
                        <span>Ready to start</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
