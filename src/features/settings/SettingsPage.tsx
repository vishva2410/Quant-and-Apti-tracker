import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Volume2, Monitor, Download, Trash2, Clock, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { useSettingsStore } from '@/stores/useSettingsStore';
// import { useProgressStore } from '@/stores/useProgressStore';

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={cn(
      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
      enabled ? "bg-indigo-600" : "bg-zinc-700"
    )}
  >
    <span
      className={cn(
        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        enabled ? "translate-x-5" : "translate-x-0"
      )}
    />
  </button>
);

export function SettingsPage() {
  // Mock state for UI
  const [settings, setSettings] = useState({
    pauseOnTabSwitch: true,
    showTimer: true,
    fontSize: 'normal',
    showShortcuts: true,
    soundEffects: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const Section = ({ title, icon: Icon, children }: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#18181B] border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/0 group-hover:bg-indigo-500/50 transition-colors" />
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-zinc-800/50 rounded-lg text-indigo-400">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 p-6 font-sans pb-20">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-800">
          <Settings className="w-8 h-8 text-zinc-400" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-zinc-400">Manage your learning experience</p>
          </div>
        </header>

        <Section title="Sprint Preferences" icon={Clock}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-zinc-200">Pause on Tab Switch</div>
              <div className="text-sm text-zinc-500 mt-1">Automatically pause the sprint timer when you switch away</div>
            </div>
            <Toggle enabled={settings.pauseOnTabSwitch} onChange={v => updateSetting('pauseOnTabSwitch', v)} />
          </div>
          <div className="w-full h-px bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-zinc-200">Show Timer</div>
              <div className="text-sm text-zinc-500 mt-1">Display the countdown timer during sprints</div>
            </div>
            <Toggle enabled={settings.showTimer} onChange={v => updateSetting('showTimer', v)} />
          </div>
        </Section>

        <Section title="Display & Interface" icon={Monitor}>
          <div>
            <div className="font-medium text-zinc-200 mb-3">Font Size</div>
            <div className="flex gap-3">
              {['normal', 'large', 'xl'].map(size => (
                <button
                  key={size}
                  onClick={() => updateSetting('fontSize', size)}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-colors",
                    settings.fontSize === size 
                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-400" 
                      : "bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-px bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Keyboard className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="font-medium text-zinc-200">Keyboard Shortcuts</div>
                <div className="text-sm text-zinc-500 mt-1">Show shortcut hints in the UI</div>
              </div>
            </div>
            <Toggle enabled={settings.showShortcuts} onChange={v => updateSetting('showShortcuts', v)} />
          </div>
        </Section>

        <Section title="Audio" icon={Volume2}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-zinc-200">Sound Effects</div>
              <div className="text-sm text-zinc-500 mt-1">Play sounds for correct/wrong answers and timer alerts</div>
            </div>
            <Toggle enabled={settings.soundEffects} onChange={v => updateSetting('soundEffects', v)} />
          </div>
        </Section>

        <Section title="Data Management" icon={Download}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl font-medium transition-colors border border-zinc-700">
              <Download className="w-4 h-4" />
              Export Progress Data
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-medium transition-colors border border-red-500/20">
              <Trash2 className="w-4 h-4" />
              Reset All Data
            </button>
          </div>
          <p className="text-xs text-zinc-500 text-center mt-2">Export your data as JSON for backup. Resetting data cannot be undone.</p>
        </Section>
      </div>
    </div>
  );
}
