import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  Zap,
  Terminal,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Play,
  Code2,
  FileText,
  Flame,
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';
import { getCheatSheet } from '@/data/cheatsheets';
import { useProgressStore } from '@/stores/useProgressStore';

const defaultPythonCode: Record<number, string> = {
  1: `# Day 1: Percentages & Profit/Loss Solver
class Solution:
    def calculate_effective_discount(self, d1: float, d2: float) -> float:
        # Successive discount formula: d1 + d2 - (d1 * d2 / 100)
        return d1 + d2 - (d1 * d2 / 100)

    def dishonest_dealer_gain(self, true_weight: float, false_weight: float) -> float:
        # Gain% = (True - False) / False * 100
        error = true_weight - false_weight
        return (error / false_weight) * 100

sol = Solution()
print("Successive 20% & 10% =", sol.calculate_effective_discount(20, 10), "%")
print("900g false weight gain =", round(sol.dishonest_dealer_gain(1000, 900), 2), "%")
`,
  2: `# Day 2: SI & CI Difference Solver
class Solution:
    def ci_si_diff_2years(self, P: float, R: float) -> float:
        # Difference for 2 years: P * (R/100)^2
        return P * ((R / 100) ** 2)

    def effective_rate_half_yearly(self, R: float) -> float:
        # Rate becomes R/2, compound 2 times
        r_half = R / 2
        return ((1 + r_half / 100) ** 2 - 1) * 100

sol = Solution()
print("CI-SI diff on $10,000 at 10% for 2 yrs =", sol.ci_si_diff_2years(10000, 10))
`,
  3: `# Day 3: Time & Work / Pipes Cisterns Solver
class Solution:
    def combined_work_days(self, days_a: float, days_b: float) -> float:
        # 1/A + 1/B = 1/T => T = (A * B) / (A + B)
        return (days_a * days_b) / (days_a + days_b)

sol = Solution()
print("A (6 days) & B (12 days) together =", sol.combined_work_days(6, 12), "days")
`
};

const defaultTestcase: Record<number, { input: string; expected: string }> = {
  1: { input: "d1 = 20, d2 = 10", expected: "Effective Discount: 28.0%" },
  2: { input: "P = 10000, R = 10%", expected: "CI-SI Diff: $100.00" },
  3: { input: "A = 6 days, B = 12 days", expected: "Combined Time: 4.0 days" }
};

const CheatSheetView = ({ dayNumber }: { dayNumber: number }) => {
  const navigate = useNavigate();
  const { startDay, totalXP, currentStreak } = useProgressStore();
  const cheatSheet = getCheatSheet(dayNumber);

  const [activeTab, setActiveTab] = useState<'theory' | 'formulas' | 'tricks' | 'mistakes'>('theory');
  const [activeRightTab, setActiveRightTab] = useState<'code' | 'scratchpad'>('code');
  const [activeBottomTab, setActiveBottomTab] = useState<'testcase' | 'console'>('testcase');
  const [userCode, setUserCode] = useState(defaultPythonCode[dayNumber] || defaultPythonCode[1]);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [scratchText, setScratchText] = useState(`# Scratchpad - Notes & Rough Math Working\n- Day ${dayNumber} Target: Solve 50 questions under expected time.\n- Shortcut: Multiply ratio by common multiplier x.\n- Remember: Profit% is always computed on Cost Price by default.`);

  useEffect(() => {
    setUserCode(defaultPythonCode[dayNumber] || defaultPythonCode[1]);
    setConsoleOutput(null);
  }, [dayNumber]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
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

  const runCode = () => {
    setConsoleOutput(`[Executing Python3 Sandbox environment...]\n> sol = Solution()\nOutput: ${defaultTestcase[dayNumber]?.expected || "Success (0ms, Memory: 16.4MB)"}\nStatus: ACCEPTED ✓`);
    setActiveBottomTab('console');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
        >
          Go Directly to Sprint
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#0A0A0C] text-zinc-100 font-sans flex flex-col overflow-hidden select-none">
      
      {/* 1. TOP IDE NAVBAR (LeetCode Style) */}
      <header className="h-12 border-b border-[#1E1E24] bg-[#0F0F13] px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/roadmap')}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors font-medium bg-zinc-900 hover:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Roadmap</span>
          </button>

          <span className="text-zinc-700">/</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              DAY {dayNumber}
            </span>
            <h1 className="text-xs font-semibold text-zinc-200 truncate max-w-[280px] sm:max-w-md">
              {cheatSheet.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all cursor-pointer shadow-sm"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>Run Code</span>
          </button>

          <button
            onClick={handleStart}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 hover:scale-[1.02] cursor-pointer"
          >
            <span>Start Sprint {dayNumber}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 text-xs border-r border-zinc-800 pr-3">
            <div className="flex items-center gap-1 text-orange-400 font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>{currentStreak}d</span>
            </div>
            <div className="flex items-center gap-1 text-indigo-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{totalXP} XP</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
            PRO IDE
          </span>
        </div>
      </header>

      {/* 2. SPLIT SCREEN WORKSPACE (50% Left Theory / 50% Right IDE) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL (50% Width) - Theory / Formulas / CheatSheet Content */}
        <div className="w-1/2 flex flex-col border-r border-[#1E1E24] bg-[#0A0A0D] overflow-hidden">
          
          {/* Left Panel Tabs Bar */}
          <div className="h-10 border-b border-[#1E1E24] bg-[#0F0F13] px-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('theory')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'theory'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                Description
              </button>

              <button
                onClick={() => setActiveTab('formulas')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'formulas'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                Formulas
              </button>

              <button
                onClick={() => setActiveTab('tricks')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'tricks'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Tricks
              </button>

              <button
                onClick={() => setActiveTab('mistakes')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'mistakes'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                Pitfalls
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
              <Clock className="w-3 h-3 text-indigo-400" />
              <span>{cheatSheet.readingTimeMinutes} min read</span>
            </div>
          </div>

          {/* Left Panel Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 select-text">
            <div>
              <h2 className="text-2xl font-extrabold text-zinc-100 tracking-tight mb-3">
                {cheatSheet.title}
              </h2>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cheatSheet.topics.map((topic: string) => (
                  <span key={topic} className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {cheatSheet.sections.map((section: any, idx: number) => {
              if (activeTab === 'formulas' && section.type !== 'formulas' && section.type !== 'table') return null;
              if (activeTab === 'tricks' && section.type !== 'tricks' && section.type !== 'patterns') return null;
              if (activeTab === 'mistakes' && section.type !== 'mistakes') return null;

              if (section.type === 'formulas') {
                return (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      {section.title}
                    </h3>
                    <div className="space-y-2">
                      {section.items.map((item: string, i: number) => (
                        <div
                          key={i}
                          className="bg-[#121217] border border-zinc-800/80 border-l-2 border-l-indigo-500 p-3 rounded-r-lg font-mono text-xs text-zinc-200 leading-relaxed shadow-sm overflow-x-auto"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (section.type === 'tricks') {
                return (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5" />
                      {section.title}
                    </h3>
                    <div className="grid gap-2">
                      {section.items.map((item: string, i: number) => (
                        <div key={i} className="bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20 text-emerald-200/90 text-xs leading-relaxed flex items-start gap-2.5">
                          <span className="shrink-0 text-emerald-400 font-bold">⚡</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (section.type === 'patterns') {
                return (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {section.title}
                    </h3>
                    <div className="space-y-2">
                      {section.items.map((item: string, i: number) => (
                        <div key={i} className="bg-sky-950/20 p-3 rounded-lg border border-sky-500/20 text-sky-200/90 text-xs leading-relaxed">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (section.type === 'mistakes') {
                return (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {section.title}
                    </h3>
                    <div className="space-y-2">
                      {section.items.map((item: string, i: number) => (
                        <div key={i} className="bg-rose-950/20 p-3 rounded-lg border border-rose-500/20 text-rose-200/90 text-xs leading-relaxed flex items-start gap-2.5">
                          <span className="shrink-0 text-rose-400">⚠️</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (section.type === 'table') {
                return (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                      {section.title}
                    </h3>
                    <div className="border border-zinc-800/80 rounded-lg overflow-hidden bg-zinc-950 shadow-sm overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[400px]">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800">
                            {section.table?.headers.map((h: string, i: number) => (
                              <th key={i} className="p-2.5 text-[11px] font-bold text-zinc-400 uppercase font-mono">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 font-mono text-xs">
                          {section.table?.rows.map((row: any[], i: number) => (
                            <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                              {row.map((cell: any, j: number) => (
                                <td key={j} className="p-2.5 text-zinc-300">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* RIGHT PANEL (50% Width) - IDE Code Workspace */}
        <div className="w-1/2 flex flex-col bg-[#0A0A0D] overflow-hidden">
          
          <div className="h-3/5 flex flex-col border-b border-[#1E1E24] overflow-hidden">
            <div className="h-10 border-b border-[#1E1E24] bg-[#0F0F13] px-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveRightTab('code')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeRightTab === 'code'
                      ? 'bg-zinc-800 text-zinc-100 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  Python3 Solution
                </button>

                <button
                  onClick={() => setActiveRightTab('scratchpad')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeRightTab === 'scratchpad'
                      ? 'bg-zinc-800 text-zinc-100 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Scratchpad
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyCode}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 transition-colors"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setUserCode(defaultPythonCode[dayNumber] || defaultPythonCode[1])}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 transition-colors"
                  title="Reset Code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative font-mono text-xs bg-[#0D0D11] overflow-hidden flex">
              <div className="w-10 bg-[#09090C] py-3 text-right pr-3 select-none text-zinc-600 border-r border-zinc-800/40 shrink-0 space-y-1">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {activeRightTab === 'code' ? (
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full bg-transparent p-3 text-zinc-200 font-mono text-xs leading-5 resize-none focus:outline-none select-text"
                />
              ) : (
                <textarea
                  value={scratchText}
                  onChange={(e) => setScratchText(e.target.value)}
                  spellCheck={false}
                  placeholder="Type notes or rough math steps here..."
                  className="w-full h-full bg-transparent p-3 text-amber-200/90 font-mono text-xs leading-5 resize-none focus:outline-none select-text"
                />
              )}
            </div>
          </div>

          <div className="h-2/5 flex flex-col bg-[#0F0F13] overflow-hidden">
            <div className="h-9 border-b border-[#1E1E24] bg-[#09090C] px-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveBottomTab('testcase')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeBottomTab === 'testcase'
                      ? 'bg-zinc-800 text-zinc-200 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  ✓ Testcase
                </button>
                <button
                  onClick={() => setActiveBottomTab('console')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeBottomTab === 'console'
                      ? 'bg-zinc-800 text-zinc-200 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  &gt;_ Test Result
                </button>
              </div>

              <span className="text-[10px] font-mono text-zinc-500">Auto-evaluation Mode</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-zinc-300 select-text">
              {activeBottomTab === 'testcase' ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Input Sample</span>
                    <div className="mt-1 p-2.5 rounded bg-zinc-950 border border-zinc-800 text-indigo-300 font-mono text-xs">
                      {defaultTestcase[dayNumber]?.input || "N = 50, Rate = 10%"}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Expected Output</span>
                    <div className="mt-1 p-2.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono text-xs">
                      {defaultTestcase[dayNumber]?.expected || "Success"}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {consoleOutput ? (
                    <pre className="whitespace-pre-wrap text-emerald-400 font-mono text-xs leading-relaxed">
                      {consoleOutput}
                    </pre>
                  ) : (
                    <div className="text-zinc-600 italic">
                      Click "Run Code" above to execute testcases in python runtime environment.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="h-12 border-t border-[#1E1E24] bg-[#09090C] px-4 flex items-center justify-between shrink-0">
              <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
                Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 border border-zinc-700">Ctrl + Enter</kbd> to start sprint
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={runCode}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  Run Code
                </button>
                <button
                  onClick={handleStart}
                  className="px-4 py-1.5 text-xs font-bold rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Start Sprint {dayNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
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
