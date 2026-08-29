import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ArchitectureView from './components/ArchitectureView';
import RegistrationCheckin from './components/RegistrationCheckin';
import TeamMatchmaker from './components/TeamMatchmaker';
import BroadcastCenter from './components/BroadcastCenter';
import JudgingPortal from './components/JudgingPortal';
import LeaderboardAnalytics from './components/LeaderboardAnalytics';
import ToastContainer from './components/ToastContainer';

import { 
  INITIAL_ATTENDEES, 
  INITIAL_TEAMS, 
  INITIAL_ANNOUNCEMENTS 
} from './data/initialData';
import { soundFx } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState('architecture');
  const [currentRole, setCurrentRole] = useState('participant');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Global State Stores
  const [attendees, setAttendees] = useState(INITIAL_ATTENDEES);
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [toasts, setToasts] = useState([
    { id: 't-welcome', message: '🚀 Welcome to Nexus Event HQ! Select a persona or component above to start.', type: 'info' }
  ]);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync soundFx toggle
  soundFx.enabled = audioEnabled;

  const checkedInCount = attendees.filter(a => a.checkedIn).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        totalAttendees={attendees.length}
        checkedInCount={checkedInCount}
      />

      {/* Role Context Bar Indicator */}
      <div className="bg-slate-900/90 border-b border-slate-800 py-1.5 px-4 text-center text-xs text-slate-300">
        <span className="font-mono text-cyan-400">ACTIVE ROLE: </span>
        <strong className="uppercase tracking-wide text-white">{currentRole} MODE</strong>
        <span className="text-slate-500 mx-2">•</span>
        <span className="text-slate-400">
          {currentRole === 'participant' && 'Viewing attendee badge, team matchmaker & public announcements'}
          {currentRole === 'judge' && 'Evaluating assigned submissions using weighted 4-criteria rubrics'}
          {currentRole === 'gatekeeper' && 'Scanning attendee QR codes for fast gate verification'}
          {currentRole === 'organizer' && 'Managing real-time broadcasts, check-in velocity & leaderboard'}
        </span>
      </div>

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {currentTab === 'architecture' && (
          <ArchitectureView 
            setCurrentTab={setCurrentTab} 
            setCurrentRole={setCurrentRole} 
          />
        )}

        {currentTab === 'checkin' && (
          <RegistrationCheckin
            attendees={attendees}
            setAttendees={setAttendees}
            currentRole={currentRole}
            addToast={addToast}
          />
        )}

        {currentTab === 'teams' && (
          <TeamMatchmaker
            attendees={attendees}
            teams={teams}
            setTeams={setTeams}
            setAttendees={setAttendees}
            addToast={addToast}
          />
        )}

        {currentTab === 'broadcast' && (
          <BroadcastCenter
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            currentRole={currentRole}
            addToast={addToast}
          />
        )}

        {currentTab === 'judging' && (
          <JudgingPortal
            teams={teams}
            setTeams={setTeams}
            currentRole={currentRole}
            addToast={addToast}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardAnalytics
            teams={teams}
            attendees={attendees}
            announcements={announcements}
            currentRole={currentRole}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 NEXUS HQ — Unified Smart Event & Hackathon Platform</p>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 flex items-center space-x-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Winner Hackathon Edition</span>
          </div>
        </div>
      </footer>

      {/* Floating Notifications Toast Layer */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
