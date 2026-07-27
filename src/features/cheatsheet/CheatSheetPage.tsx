import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, AlertTriangle, Zap, Terminal, ArrowRight } from 'lucide-react';
// cn not used
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
        <h2 className="text-2xl font-bold mb-4">No cheat sheet available</h2>
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
        >
          Go Directly to Sprint
        </button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 font-sans pb-32">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            {cheatSheet.readingTimeMinutes} min read
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {cheatSheet.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {cheatSheet.topics.map((topic: string) => (
              <span key={topic} className="px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20">
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
                  <h3 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    {section.title}
                  </h3>
                  <div className="grid gap-3">
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className="bg-[#18181B] p-4 rounded-xl border-l-4 border-[#6366F1] font-mono text-sm text-zinc-300 overflow-x-auto">
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
                  <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    {section.title}
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className="bg-emerald-500/10 p-4 rounded-xl border-l-2 border-emerald-500 text-emerald-100">
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }
            if (section.type === 'patterns') {
              return (
                <motion.div key={idx} variants={itemVariants} className="space-y-3">
                  <h3 className="text-lg font-bold text-sky-400">{section.title}</h3>
                  <div className="grid gap-3">
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20 text-sky-100">
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
                  <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {section.title}
                  </h3>
                  <ul className="grid gap-2">
                    {section.items.map((item: any, i: number) => (
                      <li key={i} className="bg-red-500/10 p-3 rounded-lg text-red-200 flex items-start gap-3">
                        <span className="shrink-0 mt-0.5">⚠️</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            }
            if (section.type === 'table') {
               return (
                <motion.div key={idx} variants={itemVariants} className="space-y-3 overflow-x-auto">
                  <h3 className="text-lg font-bold text-zinc-200">{section.title}</h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#18181B] border-b border-[#6366F1]">
                        {section.table?.headers.map((h: string, i: number) => (
                          <th key={i} className="p-3 text-sm font-semibold text-zinc-300">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-900/50">
                      {section.table?.rows.map((row: any[], i: number) => (
                        <tr key={i} className="hover:bg-zinc-800/50 transition-colors">
                          {row.map((cell: any, j: number) => (
                            <td key={j} className="p-3 text-sm text-zinc-400">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
               )
            }
            return null;
          })}
        </motion.div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#09090B] via-[#09090B] to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto flex justify-end">
          <button
            onClick={handleStart}
            className="pointer-events-auto flex items-center gap-2 px-8 py-4 bg-[#6366F1] hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] hover:-translate-y-1"
          >
            Start Day {dayNumber} Sprint
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export function CheatSheetPage() {
  const { dayId } = useParams();
  const dayNumber = parseInt(dayId || '1', 10);
  return <CheatSheetView dayNumber={dayNumber} />;
}
