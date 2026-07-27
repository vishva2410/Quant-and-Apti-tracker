import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, AlertTriangle, Zap, Terminal, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { getCheatSheet } from '@/data/cheatsheets';
import { useProgressStore } from '@/stores/useProgressStore';

const CheatSheetView = ({ dayNumber }: { dayNumber: number }) => {
  const navigate = useNavigate();
  const { startDay } = useProgressStore();
  const cheatSheet = getCheatSheet(dayNumber);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dayNumber]);

  const handleStart = () => {
    startDay(dayNumber);
    navigate(`/sprint/${dayNumber}/1`);
  };

  if (!cheatSheet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090B] text-zinc-100 p-6">
        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Cheat Sheet Found</h2>
        <p className="text-zinc-400 mb-6 text-sm">Cheat sheet for Day {dayNumber} is not available yet.</p>
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          Go Directly to Sprint
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 font-sans pb-32">
      {/* Top Header Nav */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/roadmap')}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Roadmap
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Day {dayNumber} High-Yield Prep
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 text-xs font-medium mb-4 border border-zinc-700/50">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            {cheatSheet.readingTimeMinutes} min key review
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-100 leading-tight">
            {cheatSheet.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {cheatSheet.topics.map((topic: string) => (
              <span key={topic} className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                {topic}
              </span>
            ))}
          </div>
        </header>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          {cheatSheet.sections.map((section: any, idx: number) => {
            if (section.type === 'formulas') {
              return (
                <motion.div key={idx} variants={itemVariants} className="space-y-3">
                  <h3 className="text-base font-bold text-zinc-200 flex items-center gap-2 tracking-wide uppercase text-xs font-mono">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    {section.title}
                  </h3>
                  <div className="grid gap-2.5">
                    {section.items.map((item: any, i: number) => (
                      <div 
                        key={i} 
                        className="bg-zinc-900 border border-zinc-800 border-l-4 border-l-indigo-500 p-3.5 rounded-r-xl font-mono text-sm text-zinc-200 leading-relaxed shadow-sm overflow-x-auto"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }

            if (section.type === 'tricks') {
              return (
                <motion.div key={idx} variants={itemVariants} className="space-y-3">
                  <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2 tracking-wide uppercase text-xs font-mono">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    {section.title}
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20 text-emerald-200/90 text-sm leading-relaxed flex items-start gap-3">
                        <span className="shrink-0 mt-0.5 text-emerald-400 font-bold">⚡</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }

            if (section.type === 'patterns') {
              return (
                <motion.div key={idx} variants={itemVariants} className="space-y-3">
                  <h3 className="text-base font-bold text-sky-400 flex items-center gap-2 tracking-wide uppercase text-xs font-mono">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    {section.title}
                  </h3>
                  <div className="grid gap-2.5">
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className="bg-sky-950/20 p-3.5 rounded-xl border border-sky-500/20 text-sky-200/90 text-sm leading-relaxed">
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }

            if (section.type === 'mistakes') {
              return (
                <motion.div key={idx} variants={itemVariants} className="space-y-3">
                  <h3 className="text-base font-bold text-rose-400 flex items-center gap-2 tracking-wide uppercase text-xs font-mono">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    {section.title}
                  </h3>
                  <div className="grid gap-2.5">
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className="bg-rose-950/20 p-3.5 rounded-xl border border-rose-500/20 text-rose-200/90 text-sm leading-relaxed flex items-start gap-3">
                        <span className="shrink-0 text-rose-400">⚠️</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }

            if (section.type === 'table') {
              return (
                <motion.div key={idx} variants={itemVariants} className="space-y-3">
                  <h3 className="text-base font-bold text-zinc-200 flex items-center gap-2 tracking-wide uppercase text-xs font-mono">
                    {section.title}
                  </h3>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60 shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-zinc-800/80 border-b border-zinc-700/80">
                          {section.table?.headers.map((h: string, i: number) => (
                            <th key={i} className="p-3 text-xs font-bold text-zinc-300 uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-sm">
                        {section.table?.rows.map((row: any[], i: number) => (
                          <tr key={i} className="hover:bg-zinc-800/40 transition-colors">
                            {row.map((cell: any, j: number) => (
                              <td key={j} className="p-3 text-zinc-300 font-mono text-xs">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </motion.div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800/80 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs text-zinc-400 hidden sm:block">
            Press <kbd className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-200 font-mono">Enter ↵</kbd> to start sprint
          </div>
          <button
            onClick={handleStart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-base transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 cursor-pointer ml-auto"
          >
            Start Day {dayNumber} Sprint
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export function CheatSheetPage() {
  const { day } = useParams();
  const dayNumber = parseInt(day || '1', 10);
  return <CheatSheetView dayNumber={dayNumber} />;
}
