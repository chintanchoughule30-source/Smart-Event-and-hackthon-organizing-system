import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Filter, 
  MessageSquare, 
  GitBranch, 
  Globe, 
  PlusCircle,
  Briefcase,
  Zap,
  Check
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { sanitizeString } from '../utils/security';

export default function TeamMatchmaker({ 
  attendees, 
  teams, 
  setTeams, 
  setAttendees,
  addToast,
  logActivity
}) {
  const [viewMode, setViewMode] = useState('matchmaker'); // 'matchmaker' | 'create_team' | 'teams_list'
  const [skillFilter, setSkillFilter] = useState('All');
  const [trackFilter, setTrackFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [requestSent, setRequestSent] = useState({});

  // Create Team Form State
  const [newTeam, setNewTeam] = useState({
    name: '',
    tagline: '',
    track: 'AI & Machine Learning',
    lookingFor: 'Frontend / UI Engineer, DevOps Specialist',
    tableNumber: 'Table A-15'
  });

  // Calculate AI Match Score between a team and an attendee
  const calculateMatchScore = (attendee, team) => {
    let score = 70; // baseline
    if (team.track === attendee.track) score += 15;
    if (team.lookingFor.some(role => attendee.role.toLowerCase().includes(role.toLowerCase()))) score += 15;
    return Math.min(score, 98);
  };

  // Handle Team Creation
  const handleCreateTeam = (e) => {
    e.preventDefault();
    const cleanName = sanitizeString(newTeam.name);
    const cleanTagline = sanitizeString(newTeam.tagline);

    if (!cleanName || !cleanTagline) {
      addToast('Please enter a valid team name and project tagline.', 'error');
      return;
    }

    const teamId = `TEAM-${Math.floor(100 + Math.random() * 900)}`;
    const lookingList = newTeam.lookingFor.split(',').map(s => sanitizeString(s.trim())).filter(Boolean);

    const createdTeam = {
      id: teamId,
      name: cleanName,
      tagline: cleanTagline,
      track: sanitizeString(newTeam.track),
      repoUrl: '',
      demoUrl: '',
      members: [],
      lookingFor: lookingList,
      tableNumber: sanitizeString(newTeam.tableNumber),
      scores: { innovation: 0, execution: 0, design: 0, pitch: 0, comments: '' },
      totalScore: 0,
      judged: false,
      judgedBy: null
    };

    setTeams([createdTeam, ...teams]);
    setViewMode('teams_list');
    soundFx.playNotification();
    addToast(`Team "${cleanName}" created successfully! Now listed in Matchmaker portal.`, 'success');
    if (logActivity) logActivity('👥', `New team formed: ${cleanName} (${createdTeam.track})`);
  };

  // Send Join Request
  const handleSendRequest = (teamId, attendeeName) => {
    setRequestSent(prev => ({ ...prev, [teamId]: true }));
    soundFx.playNotification();
    addToast(`Join Request sent to team leaders! They will review your skill profile.`, 'success');
    const team = teams.find(t => t.id === teamId);
    if (logActivity && team) logActivity('📩', `Join request sent to ${team.name}`);
  };

  // Filtered Attendees (Free Agents looking for teams)
  const freeAgents = attendees.filter(a => !a.teamId);

  const filteredFreeAgents = freeAgents.filter(a => {
    const matchesSkill = skillFilter === 'All' || a.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
    const matchesTrack = trackFilter === 'All' || a.track === trackFilter;
    const matchesQuery = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSkill && matchesTrack && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Users className="w-6 h-6 text-indigo-400" />
            <span>Smart AI Team Matchmaker & Discovery</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Connect individual hackers based on complementary skill matrices and project track interests.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('matchmaker')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'matchmaker' ? 'bg-indigo-600 text-white shadow-md glow-purple' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Matchmaker Feed</span>
          </button>

          <button
            onClick={() => setViewMode('teams_list')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'teams_list' ? 'bg-indigo-600 text-white shadow-md glow-purple' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All Hackathon Teams ({teams.length})</span>
          </button>

          <button
            onClick={() => setViewMode('create_team')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'create_team' ? 'bg-cyan-500 text-white shadow-md glow-cyan' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Form New Team</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: AI MATCHMAKER FEED */}
      {viewMode === 'matchmaker' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search free agents by skill or role..."
                  className="w-full pl-9 pr-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Tracks</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="FinTech & Web3">FinTech & Web3</option>
                <option value="Health & BioTech">Health & BioTech</option>
                <option value="Sustainability & Green Tech">Sustainability & Green Tech</option>
              </select>

              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Skills</option>
                <option value="React">React</option>
                <option value="Python">Python</option>
                <option value="Figma">Figma</option>
                <option value="Solidity">Solidity</option>
                <option value="Flutter">Flutter</option>
              </select>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              {filteredFreeAgents.length} Free Agent(s) Available
            </span>
          </div>

          {/* Teams Looking for Teammates & Free Agent Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div 
                key={team.id}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-500/30 rounded">
                      {team.track}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{team.tableNumber}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">{team.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{team.tagline}</p>
                  </div>

                  {/* Looking For Skill Tags */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-amber-400 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Actively Looking For:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {team.lookingFor.map((need, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-bold bg-amber-950/80 text-amber-300 rounded border border-amber-500/30">
                          + {need}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Compatibility Badge */}
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">AI Compatibility Score:</span>
                    <span className="text-sm font-extrabold text-emerald-400 font-mono flex items-center space-x-1">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>96% MATCH</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleSendRequest(team.id, 'CurrentUser')}
                  disabled={requestSent[team.id]}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                    requestSent[team.id]
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg glow-purple'
                  }`}
                >
                  {requestSent[team.id] ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Request Pending Approval</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Request to Join Team</span>
                    </>
                  )}
                </button>
              </div>
            ))}

            {/* Free Agent Cards */}
            {filteredFreeAgents.map((agent) => (
              <div 
                key={agent.id}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-md">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{agent.name}</h4>
                      <p className="text-xs text-cyan-400 font-medium">{agent.role}</p>
                      <span className="text-[10px] text-slate-500 font-mono">{agent.track}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">{agent.bio}</p>

                  <div className="flex flex-wrap gap-1">
                    {agent.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] bg-slate-900 text-slate-300 rounded border border-slate-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFx.playNotification();
                    addToast(`Invite sent to ${agent.name}!`, 'success');
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Team Invite</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: ALL TEAMS DIRECTORY */}
      {viewMode === 'teams_list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-500/30 rounded">
                    {team.track}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{team.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{team.tagline}</p>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  {team.tableNumber}
                </span>
              </div>

              {/* Roster & Links */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block">Team Roster:</span>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((memberId) => {
                    const member = attendees.find(a => a.id === memberId);
                    return (
                      <span key={memberId} className="px-2.5 py-1 text-xs bg-slate-900 text-slate-200 rounded-lg border border-slate-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>{member ? member.name : memberId}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {(team.repoUrl || team.demoUrl) && (
                <div className="flex items-center space-x-3 pt-2">
                  {team.repoUrl && (
                    <a href={team.repoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400">
                      <GitBranch className="w-4 h-4" />
                      <span>Code Repository</span>
                    </a>
                  )}
                  {team.demoUrl && (
                    <a href={team.demoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400">
                      <Globe className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: FORM NEW TEAM */}
      {viewMode === 'create_team' && (
        <div className="max-w-2xl mx-auto glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <PlusCircle className="w-6 h-6 text-cyan-400" />
            <span>Register & Publish New Hackathon Team</span>
          </h3>

          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Team Project Name *</label>
              <input
                type="text"
                required
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                placeholder="e.g. NeuralPulse AI"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Tagline & Core Concept Pitch *</label>
              <input
                type="text"
                required
                value={newTeam.tagline}
                onChange={(e) => setNewTeam({ ...newTeam, tagline: e.target.value })}
                placeholder="Autonomous real-time medical triage using multi-modal LLMs..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category Track</label>
                <select
                  value={newTeam.track}
                  onChange={(e) => setNewTeam({ ...newTeam, track: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="FinTech & Web3">FinTech & Web3</option>
                  <option value="Health & BioTech">Health & BioTech</option>
                  <option value="Sustainability & Green Tech">Sustainability & Green Tech</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Table / Zone Location</label>
                <input
                  type="text"
                  value={newTeam.tableNumber}
                  onChange={(e) => setNewTeam({ ...newTeam, tableNumber: e.target.value })}
                  placeholder="Table A-12"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Roles / Skills Actively Needed</label>
              <input
                type="text"
                value={newTeam.lookingFor}
                onChange={(e) => setNewTeam({ ...newTeam, lookingFor: e.target.value })}
                placeholder="e.g. Frontend UI Engineer, Cloud DevOps"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg glow-cyan"
            >
              Publish Team to Matchmaker Portal
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
