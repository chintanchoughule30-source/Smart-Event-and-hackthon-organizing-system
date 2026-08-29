import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Gavel, 
  Award, 
  CheckCircle2, 
  Lock, 
  GitBranch, 
  Globe, 
  Sliders, 
  MessageSquare, 
  Zap, 
  Star,
  Layers,
  Sparkles
} from 'lucide-react';
import { RUBRICS } from '../data/initialData';
import { soundFx } from '../utils/audio';

export default function JudgingPortal({ 
  teams, 
  setTeams, 
  currentRole, 
  addToast,
  logActivity 
}) {
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id || null);

  const selectedTeam = teams.find(t => t.id === selectedTeamId) || teams[0];

  // Interactive Scoring Form state for selected team
  const [scores, setScores] = useState({
    innovation: selectedTeam?.scores?.innovation || 8,
    execution: selectedTeam?.scores?.execution || 8,
    design: selectedTeam?.scores?.design || 8,
    pitch: selectedTeam?.scores?.pitch || 8,
    comments: selectedTeam?.scores?.comments || 'Solid presentation with functioning demo.'
  });

  // Calculate weighted score (0 - 100)
  const calculateTotalScore = (scoreObj) => {
    const rawSum = 
      (scoreObj.innovation * 10 * 0.30) +
      (scoreObj.execution * 10 * 0.30) +
      (scoreObj.design * 10 * 0.20) +
      (scoreObj.pitch * 10 * 0.20);
    return Math.round(rawSum);
  };

  const currentTotalScore = calculateTotalScore(scores);

  // Switch Selected Team
  const handleSelectTeam = (team) => {
    setSelectedTeamId(team.id);
    setScores({
      innovation: team.scores?.innovation || 8,
      execution: team.scores?.execution || 8,
      design: team.scores?.design || 8,
      pitch: team.scores?.pitch || 8,
      comments: team.scores?.comments || ''
    });
  };

  // Submit and Lock Scores
  const handleSubmitScores = (e) => {
    e.preventDefault();
    if (!selectedTeam) return;

    const updatedTeams = teams.map(t => {
      if (t.id === selectedTeam.id) {
        return {
          ...t,
          scores: { ...scores },
          totalScore: currentTotalScore,
          judged: true,
          judgedBy: 'Dr. Evelyn Reed (Lead Judge)'
        };
      }
      return t;
    });

    setTeams(updatedTeams);
    soundFx.playFanfare();

    // Trigger Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti playback', err);
    }

    addToast(`🏆 Scores LOCKED for team "${selectedTeam.name}" (${currentTotalScore}/100)! Leaderboard updated live.`, 'success');
    if (logActivity) logActivity('⚖️', `Score locked for ${selectedTeam.name}: ${currentTotalScore}/100`);
  };

  const judgedCount = teams.filter(t => t.judged).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Gavel className="w-6 h-6 text-purple-400" />
            <span>Interactive Judging Portal & Rubrics</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Evaluate hackathon team submissions against weighted criteria and submit locked scores to the live leaderboard.
          </p>
        </div>

        {/* Judge Progress Meter */}
        <div className="glass-panel px-4 py-2 rounded-xl border border-slate-800 flex items-center space-x-3 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 block font-medium">Judge Submission Progress:</span>
            <div className="w-36 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                style={{ width: `${(judgedCount / teams.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="font-mono font-bold text-purple-400 text-sm">{judgedCount}/{teams.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TEAM SUBMISSIONS ROSTER */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center space-x-2">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Assigned Team Projects ({teams.length})</span>
          </h3>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {teams.map((t) => {
              const isSelected = t.id === selectedTeam.id;
              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectTeam(t)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/70 border-purple-500 shadow-lg shadow-purple-950/50 glow-purple'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-800 text-slate-300 rounded">
                      {t.track}
                    </span>
                    {t.judged ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Score: {t.totalScore}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-500/30 rounded">
                        Pending Evaluation
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">{t.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RUBRICS EVALUATION PANEL */}
        {selectedTeam && (
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            {/* Team Details & Demo Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-purple-950 text-purple-400 border border-purple-500/30 rounded">
                  TABLE: {selectedTeam.tableNumber} | TRACK: {selectedTeam.track}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{selectedTeam.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedTeam.tagline}</p>
              </div>

              {/* Total Score Meter */}
              <div className="bg-slate-900/90 px-5 py-3 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Weighted Score</span>
                <span className="text-3xl font-black text-cyan-400 font-mono">{currentTotalScore}</span>
                <span className="text-[10px] text-slate-500 block">out of 100</span>
              </div>
            </div>

            {/* Rubric Sliders */}
            <form onSubmit={handleSubmitScores} className="space-y-6">
              <div className="space-y-5">
                {RUBRICS.map((rubric) => {
                  const currentVal = scores[rubric.id] || 0;
                  return (
                    <div key={rubric.id} className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-bold text-white">{rubric.name}</label>
                          <span className="text-[11px] text-purple-400 ml-2 font-mono">({rubric.weight * 100}% Weight)</span>
                        </div>
                        <span className="text-sm font-extrabold text-cyan-400 font-mono bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                          {currentVal} / {rubric.maxScore}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400">{rubric.description}</p>

                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={currentVal}
                        onChange={(e) => setScores({ ...scores, [rubric.id]: Number(e.target.value) })}
                        className="w-full accent-cyan-400 bg-slate-950 rounded-lg cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Structured Feedback Comment Box */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span>Judge Structured Written Feedback</span>
                </label>
                <textarea
                  rows="3"
                  value={scores.comments}
                  onChange={(e) => setScores({ ...scores, comments: e.target.value })}
                  placeholder="Provide constructive feedback regarding project execution, architecture, or demo presentation..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
                ></textarea>
              </div>

              {/* Submit & Lock Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-xl text-sm transition shadow-xl shadow-purple-950/50 glow-purple flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Submit & Securely Lock Score ({currentTotalScore}/100)</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
