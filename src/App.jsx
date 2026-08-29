import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroDashboard from './components/HeroDashboard';
import ArchitectureView from './components/ArchitectureView';
import RegistrationCheckin from './components/RegistrationCheckin';
import TeamMatchmaker from './components/TeamMatchmaker';
import BroadcastCenter from './components/BroadcastCenter';
import EventSchedule from './components/EventSchedule';
import JudgingPortal from './components/JudgingPortal';
import LeaderboardAnalytics from './components/LeaderboardAnalytics';
import ToastContainer from './components/ToastContainer';

import { 
  INITIAL_ATTENDEES, 
  INITIAL_TEAMS, 
  INITIAL_ANNOUNCEMENTS 
} from './data/initialData';
import { soundFx } from './utils/audio';

// ===== localStorage Hook =====
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full — silent fail
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  // Use localStorage for persisted state
  const [currentTab, setCurrentTab] = useLocalStorage('nexus-tab', 'dashboard');
  const [currentRole, setCurrentRole] = useLocalStorage('nexus-role', 'participant');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Persisted Global State Stores
  const [attendees, setAttendees] = useLocalStorage('nexus-attendees', INITIAL_ATTENDEES);
  const [teams, setTeams] = useLocalStorage('nexus-teams', INITIAL_TEAMS);
  const [announcements, setAnnouncements] = useLocalStorage('nexus-announcements', INITIAL_ANNOUNCEMENTS);
  
  // Activity Log (persisted)
  const [activityLog, setActivityLog] = useLocalStorage('nexus-activity', [
    { id: 'init-1', emoji: '🚀', message: 'Nexus Event HQ system initialized', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);

  // Toasts (not persisted — ephemeral)
  const [toasts, setToasts] = useState([
    { id: 't-welcome', message: '🚀 Welcome to Nexus Event HQ! Select a module to get started.', type: 'info' }
  ]);

  // Animation key: forces re-mount on tab change for entry animation
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey(prev => prev + 1);
  }, [currentTab]);

  // Toast Helper
  const addToast = useCallback((message, type = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Activity Logger
  const logActivity = useCallback((emoji, message) => {
    const entry = {
      id: `act-${Date.now()}`,
      emoji,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setActivityLog(prev => [entry, ...prev].slice(0, 50));
  }, [setActivityLog]);

  // Reset All Data
  const handleResetAll = () => {
    if (window.confirm('⚠️ Reset ALL data? This will clear attendees, teams, scores, announcements, and activity. This cannot be undone.')) {
      setAttendees(INITIAL_ATTENDEES);
      setTeams(INITIAL_TEAMS);
      setAnnouncements(INITIAL_ANNOUNCEMENTS);
      setActivityLog([{ id: 'reset-1', emoji: '🔄', message: 'All data reset to defaults', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setCurrentTab('dashboard');
      addToast('🔄 All data has been reset to defaults', 'warning');
    }
  };

  // Sync soundFx toggle
  soundFx.enabled = audioEnabled;

  const checkedInCount = attendees.filter(a => a.checkedIn).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
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
      <div className="bg-slate-900/90 border-b border-slate-800 py-1.5 px-4 text-center text-xs text-slate-300" role="status" aria-live="polite">
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

      {/* Main View Router — Animated transitions via key */}
      <main className="flex-1 pb-16" role="main">
        <div key={animKey} className="animate-fade-slide-in">
          {currentTab === 'dashboard' && (
            <HeroDashboard
              attendees={attendees}
              teams={teams}
              announcements={announcements}
              setCurrentTab={setCurrentTab}
              setCurrentRole={setCurrentRole}
              activityLog={activityLog}
            />
          )}

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
              logActivity={logActivity}
            />
          )}

          {currentTab === 'teams' && (
            <TeamMatchmaker
              attendees={attendees}
              teams={teams}
              setTeams={setTeams}
              setAttendees={setAttendees}
              addToast={addToast}
              logActivity={logActivity}
            />
          )}

          {currentTab === 'broadcast' && (
            <BroadcastCenter
              announcements={announcements}
              setAnnouncements={setAnnouncements}
              currentRole={currentRole}
              addToast={addToast}
              logActivity={logActivity}
            />
          )}

          {currentTab === 'schedule' && (
            <EventSchedule />
          )}

          {currentTab === 'judging' && (
            <JudgingPortal
              teams={teams}
              setTeams={setTeams}
              currentRole={currentRole}
              addToast={addToast}
              logActivity={logActivity}
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
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-6 text-center text-xs text-slate-500" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 NEXUS HQ — Unified Smart Event & Hackathon Platform</p>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 flex items-center space-x-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
            <span className="text-slate-600">|</span>
            <button 
              onClick={handleResetAll}
              className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer underline-offset-2 hover:underline"
              aria-label="Reset all data to defaults"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Notifications Toast Layer */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
