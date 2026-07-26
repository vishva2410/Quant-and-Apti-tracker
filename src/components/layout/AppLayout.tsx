import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  BarChart3,
  Archive,
  Library,
  Settings,
  Flame,
  Zap,
  Menu,
  X,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/stores/useProgressStore';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/roadmap', icon: Map, label: 'Roadmap' },
  { path: '/question-bank', icon: Library, label: 'Question Bank' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/review', icon: Archive, label: 'Review Vault' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { totalXP, level, currentStreak } = useProgressStore();

  // Hide sidebar during sprint/exam mode
  const isExamMode = location.pathname.startsWith('/sprint') || location.pathname.startsWith('/cheatsheet');
  if (isExamMode) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen bg-[#09090B]">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#18181B] border border-[#27272A] lg:hidden"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0F0F12] border-r border-[#1E1E23] z-40',
          'flex flex-col transition-transform duration-300',
          'lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#FAFAFA] tracking-tight">AptiQuant</h1>
              <p className="text-[10px] text-[#71717A] font-medium tracking-wider uppercase">Elite Training</p>
            </div>
          </div>
        </div>

        {/* User stats bar */}
        <div className="mx-4 mb-4 p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-[#6366F1]" />
              <span className="text-xs font-semibold text-[#FAFAFA]">Lvl {level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame size={14} className="text-orange-400" />
              <span className="text-xs font-semibold text-orange-400">{currentStreak}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[#6366F1]" />
              <span className="text-xs font-semibold text-[#A1A1AA]">{totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20'
                    : 'text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#18181B]'
                )
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#6366F1]/10 to-transparent border border-[#6366F1]/20">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={14} className="text-[#6366F1]" />
              <span className="text-xs font-semibold text-[#FAFAFA]">Quick Tip</span>
            </div>
            <p className="text-[11px] text-[#71717A] leading-relaxed">
              Use keyboard shortcuts during sprints. Press <kbd className="px-1 py-0.5 bg-[#27272A] rounded text-[10px] font-mono">?</kbd> for help.
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen lg:ml-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
