import React, { useState } from 'react';
import { 
  Trophy, 
  BarChart3, 
  Award, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Search, 
  ChevronRight, 
  ExternalLink,
  GitBranch,
  Globe,
  PieChart as PieIcon,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { HOURLY_CHECKIN_DATA } from '../data/initialData';

export default function LeaderboardAnalytics({ 
  teams, 
  attendees, 
  announcements, 
  currentRole 
}) {
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' | 'analytics'
  const [trackFilter, setTrackFilter] = useState('All');
  const [selectedModalTeam, setSelectedModalTeam] = useState(null);

  // Sorted teams by score
  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);
  const filteredTeams = sortedTeams.filter(t => trackFilter === 'All' || t.track === trackFilter);

  // Analytics Metrics
  const totalAttendees = attendees.length;
  const checkedInAttendees = attendees.filter(a => a.checkedIn).length;
  const checkInRate = Math.round((checkedInAttendees / totalAttendees) * 100) || 0;
  const judgedTeamsCount = teams.filter(t => t.judged).length;

  // Skill Distribution Stats
  const skillCounts = {};
  attendees.forEach(a => {
    a.skills.forEach(s => {
      skillCounts[s] = (skillCounts[s] || 0) + 1;
    });
  });

  const pieData = Object.keys(skillCounts).slice(0, 5).map(skill => ({
    name: skill,
    value: skillCounts[skill]
  }));

  const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Sub Header & Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span>Live Leaderboard & Organizer Command Analytics</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Real-time aggregate scoring updates, rank shifts, and event engagement metrics.
          </p>
        </div>

        {/* View Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'leaderboard' ? 'bg-yellow-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Live Podium Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'analytics' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Organizer Command Analytics</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: LIVE LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-8">
          {/* Top 3 Podium Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* 2nd Place */}
            {sortedTeams[1] && (
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center space-y-3 relative order-2 md:order-1 mt-0 md:mt-6">
                <span className="w-10 h-10 mx-auto rounded-full bg-slate-800 border-2 border-slate-400 flex items-center justify-center font-bold text-slate-300 shadow-md">
                  🥈
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">2ND PLACE</span>
                <h3 className="font-extrabold text-white text-lg">{sortedTeams[1].name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{sortedTeams[1].tagline}</p>
                <div className="text-2xl font-black text-slate-200 font-mono">{sortedTeams[1].totalScore} pts</div>
              </div>
            )}

            {/* 1st Place Champion */}
            {sortedTeams[0] && (
              <div className="glass-panel p-6 rounded-2xl border border-yellow-500/60 bg-yellow-950/20 text-center space-y-3 relative order-1 md:order-2 glow-cyan">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-yellow-500 text-slate-950 text-[10px] font-black tracking-widest uppercase">
                  👑 HACKATHON CHAMPION
                </div>
                <span className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl glow-cyan">
                  🥇
                </span>
                <h3 className="font-black text-white text-xl">{sortedTeams[0].name}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{sortedTeams[0].tagline}</p>
                <div className="text-4xl font-black text-yellow-400 font-mono">{sortedTeams[0].totalScore} pts</div>
              </div>
            )}

            {/* 3rd Place */}
            {sortedTeams[2] && (
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center space-y-3 relative order-3 mt-0 md:mt-8">
                <span className="w-10 h-10 mx-auto rounded-full bg-amber-950/60 border-2 border-amber-600 flex items-center justify-center font-bold text-amber-500 shadow-md">
                  🥉
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">3RD PLACE</span>
                <h3 className="font-extrabold text-white text-lg">{sortedTeams[2].name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{sortedTeams[2].tagline}</p>
                <div className="text-2xl font-black text-amber-400 font-mono">{sortedTeams[2].totalScore} pts</div>
              </div>
            )}
          </div>

          {/* Full Leaderboard Table */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="font-bold text-white text-base">Full Ranking Table</h3>

              {/* Category Filter */}
              <div className="flex gap-2">
                {['All', 'AI & Machine Learning', 'FinTech & Web3', 'Health & BioTech', 'Sustainability & Green Tech'].map((tr) => (
                  <button
                    key={tr}
                    onClick={() => setTrackFilter(tr)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      trackFilter === tr ? 'bg-cyan-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tr === 'All' ? 'All Tracks' : tr.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-mono">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Team Name</th>
                    <th className="py-3 px-4">Category Track</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Judged Status</th>
                    <th className="py-3 px-4 text-right">Aggregate Score</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTeams.map((team, idx) => (
                    <tr key={team.id} className="hover:bg-slate-900/40 transition">
                      <td className="py-3.5 px-4 font-mono font-bold">
                        <span className={`px-2.5 py-1 rounded-md ${
                          idx === 0 ? 'bg-yellow-500 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : idx === 2 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}>
                          #{idx + 1}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <h4 className="font-bold text-white text-sm">{team.name}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{team.tagline}</p>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-cyan-400">
                        {team.track}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {team.tableNumber}
                      </td>

                      <td className="py-3.5 px-4">
                        {team.judged ? (
                          <span className="px-2 py-0.5 text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded font-bold">
                            Evaluated
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-black text-base text-cyan-400">
                        {team.totalScore} pts
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedModalTeam(team)}
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-cyan-400 border border-slate-800 transition"
                          title="View Score Breakdown"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ORGANIZER COMMAND ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* KPI Dashboard Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Attendees</span>
              <div className="text-3xl font-black text-white font-mono">{totalAttendees}</div>
              <p className="text-[11px] text-cyan-400">Registered across all tracks</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Checked-In Rate</span>
              <div className="text-3xl font-black text-emerald-400 font-mono">{checkInRate}%</div>
              <p className="text-[11px] text-slate-400">{checkedInAttendees} of {totalAttendees} verified at gate</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Teams Formed</span>
              <div className="text-3xl font-black text-purple-400 font-mono">{teams.length}</div>
              <p className="text-[11px] text-slate-400">Active project submissions</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Evaluations Done</span>
              <div className="text-3xl font-black text-amber-400 font-mono">{judgedTeamsCount}/{teams.length}</div>
              <p className="text-[11px] text-slate-400">Judged with locked rubrics</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Check-in Velocity Chart */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Hourly Venue Check-In Velocity</span>
              </h3>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={HOURLY_CHECKIN_DATA}>
                    <defs>
                      <linearGradient id="colorCheckins" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="checkIns" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCheckins)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Skill Matrix Pie Chart */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                <PieIcon className="w-4 h-4 text-purple-400" />
                <span>Participant Skill Distribution</span>
              </h3>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {pieData.map((item, idx) => (
                  <span key={idx} className="flex items-center space-x-1 text-xs text-slate-300 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    <span>{item.name} ({item.value})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCORE BREAKDOWN MODAL */}
      {selectedModalTeam && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded">
                  {selectedModalTeam.track}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedModalTeam.name}</h3>
                <p className="text-xs text-slate-400">{selectedModalTeam.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedModalTeam(null)}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Rubric Score Breakdown</h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Innovation (30%):</span>
                  <span className="font-mono font-bold text-cyan-400">{selectedModalTeam.scores.innovation}/10</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Execution (30%):</span>
                  <span className="font-mono font-bold text-cyan-400">{selectedModalTeam.scores.execution}/10</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Design (20%):</span>
                  <span className="font-mono font-bold text-cyan-400">{selectedModalTeam.scores.design}/10</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Pitch (20%):</span>
                  <span className="font-mono font-bold text-cyan-400">{selectedModalTeam.scores.pitch}/10</span>
                </div>
              </div>

              {selectedModalTeam.scores.comments && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">Judge Comments:</span>
                  <p className="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-lg border border-slate-800">
                    "{selectedModalTeam.scores.comments}"
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedModalTeam(null)}
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition"
            >
              Close Breakdown View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
