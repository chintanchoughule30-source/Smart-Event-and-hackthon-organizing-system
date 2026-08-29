import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Circle,
  Coffee,
  Code2,
  Mic,
  Trophy,
  Users,
  Utensils,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SCHEDULE_DATA = [
  {
    id: 'reg',
    time: '08:00 AM — 09:00 AM',
    title: 'Registration & Check-In Opens',
    description: 'Badge collection, QR code activation, and venue orientation. Pick up your swag bag!',
    location: 'Main Lobby',
    category: 'registration',
    icon: Users,
    color: 'cyan',
    status: 'completed'
  },
  {
    id: 'opening',
    time: '09:00 AM — 09:45 AM',
    title: 'Opening Ceremony & Keynote',
    description: 'Welcome address, sponsor introductions, and challenge reveal. Special keynote on "Building with AI Agents."',
    location: 'Main Auditorium',
    category: 'ceremony',
    icon: Mic,
    color: 'purple',
    status: 'completed'
  },
  {
    id: 'team',
    time: '09:45 AM — 10:30 AM',
    title: 'Team Formation & Matchmaking',
    description: 'Use the AI Team Matchmaker to find teammates based on skill compatibility. Solo hackers meet in Breakout Room A.',
    location: 'Breakout Rooms A & B',
    category: 'teams',
    icon: Users,
    color: 'indigo',
    status: 'completed'
  },
  {
    id: 'hack1',
    time: '10:30 AM — 01:00 PM',
    title: 'Hacking Sprint #1',
    description: 'Heads-down building time. Set up repos, scaffold projects, and start coding your MVP. Mentors available on-demand.',
    location: 'All Hacking Zones',
    category: 'hacking',
    icon: Code2,
    color: 'emerald',
    status: 'active'
  },
  {
    id: 'lunch',
    time: '01:00 PM — 02:00 PM',
    title: 'Lunch Break & Networking',
    description: 'Catered lunch with vegetarian, vegan, and gluten-free options. Networking lounge open on 2nd floor.',
    location: 'Cafeteria Hall B',
    category: 'food',
    icon: Utensils,
    color: 'amber',
    status: 'upcoming'
  },
  {
    id: 'mentor',
    time: '02:00 PM — 03:00 PM',
    title: 'Mentor Office Hours',
    description: 'Book 15-minute slots with industry mentors from AWS, Google, OpenAI, and Stripe. First-come, first-served.',
    location: 'Rooms 301-305',
    category: 'mentorship',
    icon: Sparkles,
    color: 'rose',
    status: 'upcoming'
  },
  {
    id: 'hack2',
    time: '03:00 PM — 06:00 PM',
    title: 'Hacking Sprint #2',
    description: 'Final push! Polish your MVP, prepare your demo, and commit your code. Code freeze at 6:00 PM sharp.',
    location: 'All Hacking Zones',
    category: 'hacking',
    icon: Code2,
    color: 'emerald',
    status: 'upcoming'
  },
  {
    id: 'coffee',
    time: '06:00 PM — 06:30 PM',
    title: 'Coffee Break & Demo Prep',
    description: 'Espresso bar & snacks. Finalize your slides and demo script. Upload your submission to the Judging Portal.',
    location: 'Main Lobby',
    category: 'food',
    icon: Coffee,
    color: 'amber',
    status: 'upcoming'
  },
  {
    id: 'judging',
    time: '06:30 PM — 08:00 PM',
    title: 'Judging & Presentations',
    description: 'Each team gets 5 minutes to present + 2 minutes Q&A. Judges score using weighted rubrics (Innovation, Execution, Design, Pitch).',
    location: 'Main Auditorium',
    category: 'judging',
    icon: Trophy,
    color: 'purple',
    status: 'upcoming'
  },
  {
    id: 'awards',
    time: '08:00 PM — 09:00 PM',
    title: 'Awards Ceremony & Closing',
    description: 'Winner announcements, prize distribution, and closing remarks. After-party details announced!',
    location: 'Main Auditorium',
    category: 'ceremony',
    icon: Trophy,
    color: 'amber',
    status: 'upcoming'
  }
];

const colorMap = {
  cyan: { bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', text: 'text-cyan-400', dot: 'bg-cyan-400', glow: 'shadow-cyan-500/20' },
  purple: { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-400', glow: 'shadow-purple-500/20' },
  indigo: { bg: 'bg-indigo-500/15', border: 'border-indigo-500/30', text: 'text-indigo-400', dot: 'bg-indigo-400', glow: 'shadow-indigo-500/20' },
  emerald: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400', glow: 'shadow-emerald-500/20' },
  amber: { bg: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-400', glow: 'shadow-amber-500/20' },
  rose: { bg: 'bg-rose-500/15', border: 'border-rose-500/30', text: 'text-rose-400', dot: 'bg-rose-400', glow: 'shadow-rose-500/20' }
};

export default function EventSchedule() {
  const [expandedId, setExpandedId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const activeIndex = SCHEDULE_DATA.findIndex(s => s.status === 'active');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-slide-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-3">
          <Calendar className="w-3.5 h-3.5" />
          EVENT TIMELINE
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Event Schedule</h2>
        <p className="text-slate-400 text-sm">
          Full day agenda with real-time tracking • {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-xs">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </div>
          <span className="text-slate-400">In Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Circle className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-400">Upcoming</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[23px] sm:left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/60 via-purple-500/40 to-slate-800/20" />

        <div className="space-y-3">
          {SCHEDULE_DATA.map((item, index) => {
            const Icon = item.icon;
            const colors = colorMap[item.color];
            const isExpanded = expandedId === item.id;
            const isActive = item.status === 'active';
            const isCompleted = item.status === 'completed';

            return (
              <div 
                key={item.id}
                className={`relative pl-14 sm:pl-16 animate-fade-slide-in`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-3 sm:left-4 top-4 z-10 flex items-center justify-center`}>
                  {isActive ? (
                    <div className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500 items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-white" />
                      </span>
                    </div>
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-600 bg-slate-900" />
                  )}
                </div>

                {/* Card */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className={`w-full text-left glass-panel rounded-xl p-4 transition-all duration-300 
                    ${isActive ? `border-cyan-500/40 ${colors.glow} shadow-lg` : 'border-slate-800/60'}
                    ${isCompleted ? 'opacity-70' : 'opacity-100'}
                    hover:border-slate-600/60 hover:bg-slate-800/40 group`}
                  aria-label={`${item.title} — ${item.time}`}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border} shrink-0`}>
                        <Icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-mono ${isActive ? 'text-cyan-400' : 'text-slate-500'} mb-0.5 flex items-center gap-1.5`}>
                          <Clock className="w-3 h-3" />
                          {item.time}
                          {isActive && (
                            <span className="ml-2 px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold uppercase tracking-wider animate-pulse">
                              NOW
                            </span>
                          )}
                        </div>
                        <h3 className={`text-sm font-semibold ${isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className={`p-1 rounded transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-700/40 animate-fade-slide-in">
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">{item.description}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
