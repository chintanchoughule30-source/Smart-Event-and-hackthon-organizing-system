import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, 
  UserPlus, 
  CheckCircle, 
  Camera, 
  Search, 
  Printer, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  Zap,
  Clock,
  UserCheck,
  Download
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function RegistrationCheckin({ 
  attendees, 
  setAttendees, 
  currentRole, 
  addToast,
  logActivity
}) {
  const [activeTab, setActiveTab] = useState('register'); // 'register' | 'badge' | 'scanner'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Frontend / UI Engineer',
    track: 'AI & Machine Learning',
    skills: 'React, TypeScript, Tailwind',
    bio: 'Excited to hack and build AI agents!'
  });

  const [registeredAttendee, setRegisteredAttendee] = useState(attendees[0] || null);

  // Scanner Simulator State
  const [scannedQr, setScannedQr] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // Handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newId = `ATT-${Math.floor(1000 + Math.random() * 9000)}`;
    const skillList = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    const newQr = `NEXUS-${newId}-${formData.name.toUpperCase().replace(/\s+/g, '-')}`;

    const newAttendee = {
      id: newId,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      track: formData.track,
      skills: skillList,
      bio: formData.bio,
      checkedIn: false,
      checkInTime: null,
      teamId: null,
      teamName: null,
      qrCode: newQr
    };

    setAttendees([newAttendee, ...attendees]);
    setRegisteredAttendee(newAttendee);
    setActiveTab('badge');
    addToast(`Registration Successful! QR Code generated for ${formData.name}`, 'success');
    if (logActivity) logActivity('📝', `New attendee registered: ${formData.name} (${formData.role})`);
  };

  // Handle Scan Verification
  const verifyAndCheckIn = (qrCodeString) => {
    const attendee = attendees.find(a => a.qrCode === qrCodeString || a.id === qrCodeString);

    if (attendee) {
      if (attendee.checkedIn) {
        setScanResult({
          status: 'already_checked_in',
          message: `${attendee.name} is ALREADY checked in!`,
          attendee
        });
        addToast(`${attendee.name} already checked in at ${attendee.checkInTime}`, 'info');
      } else {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedAttendees = attendees.map(a => 
          a.id === attendee.id ? { ...a, checkedIn: true, checkInTime: timeNow } : a
        );
        setAttendees(updatedAttendees);
        setScanResult({
          status: 'success',
          message: `Check-in SUCCESSFUL for ${attendee.name}!`,
          attendee: { ...attendee, checkedIn: true, checkInTime: timeNow }
        });
        soundFx.playCheckinSuccess();
        addToast(`🎉 Check-in verified for ${attendee.name}!`, 'success');
        if (logActivity) logActivity('✅', `Attendee checked in: ${attendee.name} via QR scan`);
      }
    } else {
      setScanResult({
        status: 'error',
        message: 'Invalid QR Code! Attendee not found in system registry.',
        attendee: null
      });
      addToast('Invalid QR Code Scanned!', 'error');
    }
  };

  // Export Attendees CSV
  const handleExportAttendeesCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Track', 'Skills', 'Checked In', 'Check-In Time', 'Team'];
    const rows = attendees.map(a => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.email.replace(/"/g, '""')}"`,
      `"${a.role.replace(/"/g, '""')}"`,
      `"${a.track.replace(/"/g, '""')}"`,
      `"${(a.skills || []).join('; ')}"`,
      a.checkedIn ? 'Yes' : 'No',
      `"${a.checkInTime || ''}"`,
      `"${a.teamName || 'None'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nexus_attendees_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle Manual Check-In
  const toggleManualCheckin = (id) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated = attendees.map(a => {
      if (a.id === id) {
        const nextStatus = !a.checkedIn;
        if (nextStatus) soundFx.playCheckinSuccess();
        return { ...a, checkedIn: nextStatus, checkInTime: nextStatus ? timeNow : null };
      }
      return a;
    });
    setAttendees(updated);
  };

  const filteredAttendees = attendees.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.track.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Sub Header / Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <QrCode className="w-6 h-6 text-cyan-400" />
            <span>Registration & Fast Check-In Portal</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Generate digital QR passes or scan attendee badges for live venue gate verification.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('register')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'register' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Attendee</span>
          </button>

          <button
            onClick={() => setActiveTab('badge')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'badge' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital Badge</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'scanner' ? 'bg-emerald-500 text-white shadow-md glow-emerald' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Gate QR Scanner</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: REGISTRATION FORM */}
      {activeTab === 'register' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Participant Fast Registration</span>
            </h3>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@hackathon.dev"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Frontend / UI Engineer">Frontend / UI Engineer</option>
                    <option value="AI / Backend Engineer">AI / Backend Engineer</option>
                    <option value="UX / Product Designer">UX / Product Designer</option>
                    <option value="Data Scientist & ML Developer">Data Scientist & ML Developer</option>
                    <option value="Mobile Dev (Flutter / iOS)">Mobile Dev (Flutter / iOS)</option>
                    <option value="Fullstack Engineer">Fullstack Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Project Track Interest</label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="FinTech & Web3">FinTech & Web3</option>
                    <option value="Health & BioTech">Health & BioTech</option>
                    <option value="Sustainability & Green Tech">Sustainability & Green Tech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Technical Skills (Comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g. React, Python, PyTorch, Figma"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Bio / Project Pitch Ideas</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief summary of what you want to build or what kind of team you are looking for..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-cyan-950/50 glow-cyan flex items-center justify-center space-x-2"
              >
                <QrCode className="w-5 h-5" />
                <span>Complete Registration & Generate QR Pass</span>
              </button>
            </form>
          </div>

          {/* Quick Preview Card */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Badge Preview</h4>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xl font-extrabold text-white shadow-md">
                  {formData.name ? formData.name.charAt(0) : 'N'}
                </div>
                <div>
                  <h5 className="font-bold text-white text-base">{formData.name || 'Participant Name'}</h5>
                  <p className="text-xs text-cyan-400">{formData.role}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{formData.track}</p>
                </div>

                <div className="bg-white p-3 rounded-lg inline-block shadow-inner">
                  <QRCodeSVG value={`NEXUS-DEMO-${formData.name || 'GUEST'}`} size={120} />
                </div>
                <p className="text-[10px] font-mono text-slate-500">ID: ATT-TEMP-PREVIEW</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: DIGITAL BADGE VIEW & PRINT */}
      {activeTab === 'badge' && registeredAttendee && (
        <div className="max-w-md mx-auto glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded-md">
              NEXUS OFFICIAL HACKATHON PASS
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
              registeredAttendee.checkedIn ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
            }`}>
              {registeredAttendee.checkedIn ? `CHECKED IN (${registeredAttendee.checkInTime})` : 'PENDING CHECK-IN'}
            </span>
          </div>

          {/* Badge Layout */}
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl glow-cyan">
              {registeredAttendee.name.charAt(0)}
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">{registeredAttendee.name}</h3>
              <p className="text-sm font-semibold text-cyan-400">{registeredAttendee.role}</p>
              <p className="text-xs text-slate-400">{registeredAttendee.email}</p>
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl border-4 border-slate-800">
              <QRCodeSVG value={registeredAttendee.qrCode} size={180} />
            </div>

            <p className="text-xs font-mono text-slate-400 bg-slate-900 py-1 px-3 rounded-lg border border-slate-800 inline-block">
              {registeredAttendee.qrCode}
            </p>

            <div className="flex flex-wrap gap-1.5 justify-center pt-2">
              {registeredAttendee.skills.map((skill, idx) => (
                <span key={idx} className="px-2 py-0.5 text-[10px] font-medium bg-slate-900 text-slate-300 rounded border border-slate-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-center space-x-3">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Badge</span>
            </button>
            <button
              onClick={() => verifyAndCheckIn(registeredAttendee.qrCode)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition glow-emerald"
            >
              <UserCheck className="w-4 h-4" />
              <span>Test Self Check-In</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: GATE SCANNER MODE (ORGANIZER & GATEKEEPER) */}
      {activeTab === 'scanner' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scanner Simulation Box */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                <span>Venue Gate QR Scanner Console</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>GATE SCANNER ONLINE</span>
              </span>
            </div>

            {/* Quick Test Scanner Controls */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
              <label className="block text-xs font-medium text-slate-300">
                Simulated Scan Input (Paste or Select Attendee Code to Verify)
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={scannedQr}
                  onChange={(e) => setScannedQr(e.target.value)}
                  placeholder="e.g. NEXUS-ATT-101-SARAH-CHEN or ATT-101"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => verifyAndCheckIn(scannedQr)}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition glow-emerald flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Scan</span>
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-2">Click to Quick-Scan Attendee Badge:</span>
                <div className="flex flex-wrap gap-2">
                  {attendees.slice(0, 6).map((att) => (
                    <button
                      key={att.id}
                      onClick={() => {
                        setScannedQr(att.qrCode);
                        verifyAndCheckIn(att.qrCode);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition ${
                        att.checkedIn 
                          ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200' 
                          : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                      }`}
                    >
                      {att.name} ({att.checkedIn ? 'Checked-In' : 'Pending'})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scan Output Feedback Box */}
            {scanResult && (
              <div className={`p-6 rounded-xl border transition-all ${
                scanResult.status === 'success'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 glow-emerald'
                  : scanResult.status === 'already_checked_in'
                  ? 'bg-amber-950/80 border-amber-500 text-amber-100'
                  : 'bg-rose-950/80 border-rose-500 text-rose-100'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                    {scanResult.status === 'success' && <CheckCircle className="w-8 h-8 text-emerald-400" />}
                    {scanResult.status === 'already_checked_in' && <Clock className="w-8 h-8 text-amber-400" />}
                    {scanResult.status === 'error' && <ShieldCheck className="w-8 h-8 text-rose-400" />}
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-base">{scanResult.message}</h4>
                    {scanResult.attendee && (
                      <div className="text-xs space-y-1 pt-1 opacity-90">
                        <p><strong>Name:</strong> {scanResult.attendee.name} ({scanResult.attendee.id})</p>
                        <p><strong>Role:</strong> {scanResult.attendee.role} | <strong>Track:</strong> {scanResult.attendee.track}</p>
                        <p><strong>Status:</strong> {scanResult.attendee.checkedIn ? `Checked In at ${scanResult.attendee.checkInTime}` : 'Pending'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Attendee Directory & Manual Gate Overrides */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Attendee Directory</h4>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportAttendeesCSV}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition cursor-pointer"
                  title="Export Attendees as CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <span className="text-xs text-slate-400">{attendees.filter(a => a.checkedIn).length} / {attendees.length} Checked In</span>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search attendees by name, role, track..."
                className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredAttendees.map((att) => (
                <div 
                  key={att.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{att.name}</h5>
                    <p className="text-[11px] text-slate-400 truncate">{att.role}</p>
                    <span className="text-[10px] text-cyan-400 font-mono">{att.id}</span>
                  </div>

                  <button
                    onClick={() => toggleManualCheckin(att.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 ${
                      att.checkedIn
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {att.checkedIn ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>In ({att.checkInTime})</span>
                      </>
                    ) : (
                      <span>Check In</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
