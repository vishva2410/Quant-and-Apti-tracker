import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getAllQuestions } from '@/data/questions'
import { useProgressStore } from '@/stores/useProgressStore'
import { cn, getDifficultyColor } from '@/lib/utils'
import { QUANT_TOPICS, REASONING_TOPICS, CS_LOGIC_TOPICS, COMPANIES } from '@/config/constants'
import { Search, Filter, BookOpen, ChevronDown, ChevronRight, CheckCircle2, XCircle, Bookmark, Clock, Tag } from 'lucide-react'

export function QuestionBankPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All')
  const [topicFilter, setTopicFilter] = useState<string>('All')
  const [companyFilter, setCompanyFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(20)

  const allQuestions = useMemo(() => getAllQuestions(), [])
  const { dailyProgress } = useProgressStore()

  // Map of questionId -> { isAttempted: boolean, isCorrect: boolean }
  const questionStatusMap = useMemo(() => {
    const map = new Map<string, { isAttempted: boolean, isCorrect: boolean }>()
    Object.values(dailyProgress).forEach(day => {
      if (day.status === 'completed' && day.sprints) {
        day.sprints.forEach(sprint => {
          sprint.answers.forEach(ans => {
            map.set(ans.questionId, { isAttempted: true, isCorrect: ans.isCorrect })
          })
        })
      }
    })
    return map
  }, [dailyProgress])

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      // Search text
      if (searchTerm && !q.content.text.toLowerCase().includes(searchTerm.toLowerCase())) return false
      
      // Category
      if (categoryFilter !== 'All' && q.category !== categoryFilter) return false
      
      // Difficulty
      if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter.toLowerCase()) return false
      
      // Topic
      if (topicFilter !== 'All' && q.topic !== topicFilter) return false
      
      // Company
      if (companyFilter !== 'All' && !(q.companyTags && q.companyTags.includes(companyFilter))) return false
      
      // Status
      const status = questionStatusMap.get(q.id)
      if (statusFilter === 'Attempted' && !status) return false
      if (statusFilter === 'Unattempted' && status) return false
      if (statusFilter === 'Correct' && (!status || !status.isCorrect)) return false
      if (statusFilter === 'Wrong' && (!status || status.isCorrect)) return false
      
      return true
    })
  }, [allQuestions, searchTerm, categoryFilter, difficultyFilter, topicFilter, companyFilter, statusFilter, questionStatusMap])

  const paginatedQuestions = filteredQuestions.slice(0, visibleCount)

  const stats = useMemo(() => {
    let attempted = 0
    let correct = 0
    filteredQuestions.forEach(q => {
      const st = questionStatusMap.get(q.id)
      if (st) {
        attempted++
        if (st.isCorrect) correct++
      }
    })
    return {
      total: filteredQuestions.length,
      attempted,
      accuracy: attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : 0
    }
  }, [filteredQuestions, questionStatusMap])

  const availableTopics = useMemo(() => {
    if (categoryFilter === 'Quant') return QUANT_TOPICS
    if (categoryFilter === 'Reasoning') return REASONING_TOPICS
    if (categoryFilter === 'CS Logic') return CS_LOGIC_TOPICS
    return [...QUANT_TOPICS, ...REASONING_TOPICS, ...CS_LOGIC_TOPICS]
  }, [categoryFilter])

  const clearFilters = () => {
    setSearchTerm('')
    setCategoryFilter('All')
    setDifficultyFilter('All')
    setTopicFilter('All')
    setCompanyFilter('All')
    setStatusFilter('All')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <header className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-500" />
              Question Bank
            </h1>
            <p className="text-zinc-400 mt-2">Browse and practice {allQuestions.length} curated questions.</p>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 shadow-md sticky top-4 z-10">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-200 placeholder:text-zinc-500 transition-shadow"
              />
            </div>
            
            <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setTopicFilter('All') }} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer">
              <option value="All" className="bg-zinc-900 text-zinc-200">All Categories</option>
              <option value="Quant" className="bg-zinc-900 text-zinc-200">Quant</option>
              <option value="Reasoning" className="bg-zinc-900 text-zinc-200">Reasoning</option>
              <option value="CS Logic" className="bg-zinc-900 text-zinc-200">CS Logic</option>
            </select>

            <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 max-w-[160px] truncate cursor-pointer">
              <option value="All" className="bg-zinc-900 text-zinc-200">All Topics</option>
              {availableTopics.map(t => <option key={t} value={t} className="bg-zinc-900 text-zinc-200">{t}</option>)}
            </select>

            <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer">
              <option value="All" className="bg-zinc-900 text-zinc-200">All Difficulties</option>
              <option value="Easy" className="bg-zinc-900 text-zinc-200">Easy</option>
              <option value="Medium" className="bg-zinc-900 text-zinc-200">Medium</option>
              <option value="Hard" className="bg-zinc-900 text-zinc-200">Hard</option>
            </select>

            <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 max-w-[160px] truncate cursor-pointer">
              <option value="All" className="bg-zinc-900 text-zinc-200">All Companies</option>
              {COMPANIES.map(c => <option key={c} value={c} className="bg-zinc-900 text-zinc-200">{c}</option>)}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer">
              <option value="All" className="bg-zinc-900 text-zinc-200">All Statuses</option>
              <option value="Attempted" className="bg-zinc-900 text-zinc-200">Attempted</option>
              <option value="Unattempted" className="bg-zinc-900 text-zinc-200">Unattempted</option>
              <option value="Correct" className="bg-zinc-900 text-zinc-200">Correct</option>
              <option value="Wrong" className="bg-zinc-900 text-zinc-200">Wrong</option>
            </select>

            <button onClick={clearFilters} className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
              <Filter className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="text-sm text-zinc-400 mb-4 flex items-center gap-2">
          <span>Showing <strong className="text-zinc-200">{stats.total}</strong> questions</span>
          <span>•</span>
          <span><strong className="text-zinc-200">{stats.attempted}</strong> attempted</span>
          <span>•</span>
          <span><strong className={cn("font-semibold", typeof stats.accuracy === 'number' && stats.accuracy >= 70 ? 'text-emerald-400' : typeof stats.accuracy === 'number' && stats.accuracy >= 50 ? 'text-amber-400' : 'text-rose-400')}>{stats.accuracy}%</strong> accuracy</span>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <AnimatePresence>
            {paginatedQuestions.map((q) => {
              const status = questionStatusMap.get(q.id)
              const isExpanded = expandedId === q.id
              
              return (
                <motion.div
                  layout
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm transition-colors",
                    isExpanded ? "border-indigo-500/50" : "hover:border-zinc-700"
                  )}
                >
                  {/* Card Header (Clickable) */}
                  <div 
                    className="p-4 cursor-pointer flex items-start gap-4 select-none"
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {status ? (
                        status.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded">{q.id}</span>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium border", getDifficultyColor(q.difficulty))}>
                          {q.difficulty.toUpperCase()}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-medium">
                          {q.topic}
                        </span>
                        {q.companyTags?.slice(0, 2).map(comp => (
                          <span key={comp} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {comp}
                          </span>
                        ))}
                        {q.companyTags && q.companyTags.length > 2 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                            +{q.companyTags.length - 2}
                          </span>
                        )}
                        <span className="text-xs text-zinc-500 flex items-center gap-1 ml-auto">
                          <Clock className="w-3 h-3" /> {q.expectedTimeSeconds}s
                        </span>
                      </div>
                      <p className="text-zinc-200 line-clamp-2 pr-8 leading-relaxed">
                        {q.content.text}
                      </p>
                    </div>
                    
                    <button className="flex-shrink-0 p-1 text-zinc-500 hover:text-zinc-300">
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-zinc-800 bg-zinc-900/50"
                      >
                        <div className="p-4 pl-12">
                          <div className="mb-6 text-zinc-300 leading-relaxed whitespace-pre-wrap">
                            {q.content.text}
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            {q.options.map((opt, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "p-3 rounded-lg border text-sm",
                                  opt.id === q.correctAnswer 
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" 
                                    : "bg-zinc-950 border-zinc-800 text-zinc-400"
                                )}
                              >
                                <span className="font-medium mr-2">{['A', 'B', 'C', 'D'][i]}.</span>
                                {opt.text}
                              </div>
                            ))}
                          </div>

                          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-4 text-sm">
                            <h4 className="font-semibold text-zinc-200 mb-2">Explanation:</h4>
                            <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">{q.explanation.detailed}</p>
                          </div>

                          {(q.explanation.shortTrick || q.explanation.commonMistake) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                              {q.explanation.shortTrick && (
                                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
                                  <h4 className="font-semibold text-indigo-400 mb-1 flex items-center gap-2">💡 Short Trick</h4>
                                  <p className="text-indigo-200/80">{q.explanation.shortTrick}</p>
                                </div>
                              )}
                              {q.explanation.commonMistake && (
                                <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                                  <h4 className="font-semibold text-rose-400 mb-1 flex items-center gap-2">⚠️ Common Mistake</h4>
                                  <p className="text-rose-200/80">{q.explanation.commonMistake}</p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-zinc-800/50">
                            <button className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2">
                              <Bookmark className="w-4 h-4" /> Save
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-900/20 transition-colors">
                              Practice This
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
          
          {paginatedQuestions.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              No questions found matching your criteria.
            </div>
          )}
          
          {visibleCount < filteredQuestions.length && (
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setVisibleCount(v => v + 20)}
                className="px-6 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
