# ⚡ Nexus Event HQ

### Smart Real-Time Hackathon & Event Management Platform

> A unified, real-time Smart Event Management Platform that consolidates the end-to-end event lifecycle into a single interactive dashboard — built for the **AI Hackathon Challenge 2026**.

---

## 🌐 Live Production Demo

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://smart-event-and-hackthon-organizing.vercel.app/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=vite)](https://smart-event-and-hackthon-organizing.vercel.app/)

👉 **Live URL:** [https://smart-event-and-hackthon-organizing.vercel.app/](https://smart-event-and-hackthon-organizing.vercel.app/)

---

## 🏆 Challenge

Design and build a unified, real-time Smart Event Management Platform that consolidates the end-to-end event lifecycle into a single interactive dashboard.

---

## 🚀 Live Features

| Module | Description |
|---|---|
| ⚡ **Hero Dashboard** | Animated KPI counters, live activity log, system health bars, quick actions |
| 📐 **System Architecture** | Interactive 5-node pipeline diagram showing multi-role data flows and tech specs |
| 🔲 **Registration & QR Check-In** | Participant registration → unique QR badge generation → Gate QR Scanner with audio verification + CSV Export |
| 👥 **AI Team Matchmaker** | Skill matrix compatibility engine (96% match), 1-click join requests, team creation portal |
| 📢 **Broadcast & Announcement Center** | Organizer real-time broadcast dispatch with urgency levels, persistent announcement feed |
| 📅 **Event Schedule & Agenda** | Interactive timeline with real-time "NOW" indicator, room locations, expandable cards |
| ⚖️ **Interactive Judging Portal** | Weighted 4-criteria rubric sliders (Innovation 30%, Execution 30%, Design 20%, Pitch 20%), secure score locking + confetti |
| 🏆 **Live Leaderboard & Analytics** | Gold/Silver/Bronze podium, real-time rank table, check-in velocity chart, skill distribution pie chart + CSV Export |

---

## 🎭 Multi-Role Persona Switcher

Switch instantly between 4 personas using the top navbar:

- **Participant** — Register, get a QR badge, find teammates, watch leaderboard
- **Judge Mode** — Evaluate projects on weighted rubrics, lock scores
- **Gate Scanner** — Scan QR badges at the venue gate with live verification + audio feedback
- **Organizer HQ** — Dispatch broadcasts, monitor check-in velocity, view analytics

---

## 💾 Features & Quality Attributes

- 💾 **`localStorage` Data Persistence** — Attendees, teams, announcements, and evaluations persist across page reloads.
- ⏱️ **Live Countdown Timer** — Status bar countdown clock with red pulse warning (`< 30 mins`).
- 📥 **CSV Data Exports** — Download leaderboard standings and attendee directory with 1 click.
- ✨ **Fluid Page Transitions** — CSS `@keyframes fadeSlideIn` and staggered animations.
- ♿ **Accessibility Ready** — Keyboard navigation with cyan focus rings (`*:focus-visible`) and full ARIA semantics.
- 🔊 **Synthesized Web Audio** — Real-time audio chimes for check-ins, broadcasts, and win confetti (zero external audio assets).

---

## 🛠️ Tech Stack

- **React 18** via **Vite 8**
- **Tailwind CSS v4** (glassmorphic dark theme)
- **Recharts** — AreaChart (check-in velocity) + PieChart (skill distribution)
- **qrcode.react** — QR badge generation
- **canvas-confetti** — Confetti on score submission
- **lucide-react** — Icon set
- **Web Audio API** — Synthesized sound effects (zero external audio files)
- **Inter + JetBrains Mono** — Google Fonts

---

## ⚙️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173/** in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx               # Role switcher, countdown & tab nav
│   ├── HeroDashboard.jsx        # Live KPI counters & activity log
│   ├── ArchitectureView.jsx     # Interactive system diagram
│   ├── RegistrationCheckin.jsx  # QR badge, gate scanner & CSV export
│   ├── TeamMatchmaker.jsx       # AI team formation portal
│   ├── BroadcastCenter.jsx      # Real-time announcement feed
│   ├── EventSchedule.jsx        # Event agenda & timeline
│   ├── JudgingPortal.jsx        # Weighted rubric evaluation
│   ├── LeaderboardAnalytics.jsx # Live rankings, charts & CSV export
│   └── ToastContainer.jsx       # Floating notification system
├── data/
│   └── initialData.js           # Mock attendees, teams, announcements
├── utils/
│   └── audio.js                 # Web Audio API sound controller
├── App.jsx                      # Global state, localStorage & routing
└── index.css                    # Tailwind + glassmorphic design system
```

---

## 🎯 Quick Demo Flow

1. **Dashboard** — View live KPI counters & activity feed.
2. **Registration & Check-In** — Register a new participant → generate QR badge → simulate Gate check-in (audio plays) → Export CSV.
3. **Team Matchmaker** — Browse AI compatibility scores, send join request.
4. **Broadcast** — Dispatch an urgent announcement → toast notification appears.
5. **Judge** EcoTrace Grid → adjust rubric sliders → Lock Score → confetti fires.
6. **Leaderboard** — Watch rankings update + view analytics charts + Export CSV.
7. **Schedule** — View interactive timeline with current "NOW" indicator.

---

## 👤 Built With

Built using **Google Antigravity** AI IDE for the Smart Event Management Hackathon 2026.
