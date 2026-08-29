import React, { useState } from 'react';
import { 
  Layers, 
  Users, 
  Gavel, 
  ShieldCheck, 
  QrCode, 
  Cpu, 
  Radio, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Database,
  Lock,
  Workflow
} from 'lucide-react';

export default function ArchitectureView({ setCurrentTab, setCurrentRole }) {
  const [selectedNode, setSelectedNode] = useState('qr');

  const nodes = {
    qr: {
      title: 'QR Gate & Verification Pipeline',
      role: 'Gatekeeper / Participant',
      protocol: 'WebRTC / Camera API + AES-256 Signature',
      latency: '< 50ms',
      description: 'Generates cryptographic signed QR code badges upon registration. Scanned at venue gate via mobile camera or optical scanner. Automatically updates check-in velocity & organizer attendance metrics in real-time.',
      features: ['Offline-first cryptographic verification', 'Instant Web Audio feedback chime', 'Automatic badge PDF print generator', 'Live check-in velocity chart stream'],
      targetTab: 'checkin',
      targetRole: 'gatekeeper'
    },
    matchmaker: {
      title: 'AI Smart Team Matchmaker',
      role: 'Participant',
      protocol: 'Cosine Skill Similarity & Gap Analysis Algorithm',
      latency: '15ms computation',
      description: 'Dynamic team discovery engine that computes skill matrix complementarity between solo hackers and existing teams looking for specific roles (e.g. AI Dev + UI/UX Designer + Fullstack).',
      features: ['Automated compatibility percentage scoring', 'Filter by project track & missing roles', 'One-click invite & join request dispatch', 'Real-time team roster locking'],
      targetTab: 'teams',
      targetRole: 'participant'
    },
    broadcast: {
      title: 'Realtime Broadcast & Notification Mesh',
      role: 'Organizer -> All Personas',
      protocol: 'WebSocket Push Feed / Web Notification API',
      latency: '< 10ms broadcast dispatch',
      description: 'Centralized broadcast dispatch system allowing organizers to trigger priority alerts (Urgent 🚨, Schedule 📅, Food 🍕, Stage Call 🏆) across all connected participant & judge screens.',
      features: ['Urgency level categorization', 'Synthesized Web Audio alert chime', 'Organizer one-click emergency dispatch', 'Persistent audit trail log'],
      targetTab: 'broadcast',
      targetRole: 'organizer'
    },
    judging: {
      title: 'Weighted Rubric Judging Engine',
      role: 'Judge',
      protocol: 'Realtime Immutable Score Calculator & Lock Engine',
      latency: 'Instant score aggregation',
      description: 'Structured evaluation portal for hackathon judges. Calculates multi-criteria weighted scores (Innovation 30%, Execution 30%, Design 20%, Pitch 20%) with lock-in verification to prevent tampering.',
      features: ['Dynamic slider input controls', 'Auto-weighted overall score algorithm', 'Structured written feedback lock', 'Real-time submission progress bar'],
      targetTab: 'judging',
      targetRole: 'judge'
    },
    leaderboard: {
      title: 'Dynamic Leaderboard & Organizer Command Center',
      role: 'Organizer / Public Audience',
      protocol: 'Reactive Score Stream & Recharts Analytics Engine',
      latency: 'Real-time position re-ordering',
      description: 'Consolidated analytics hub and live ranking podium. As judges submit scores, team positions shift dynamically with celebratory confetti for top rankers alongside attendance metrics.',
      features: ['Real-time animated rank position shifts', 'Category track filter overlays', 'Check-in velocity & skill matrix analytics', 'Podium spotlight (Gold, Silver, Bronze)'],
      targetTab: 'leaderboard',
      targetRole: 'organizer'
    }
  };

  const activeNodeInfo = nodes[selectedNode];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                <Workflow className="w-6 h-6" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">System Architecture & Multi-Role Wireframe</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-2xl">
              Consolidated real-time architecture connecting **Participant**, **Judge**, and **Organizer** workflows into a unified event engine. Click any system component below to explore its data flow specs.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-xs text-slate-300">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>State Engine: <strong>Synchronized</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive System Flow Map */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-slate-200 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span>Interactive Event Lifecycle Pipeline</span>
        </h3>

        {/* Pipeline Nodes Map */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div 
            onClick={() => setSelectedNode('qr')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedNode === 'qr'
                ? 'bg-cyan-950/70 border-cyan-500 shadow-lg shadow-cyan-950/50 glow-cyan'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-cyan-900/50 text-cyan-400">
                <QrCode className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded">01 GATE</span>
            </div>
            <h4 className="font-bold text-sm text-white mb-1">Registration & QR Scan</h4>
            <p className="text-xs text-slate-400 line-clamp-2">Instant check-in verification and badge printing.</p>
          </div>

          <div 
            onClick={() => setSelectedNode('matchmaker')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedNode === 'matchmaker'
                ? 'bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-950/50 glow-purple'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-indigo-900/50 text-indigo-400">
                <Users className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded">02 TEAM</span>
            </div>
            <h4 className="font-bold text-sm text-white mb-1">AI Team Matchmaker</h4>
            <p className="text-xs text-slate-400 line-clamp-2">Skill matrix compatibility & team formation.</p>
          </div>

          <div 
            onClick={() => setSelectedNode('broadcast')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedNode === 'broadcast'
                ? 'bg-amber-950/70 border-amber-500 shadow-lg shadow-amber-950/50 glow-purple'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-amber-900/50 text-amber-400">
                <Radio className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded">03 PUSH</span>
            </div>
            <h4 className="font-bold text-sm text-white mb-1">Broadcast Engine</h4>
            <p className="text-xs text-slate-400 line-clamp-2">Live announcements and push alerts feed.</p>
          </div>

          <div 
            onClick={() => setSelectedNode('judging')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedNode === 'judging'
                ? 'bg-purple-950/70 border-purple-500 shadow-lg shadow-purple-950/50 glow-purple'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-purple-900/50 text-purple-400">
                <Gavel className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded">04 SCORE</span>
            </div>
            <h4 className="font-bold text-sm text-white mb-1">Judging Rubrics</h4>
            <p className="text-xs text-slate-400 line-clamp-2">Weighted scoring rubrics & feedback locks.</p>
          </div>

          <div 
            onClick={() => setSelectedNode('leaderboard')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedNode === 'leaderboard'
                ? 'bg-emerald-950/70 border-emerald-500 shadow-lg shadow-emerald-950/50 glow-emerald'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-emerald-900/50 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded">05 RANK</span>
            </div>
            <h4 className="font-bold text-sm text-white mb-1">Live Leaderboard</h4>
            <p className="text-xs text-slate-400 line-clamp-2">Real-time rank updates & organizer metrics.</p>
          </div>
        </div>

        {/* Selected Component Details Box */}
        <div className="bg-slate-900/90 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded-md">
                  ROLE: {activeNodeInfo.role}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-mono bg-slate-800 text-slate-300 rounded-md">
                  LATENCY: {activeNodeInfo.latency}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mt-1">{activeNodeInfo.title}</h4>
            </div>
            <button
              onClick={() => {
                setCurrentTab(activeNodeInfo.targetTab);
                setCurrentRole(activeNodeInfo.targetRole);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg text-xs font-bold transition shadow-lg"
            >
              <span>Launch Live Component</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{activeNodeInfo.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {activeNodeInfo.features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Protocol: {activeNodeInfo.protocol}</span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted Realtime Channel</span>
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Role Persona Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400">
            <Users className="w-6 h-6" />
            <h3 className="font-bold text-white text-lg">Participant Flow</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">1.</span>
              <span>Register profile, select skills, track, and generate unique QR badge.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">2.</span>
              <span>Use AI Matchmaker to find teammates with complementary skill sets.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">3.</span>
              <span>Receive live broadcast alerts for schedule, food, and judging calls.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">4.</span>
              <span>Track team ranking in real-time on the live leaderboard.</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3 text-purple-400">
            <Gavel className="w-6 h-6" />
            <h3 className="font-bold text-white text-lg">Judge Flow</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-purple-400 font-bold">1.</span>
              <span>Access assigned team project roster with GitHub links and demo videos.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-400 font-bold">2.</span>
              <span>Score teams on 4 standardized weighted criteria sliders (Innovation, Complexity, Design, Pitch).</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-400 font-bold">3.</span>
              <span>Add structured written comments and lock scores securely.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-400 font-bold">4.</span>
              <span>Instantly trigger real-time leaderboard rank adjustments.</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3 text-amber-400">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="font-bold text-white text-lg">Organizer Flow</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">1.</span>
              <span>Scan participant QR badges at event gate using live camera scanner.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">2.</span>
              <span>Dispatch real-time broadcast announcements with urgency levels.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">3.</span>
              <span>Monitor check-in velocity, skill distributions, and team saturation.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-400 font-bold">4.</span>
              <span>Export final results & manage podium announcements.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
