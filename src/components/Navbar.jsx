import React from 'react';
import { 
  Zap, 
  Users, 
  QrCode, 
  Bell, 
  Award, 
  BarChart3, 
  Layers, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  UserCheck, 
  Gavel,
  Activity
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  currentRole, 
  setCurrentRole,
  audioEnabled,
  setAudioEnabled,
  totalAttendees,
  checkedInCount
}) {
  const tabs = [
    { id: 'architecture', label: 'System Architecture', icon: Layers },
    { id: 'checkin', label: 'Registration & Check-In', icon: QrCode },
    { id: 'teams', label: 'Team Matchmaker', icon: Users },
    { id: 'broadcast', label: 'Broadcast Center', icon: Bell },
    { id: 'judging', label: 'Judging Portal', icon: Gavel },
    { id: 'leaderboard', label: 'Leaderboard & Analytics', icon: BarChart3 },
  ];

  const roles = [
    { id: 'participant', label: 'Participant', icon: Users, color: 'from-cyan-500 to-blue-600' },
    { id: 'judge', label: 'Judge Mode', icon: Gavel, color: 'from-purple-500 to-indigo-600' },
    { id: 'gatekeeper', label: 'Gate Scanner', icon: UserCheck, color: 'from-emerald-500 to-teal-600' },
    { id: 'organizer', label: 'Organizer HQ', icon: ShieldAlert, color: 'from-amber-500 to-rose-600' },
  ];

  const checkInPercentage = Math.round((checkedInCount / totalAttendees) * 100) || 0;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      {/* Top Banner / System Health Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-xs border-b border-slate-800/60 text-slate-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>REALTIME SYNC ACTIVE</span>
          </span>
          <span className="hidden sm:inline border-l border-slate-800 pl-3">
            Websocket Latency: <strong className="text-cyan-400">14ms</strong>
          </span>
          <span className="hidden md:inline border-l border-slate-800 pl-3">
            Check-In Rate: <strong className="text-emerald-400">{checkedInCount}/{totalAttendees} ({checkInPercentage}%)</strong>
          </span>
        </div>

        {/* Role Persona Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-medium uppercase text-[10px] tracking-wider hidden sm:inline">Active Persona:</span>
          <div className="flex bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${r.color} text-white shadow-lg`
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{r.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition"
            title={audioEnabled ? 'Sound FX Enabled' : 'Sound FX Muted'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Main Nav Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('architecture')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 glow-cyan">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                NEXUS <span className="text-cyan-400 font-bold">HQ</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded-full">
                v2.6 LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Smart Event & Hackathon Operating System</p>
          </div>
        </div>

        {/* Tab Selection */}
        <nav className="flex items-center overflow-x-auto max-w-full space-x-1 p-1 bg-slate-900/60 rounded-xl border border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-950/50 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
