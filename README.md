# ⚡ Nexus Event HQ

### Smart Real-Time Hackathon & Event Management Platform

> A unified, real-time Smart Event Management Platform that consolidates the end-to-end event lifecycle into a single interactive dashboard — built for the **AI Hackathon Challenge 2026**.

---

## 🏆 Challenge

Design and build a unified, real-time Smart Event Management Platform that consolidates the end-to-end event lifecycle into a single interactive dashboard.

---

## 🚀 Live Features

| Module | Description |
|---|---|
| 📐 **System Architecture** | Interactive 5-node pipeline diagram showing multi-role data flows and tech specs |
| 🔲 **Registration & QR Check-In** | Participant registration → unique QR badge generation → Gate QR Scanner with audio verification |
| 👥 **AI Team Matchmaker** | Skill matrix compatibility engine, 1-click join requests, team creation portal |
| 📢 **Broadcast & Announcement Center** | Organizer real-time broadcast dispatch with urgency levels, persistent announcement feed |
| ⚖️ **Interactive Judging Portal** | Weighted 4-criteria rubric sliders (Innovation 30%, Execution 30%, Design 20%, Pitch 20%), secure score locking |
| 🏆 **Live Leaderboard & Analytics** | Gold/Silver/Bronze podium, real-time rank table, check-in velocity chart, skill distribution pie chart |

---

## 🎭 Multi-Role System

Switch instantly between 4 personas using the top navbar:

- **Participant** — Register, get a QR badge, find teammates, watch leaderboard
- **Judge Mode** — Evaluate projects on weighted rubrics, lock scores
- **Gate Scanner** — Scan QR badges at the venue gate with live verification + audio feedback
- **Organizer HQ** — Dispatch broadcasts, monitor check-in velocity, view analytics

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

## ⚙️ Getting Started

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
│   ├── Navbar.jsx               # Role switcher & tab navigation
│   ├── ArchitectureView.jsx     # Interactive system diagram
│   ├── RegistrationCheckin.jsx  # QR badge & gate scanner
│   ├── TeamMatchmaker.jsx       # AI team formation portal
│   ├── BroadcastCenter.jsx      # Real-time announcement feed
│   ├── JudgingPortal.jsx        # Weighted rubric evaluation
│   ├── LeaderboardAnalytics.jsx # Live rankings & organizer charts
│   └── ToastContainer.jsx       # Floating notification system
├── data/
│   └── initialData.js           # Mock attendees, teams, announcements
├── utils/
│   └── audio.js                 # Web Audio API sound controller
├── App.jsx                      # Global state & routing
└── index.css                    # Tailwind + glassmorphic design system
```

---

## 🎯 Demo Flow

1. **Architecture** — Click pipeline nodes to explore data flows
2. **Register** a new participant → generate QR badge → simulate Gate check-in (audio plays)
3. **Team Matchmaker** — Browse AI compatibility scores, send join request
4. **Broadcast** — Dispatch an urgent announcement → toast notification appears
5. **Judge** EcoTrace Grid → adjust rubric sliders → Lock Score → confetti fires
6. **Leaderboard** — Watch rankings update + view analytics charts

---

## 👤 Built With

Built using **Google Antigravity** AI IDE for the Smart Event Management Hackathon 2026.
