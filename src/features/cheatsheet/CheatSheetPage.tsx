import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, AlertTriangle, Zap, Terminal, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getCheatSheet } from '@/data/cheatsheets';
import { useProgressStore } from '@/stores/useProgressStore';

const CheatSheetView = ({ dayNumber }: { dayNumber: number }) => {
  const navigate = useNavigate();
  const { startDay } = useProgressStore();
  const cheatSheet = getCheatSheet(dayNumber);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleStart();
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
        <AlertTriangle className="w-10 h-10 text-amber-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">No Cheat Sheet Available</h2>
        <p className="text-zinc-400 mb-6 text-sm">Day {dayNumber} content is coming soon.</p>
        <button onClick={handleStart} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
          Skip to Sprint <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 pb-28">
      {/* Simple top bar */}
      <div className="sticky top-0 z-20 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/roadmap')} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Roadmap
          </button>
          <span className="text-xs font-medium text-indigo-400">Day {dayNumber} · Quick Review</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/60 text-zinc-400 text-xs font-medium mb-3">
            <Clock className="w-3.5 h-3.5" /> {cheatSheet.readingTimeMinutes} min read
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">{cheatSheet.title}</h1>
          <div className="flex flex-wrap gap-2">
            {cheatSheet.topics.map((t: string) => (
              <span key={t} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/15">{t}</span>
            ))}
          </div>
        </div>

        {/* Sections */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">
          {cheatSheet.sections.map((section: any, idx: number) => {
            if (section.type === 'formulas') {
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-400" /> {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item: string, i: number) => (
                      <div key={i} className="bg-[#111113] border border-zinc-800/60 border-l-3 border-l-indigo-500 px-4 py-3 rounded-lg font-mono text-sm text-zinc-200">{item}</div>
                    ))}
                  </div>
                </motion.div>
              );
            }
            if (section.type === 'tricks') {
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> {section.title}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {section.items.map((item: string, i: number) => (
                      <div key={i} className="bg-emerald-500/5 border border-emerald-500/15 px-4 py-3 rounded-lg text-sm text-emerald-100/90 flex gap-2">
                        <span className="text-emerald-400 shrink-0">⚡</span><span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }
            if (section.type === 'patterns') {
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item: string, i: number) => (
                      <div key={i} className="bg-sky-500/5 border border-sky-500/15 px-4 py-3 rounded-lg text-sm text-sky-100/90">{item}</div>
                    ))}
                  </div>
                </motion.div>
              );
            }
            if (section.type === 'mistakes') {
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item: string, i: number) => (
                      <div key={i} className="bg-rose-500/5 border border-rose-500/15 px-4 py-3 rounded-lg text-sm text-rose-100/90 flex gap-2">
                        <span className="text-rose-400 shrink-0">⚠️</span><span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }
            if (section.type === 'table') {
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">{section.title}</h3>
                  <div className="border border-zinc-800/60 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-left min-w-[420px]">
                      <thead>
                        <tr className="bg-zinc-800/40">
                          {section.table?.headers.map((h: string, i: number) => (
                            <th key={i} className="px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/40">
                        {section.table?.rows.map((row: any[], i: number) => (
                          <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                            {row.map((cell: any, j: number) => (
                              <td key={j} className="px-4 py-2.5 text-sm text-zinc-300">{cell}</td>
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

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#09090B]/95 backdrop-blur-md border-t border-zinc-800/60 z-20">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500 hidden sm:block">Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 border border-zinc-700 font-mono text-[10px]">Enter</kbd> to start</span>
          <button onClick={handleStart} className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20">
            Start Day {dayNumber} Sprint <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export function CheatSheetPage() {
  const { day } = useParams();
  return <CheatSheetView dayNumber={parseInt(day || '1', 10)} />;
}
