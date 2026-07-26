import { useMemo } from 'react'
import { useProgressStore } from '@/stores/useProgressStore'
import { getQuestionById } from '@/data/questions'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, Cell
} from 'recharts'
import { cn, getAccuracyColor, formatTimeVerbose } from '@/lib/utils'
import { BarChart3, Target, Clock, Brain, Zap, AlertCircle } from 'lucide-react'
import type { Answer } from '@/types'

const CUSTOM_TOOLTIP = {
  contentStyle: { background: '#18181B', border: '1px solid #27272A', borderRadius: '8px', color: '#FAFAFA' }
};

export function AnalyticsPage() {
  const { dailyProgress } = useProgressStore()

  const allAnswers = useMemo(() => {
    const answers: (Answer & { topic: string, category: string, difficulty: string, companyTags: string[] })[] = []
    Object.values(dailyProgress).forEach(day => {
      if (day.status === 'completed' && day.sprints) {
        day.sprints.forEach(sprint => {
          sprint.answers.forEach(ans => {
            const q = getQuestionById(ans.questionId)
            if (q) {
              answers.push({
                ...ans,
                topic: q.topic,
                category: q.category,
                difficulty: q.difficulty,
                companyTags: q.companyTags || []
              })
            }
          })
        })
      }
    })
    return answers
  }, [dailyProgress])

  const stats = useMemo(() => {
    if (allAnswers.length === 0) return null

    const totalQuestions = allAnswers.length
    const correctAnswers = allAnswers.filter(a => a.isCorrect).length
    const overallAccuracy = (correctAnswers / totalQuestions) * 100
    const avgTime = allAnswers.reduce((sum, a) => sum + a.timeSpent, 0) / totalQuestions
    const consistencyScore = Math.min(100, dailyProgress.filter(day => day.status === 'completed').length * 10)

    return { totalQuestions, overallAccuracy, avgTime, consistencyScore }
  }, [allAnswers, dailyProgress])

  const topicData = useMemo(() => {
    const topicStats: Record<string, { total: number, correct: number, time: number }> = {}
    allAnswers.forEach(a => {
      if (!topicStats[a.topic]) topicStats[a.topic] = { total: 0, correct: 0, time: 0 }
      topicStats[a.topic].total++
      if (a.isCorrect) topicStats[a.topic].correct++
      topicStats[a.topic].time += a.timeSpent
    })

    return Object.entries(topicStats).map(([topic, data]) => ({
      topic,
      accuracy: (data.correct / data.total) * 100,
      total: data.total,
      avgTime: data.time / data.total
    })).sort((a, b) => a.accuracy - b.accuracy)
  }, [allAnswers])

  const dailyTrendData = useMemo(() => {
    const days = dailyProgress
      .filter(day => day.status === 'completed')
      .sort((a, b) => a.dayNumber - b.dayNumber)

    return days.map((dayData) => {
      let correct = 0, total = 0
      dayData.sprints?.forEach(s => {
        s.answers.forEach(a => {
          total++
          if (a.isCorrect) correct++
        })
      })
      return {
        day: `Day ${dayData.dayNumber}`,
        accuracy: total > 0 ? (correct / total) * 100 : 0
      }
    })
  }, [dailyProgress])

  const speedTrendData = useMemo(() => {
    const data: { name: string, time: number }[] = []
    let sprintCount = 1
    Object.values(dailyProgress).forEach(day => {
      if (day.status === 'completed' && day.sprints) {
        day.sprints.forEach(sprint => {
          if (sprint.answers.length > 0) {
            const avg = sprint.answers.reduce((sum, a) => sum + a.timeSpent, 0) / sprint.answers.length
            data.push({ name: `S${sprintCount}`, time: avg })
          }
          sprintCount++
        })
      }
    })
    return data
  }, [dailyProgress])

  const difficultyData = useMemo(() => {
    const counts = { easy: 0, medium: 0, hard: 0 }
    allAnswers.forEach(a => {
      if (a.difficulty === 'easy') counts.easy++
      if (a.difficulty === 'medium') counts.medium++
      if (a.difficulty === 'hard') counts.hard++
    })
    return [
      { name: 'Easy', value: counts.easy, fill: '#10B981' },
      { name: 'Medium', value: counts.medium, fill: '#F59E0B' },
      { name: 'Hard', value: counts.hard, fill: '#EF4444' }
    ]
  }, [allAnswers])

  const companyData = useMemo(() => {
    const compStats: Record<string, { total: number, correct: number }> = {}
    allAnswers.forEach(a => {
      a.companyTags.forEach(comp => {
        if (!compStats[comp]) compStats[comp] = { total: 0, correct: 0 }
        compStats[comp].total++
        if (a.isCorrect) compStats[comp].correct++
      })
    })
    return Object.entries(compStats).map(([name, data]) => ({
      name,
      accuracy: (data.correct / data.total) * 100
    })).sort((a, b) => b.accuracy - a.accuracy)
  }, [allAnswers])

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-zinc-400">
        <AlertCircle className="w-12 h-12 mb-4 text-zinc-500" />
        <h2 className="text-xl font-semibold text-zinc-200">No Data Available</h2>
        <p>Complete some sprints to see your analytics.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8 bg-zinc-950 min-h-screen text-zinc-200">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-indigo-500" />
          Analytics Dashboard
        </h1>
        <p className="text-zinc-400 mt-2">Track your progress and performance across all topics.</p>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Target className="text-indigo-400" />} title="Total Questions" value={stats.totalQuestions.toString()} />
        <StatCard icon={<Brain className="text-emerald-400" />} title="Overall Accuracy" value={`${stats.overallAccuracy.toFixed(1)}%`} color={getAccuracyColor(stats.overallAccuracy)} />
        <StatCard icon={<Clock className="text-amber-400" />} title="Avg Time/Q" value={formatTimeVerbose(stats.avgTime)} />
        <StatCard icon={<Zap className="text-rose-400" />} title="Consistency Score" value={`${stats.consistencyScore}/100`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-200 mb-4">Accuracy by Topic</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicData}>
              <PolarGrid stroke="#27272A" />
              <PolarAngleAxis dataKey="topic" tick={{ fill: '#A1A1AA', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#71717A' }} />
              <Radar name="Accuracy" dataKey="accuracy" stroke="#6366F1" fill="#6366F1" fillOpacity={0.3} />
              <Tooltip {...CUSTOM_TOOLTIP} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-200 mb-4">Daily Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dailyTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#27272A" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill: '#71717A', fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#71717A', fontSize: 12 }} />
              <Tooltip {...CUSTOM_TOOLTIP} />
              <Area type="monotone" dataKey="accuracy" stroke="#6366F1" fillOpacity={1} fill="url(#colorAccuracy)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Speed Trend */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-200 mb-4">Speed Trend (Seconds/Q)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={speedTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#27272A" strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: '#71717A', fontSize: 12 }} />
              <YAxis tick={{ fill: '#71717A', fontSize: 12 }} />
              <Tooltip {...CUSTOM_TOOLTIP} />
              <Line type="monotone" dataKey="time" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#18181B', stroke: '#F59E0B', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-200 mb-4">Difficulty Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={difficultyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#27272A" strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fill: '#71717A', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#71717A', fontSize: 12 }} />
              <Tooltip {...CUSTOM_TOOLTIP} cursor={{ fill: '#27272A' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Strength Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm overflow-hidden">
        <h3 className="text-lg font-semibold text-zinc-200 mb-4">Topic Strengths & Weaknesses</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                <th className="pb-3 px-4 font-medium">Topic</th>
                <th className="pb-3 px-4 font-medium">Attempted</th>
                <th className="pb-3 px-4 font-medium">Accuracy</th>
                <th className="pb-3 px-4 font-medium">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {topicData.map((topic, i) => (
                <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                  <td className="py-3 px-4 text-zinc-300 font-medium">{topic.topic}</td>
                  <td className="py-3 px-4 text-zinc-400">{topic.total}</td>
                  <td className={cn("py-3 px-4 font-semibold", getAccuracyColor(topic.accuracy))}>
                    {topic.accuracy.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-zinc-400">{formatTimeVerbose(topic.avgTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company Performance */}
      {companyData.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-200 mb-4">Company-wise Accuracy</h3>
          <ResponsiveContainer width="100%" height={Math.max(250, companyData.length * 40)}>
            <BarChart layout="vertical" data={companyData} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
              <CartesianGrid stroke="#27272A" strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#71717A', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#71717A', fontSize: 12 }} />
              <Tooltip {...CUSTOM_TOOLTIP} cursor={{ fill: '#27272A' }} />
              <Bar dataKey="accuracy" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, title, value, color = "text-zinc-100" }: { icon: React.ReactNode, title: string, value: string, color?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-400 font-medium">{title}</p>
        <p className={cn("text-2xl font-bold mt-1", color)}>{value}</p>
      </div>
    </div>
  )
}
