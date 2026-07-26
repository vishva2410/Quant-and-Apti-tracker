import { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, Bookmark, RefreshCw, AlertCircle, Clock, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
// Mock store & data imports since they might not exist yet
// import { useReviewStore } from '@/stores/useReviewStore';
// import { getQuestionById } from '@/data/questions';

const MOCK_ITEMS = [
  { id: '1', question: 'A train 150m long is running with a speed of 68 kmph...', topic: 'Time & Distance', difficulty: 'Hard', company: 'TCS', tags: ['wrong', 'slow'], retryCount: 2 },
  { id: '2', question: 'If 20% of a = b, then b% of 20 is the same as...', topic: 'Percentages', difficulty: 'Medium', company: 'Infosys', tags: ['flagged', 'bookmarked'], retryCount: 0 },
];

export function ReviewPage() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Wrong', 'Skipped', 'Flagged', 'Slow', 'Bookmarked'];

  const items = MOCK_ITEMS; // useReviewStore(s => s.items)

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-indigo-500" />
              Interview Vault
            </h1>
            <p className="text-zinc-400">Review your mistakes and flagged questions</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-[#18181B] border border-zinc-800 rounded-xl p-3 flex flex-col items-center min-w-[100px]">
              <span className="text-zinc-500 text-xs font-semibold uppercase">Total Items</span>
              <span className="text-xl font-bold text-white">{items.length}</span>
            </div>
            <div className="bg-[#18181B] border border-zinc-800 rounded-xl p-3 flex flex-col items-center min-w-[100px]">
              <span className="text-zinc-500 text-xs font-semibold uppercase">Retry Rate</span>
              <span className="text-xl font-bold text-indigo-400">45%</span>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 gap-2 no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeTab === tab 
                    ? "bg-indigo-600 text-white" 
                    : "bg-[#18181B] text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-[#18181B] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-zinc-500" />
              <select className="bg-transparent border-none outline-none w-full text-zinc-300 cursor-pointer">
                <option>All Topics</option>
                <option>Quant</option>
                <option>Logical</option>
              </select>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-[#18181B] rounded-2xl border border-zinc-800">
              <Target className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-300 mb-2">No items to review</h3>
              <p className="text-zinc-500">Complete some sprints to populate your vault!</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={item.id} 
                className="bg-[#18181B] border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 text-xs font-medium">{item.topic}</span>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      item.difficulty === 'Hard' ? "bg-red-500/10 text-red-400" :
                      item.difficulty === 'Medium' ? "bg-amber-500/10 text-amber-400" :
                      "bg-emerald-500/10 text-emerald-400"
                    )}>{item.difficulty}</span>
                    <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-medium">{item.company}</span>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-200 mb-4 line-clamp-2">{item.question}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.includes('wrong') && <span className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded"><AlertCircle className="w-3 h-3"/> Wrong</span>}
                    {item.tags.includes('slow') && <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded"><Clock className="w-3 h-3"/> Slow</span>}
                    {item.tags.includes('flagged') && <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded"><Target className="w-3 h-3"/> Flagged</span>}
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 md:border-l md:border-zinc-800 md:pl-6 shrink-0">
                  <div className="text-center hidden md:block">
                    <div className="text-xs text-zinc-500 uppercase font-semibold mb-1">Retries</div>
                    <div className="text-xl font-bold text-zinc-300">{item.retryCount}</div>
                  </div>
                  
                  <div className="flex gap-2 w-full">
                    <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-colors shrink-0">
                      <Bookmark className={cn("w-5 h-5", item.tags.includes('bookmarked') && "fill-indigo-500 text-indigo-500")} />
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
                      <Zap className="w-4 h-4" />
                      Retry
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
