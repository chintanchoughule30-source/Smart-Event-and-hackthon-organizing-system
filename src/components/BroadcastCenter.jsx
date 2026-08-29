import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  AlertTriangle, 
  Calendar, 
  Utensils, 
  Award, 
  Radio, 
  Volume2, 
  Clock, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function BroadcastCenter({ 
  announcements, 
  setAnnouncements, 
  currentRole, 
  addToast 
}) {
  const [filter, setFilter] = useState('All');

  // Broadcast Composer Form (Organizer Mode)
  const [newBroadcast, setNewBroadcast] = useState({
    title: '',
    message: '',
    category: 'Urgent Alert',
    priority: 'high'
  });

  const handleDispatchBroadcast = (e) => {
    e.preventDefault();
    if (!newBroadcast.title || !newBroadcast.message) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const broadcastObj = {
      id: `ann-${Date.now()}`,
      title: newBroadcast.title,
      message: newBroadcast.message,
      timestamp: timeNow,
      priority: newBroadcast.priority,
      category: newBroadcast.category,
      author: 'Organizer HQ'
    };

    setAnnouncements([broadcastObj, ...announcements]);
    soundFx.playNotification();
    addToast(`📢 BROADCAST DISPATCHED: "${newBroadcast.title}"`, 'warning');

    setNewBroadcast({
      title: '',
      message: '',
      category: 'Urgent Alert',
      priority: 'high'
    });
  };

  const categoryIcons = {
    'Urgent Alert': AlertTriangle,
    'Food & Refreshments': Utensils,
    'Schedule Update': Calendar,
    'Stage Call': Award,
    'Mentorship': Sparkles
  };

  const filteredAnnouncements = announcements.filter(a => 
    filter === 'All' || a.category === filter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Radio className="w-6 h-6 text-amber-400 animate-pulse" />
            <span>Broadcast & Announcement Center</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Real-time push notifications feed for schedule updates, venue alerts, and critical announcements.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {['All', 'Urgent Alert', 'Food & Refreshments', 'Mentorship'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === cat ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ORGANIZER DISPATCH TOOL (Visible if role is organizer or always accessible in hackathon demo) */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-white text-base">Dispatch Live Broadcast</h3>
          </div>

          <form onSubmit={handleDispatchBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Broadcast Title *</label>
              <input
                type="text"
                required
                value={newBroadcast.title}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })}
                placeholder="e.g. 🚨 Final Demo Video Upload Deadline!"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newBroadcast.category}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="Urgent Alert">Urgent Alert</option>
                  <option value="Food & Refreshments">Food & Refreshments</option>
                  <option value="Schedule Update">Schedule Update</option>
                  <option value="Stage Call">Stage Call</option>
                  <option value="Mentorship">Mentorship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Priority</label>
                <select
                  value={newBroadcast.priority}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, priority: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="high">High (🚨 Alert Chime)</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Message Content *</label>
              <textarea
                rows="4"
                required
                value={newBroadcast.message}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, message: e.target.value })}
                placeholder="Type critical announcement details..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black rounded-xl text-xs transition shadow-lg glow-purple flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Real-Time Alert</span>
            </button>
          </form>
        </div>

        {/* ANNOUNCEMENT FEED LIST */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAnnouncements.map((ann) => {
            const IconComponent = categoryIcons[ann.category] || Bell;
            const isHigh = ann.priority === 'high';

            return (
              <div 
                key={ann.id}
                className={`glass-panel p-6 rounded-2xl border transition-all ${
                  isHigh 
                    ? 'border-amber-500/50 bg-amber-950/20 glow-purple' 
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <span className={`p-2.5 rounded-xl ${
                      isHigh ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-400'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </span>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                          isHigh ? 'bg-amber-950 text-amber-400 border border-amber-500/40' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {ann.category}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{ann.timestamp}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mt-1.5">{ann.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ann.message}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">
                    By: {ann.author}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
