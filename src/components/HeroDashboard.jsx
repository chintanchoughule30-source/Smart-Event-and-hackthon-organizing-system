import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Trophy, 
  Radio, 
  QrCode, 
  Zap, 
  ArrowRight, 
  Activity,
  TrendingUp,
  Sparkles,
  BarChart3,
  Bell,
  Gavel,
  Calendar
} from 'lucide-react';

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
}

export default function HeroDashboard({ 
  attendees, 
  teams, 
  announcements, 
  setCurrentTab, 
  setCurrentRole,
  activityLog
}) {
  const checkedInCount = attendees.filter(a => a.checkedIn).length;
  const checkInRate = attendees.length > 0 ? Math.round((checkedInCount / attendees.length) * 100) : 0;
  const judgedCount = teams.filter(t => t.judged).length;
  const freeAgents = attendees.filter(a => !a.teamId).length;

  const kpis = [
    { 
      label: 'Total Attendees', 
      value: attendees.length, 
      icon: Users, 
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'glow-cyan',
      suffix: ''
    },
    { 
      label: 'Check-In Rate', 
      value: checkInRate, 
      icon: UserCheck, 
      gradient: 'from-emerald-500 to-teal-600',
      glow: 'glow-emerald',
      suffix: '%'
    },
    { 
      label: 'Teams Formed', 
      value: teams.length, 
      icon: Trophy, 
      gradient: 'from-purple-500 to-indigo-600',
      glow: 'glow-purple',
      suffix: ''
    },
    { 
      label: 'Scores Submitted', 
      value: judgedCount, 
      icon: Gavel, 
      gradient: 'from-amber-500 to-orange-600',
      glow: 'glow-amber',
      suffix: `/${teams.length}`
    }
  ];

  const quickActions = [
    { 
      label: 'Registration & QR Check-In', 
      description: 'Generate QR badges and scan at the gate',
      icon: QrCode, 
      tab: 'checkin', 
      role: 'gatekeeper',
      gradient: 'from-cyan-500/20 to-blue-600/20',
      border: 'border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    { 
      label: 'AI Team Matchmaker', 
      description: 'Find teammates by skill compatibility',
      icon: Users, 
      tab: 'teams', 
      role: 'participant',
      gradient: 'from-purple-500/20 to-indigo-600/20',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    { 
      label: 'Broadcast Center', 
      description: 'Dispatch real-time announcements',
      icon: Bell, 
      tab: 'broadcast', 
      role: 'organizer',
      gradient: 'from-amber-500/20 to-orange-600/20',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    { 
      label: 'Event Schedule', 
      description: 'View the full event timeline',
      icon: Calendar, 
      tab: 'schedule', 
      role: 'participant',
      gradient: 'from-rose-500/20 to-pink-600/20',
      border: 'border-rose-500/30',
      iconColor: 'text-rose-400'
    },
    { 
      label: 'Judging Portal', 
      description: 'Evaluate submissions with rubrics',
      icon: Gavel, 
      tab: 'judging', 
      role: 'judge',
      gradient: 'from-indigo-500/20 to-violet-600/20',
      border: 'border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    { 
      label: 'Leaderboard & Analytics', 
      description: 'Live rankings and organizer charts',
      icon: BarChart3, 
      tab: 'leaderboard', 
      role: 'organizer',
      gradient: 'from-emerald-500/20 to-teal-600/20',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-slide-in">
      {/* Floating Particle Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-3 h-3 rounded-full bg-cyan-500/20 animate-float" />
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-purple-500/30 animate-float-delayed" />
        <div className="absolute bottom-40 left-1/3 w-4 h-4 rounded-full bg-emerald-500/15 animate-float-slow" />
        <div className="absolute top-60 left-2/3 w-2 h-2 rounded-full bg-amber-500/20 animate-float" />
        <div className="absolute bottom-20 right-1/4 w-3 h-3 rounded-full bg-cyan-500/15 animate-float-delayed" />
      </div>

      {/* Hero Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4 animate-scale-in">
          <Activity className="w-3.5 h-3.5" />
          LIVE EVENT DASHBOARD
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">Nexus Event HQ</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Unified real-time smart event management. Monitor check-ins, teams, broadcasts, and scores — all from one command center.
        </p>
      </div>

      {/* KPI Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 stagger-children">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={kpi.label}
              className={`glass-panel rounded-2xl p-5 relative overflow-hidden group glass-panel-hover animate-fade-slide-in`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Gradient Background Accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${kpi.gradient} mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 animate-count-up">
                  <AnimatedCounter end={kpi.value} suffix={kpi.suffix} />
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                  {kpi.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Grid */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => {
                  setCurrentTab(action.tab);
                  setCurrentRole(action.role);
                }}
                className={`glass-panel rounded-xl p-4 text-left group glass-panel-hover flex items-start gap-3 animate-fade-slide-in`}
                style={{ animationDelay: `${i * 60}ms` }}
                aria-label={`Navigate to ${action.label}`}
              >
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${action.gradient} border ${action.border} shrink-0`}>
                  <Icon className={`w-5 h-5 ${action.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                    {action.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5" />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{action.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Activity Feed + System Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activity Feed */}
        <div className="glass-panel rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            Live Activity Feed
          </h3>
          <div className="space-y-2.5 max-h-64 overflow-y-auto">
            {activityLog.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No activity yet — start by registering an attendee or dispatching a broadcast.</p>
            ) : (
              activityLog.slice(0, 8).map((log, i) => (
                <div 
                  key={log.id}
                  className="flex items-start gap-3 py-2 px-3 rounded-lg bg-slate-800/40 border border-slate-700/30 text-xs animate-fade-slide-in-left"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="text-lg shrink-0">{log.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-200">{log.message}</span>
                    <div className="text-slate-500 mt-0.5 font-mono">{log.time}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* System Health Metrics */}
        <div className="glass-panel rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            System Overview
          </h3>
          <div className="space-y-3">
            {/* Check-in progress bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400">Check-in Progress</span>
                <span className="text-emerald-400 font-mono font-bold">{checkInRate}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${checkInRate}%` }}
                />
              </div>
            </div>

            {/* Judging progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400">Judging Progress</span>
                <span className="text-purple-400 font-mono font-bold">{judgedCount}/{teams.length}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${teams.length > 0 ? (judgedCount / teams.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center py-2 rounded-lg bg-slate-800/50">
                <div className="text-lg font-bold text-cyan-400">{freeAgents}</div>
                <div className="text-[10px] text-slate-500 uppercase">Free Agents</div>
              </div>
              <div className="text-center py-2 rounded-lg bg-slate-800/50">
                <div className="text-lg font-bold text-amber-400">{announcements.length}</div>
                <div className="text-[10px] text-slate-500 uppercase">Broadcasts</div>
              </div>
              <div className="text-center py-2 rounded-lg bg-slate-800/50">
                <div className="text-lg font-bold text-emerald-400">{checkedInCount}</div>
                <div className="text-[10px] text-slate-500 uppercase">Checked In</div>
              </div>
            </div>

            {/* Latest broadcast */}
            {announcements.length > 0 && (
              <div className="mt-2 p-3 rounded-lg bg-slate-800/40 border border-slate-700/30">
                <div className="text-[10px] uppercase text-slate-500 mb-1 font-medium">Latest Broadcast</div>
                <div className="text-xs text-slate-300 font-medium">{announcements[0].title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{announcements[0].timestamp}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
