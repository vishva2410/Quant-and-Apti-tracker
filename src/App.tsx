import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { lazy, Suspense } from 'react';

const RoadmapPage = lazy(() => import('@/features/roadmap/RoadmapPage').then(m => ({ default: m.RoadmapPage })));
const CheatSheetPage = lazy(() => import('@/features/cheatsheet/CheatSheetPage').then(m => ({ default: m.CheatSheetPage })));
const SprintPage = lazy(() => import('@/features/sprint/SprintPage').then(m => ({ default: m.SprintPage })));
const BreakPage = lazy(() => import('@/features/sprint/BreakPage').then(m => ({ default: m.BreakPage })));
const ResultsPage = lazy(() => import('@/features/results/ResultsPage').then(m => ({ default: m.ResultsPage })));
const AnalyticsPage = lazy(() => import('@/features/analytics/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const ReviewPage = lazy(() => import('@/features/review/ReviewPage').then(m => ({ default: m.ReviewPage })));
const QuestionBankPage = lazy(() => import('@/features/question-bank/QuestionBankPage').then(m => ({ default: m.QuestionBankPage })));
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#71717A] text-sm">Loading...</span>
      </div>
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'roadmap', element: <SuspenseWrapper><RoadmapPage /></SuspenseWrapper> },
      { path: 'analytics', element: <SuspenseWrapper><AnalyticsPage /></SuspenseWrapper> },
      { path: 'review', element: <SuspenseWrapper><ReviewPage /></SuspenseWrapper> },
      { path: 'question-bank', element: <SuspenseWrapper><QuestionBankPage /></SuspenseWrapper> },
      { path: 'settings', element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper> },
    ],
  },
  { path: '/cheatsheet/:day', element: <SuspenseWrapper><CheatSheetPage /></SuspenseWrapper> },
  { path: '/sprint/:day/:sprint', element: <SuspenseWrapper><SprintPage /></SuspenseWrapper> },
  { path: '/break/:day/:sprint', element: <SuspenseWrapper><BreakPage /></SuspenseWrapper> },
  { path: '/results/:day/:sprint', element: <SuspenseWrapper><ResultsPage /></SuspenseWrapper> },
]);

export function App() {
  return <RouterProvider router={router} />;
}
