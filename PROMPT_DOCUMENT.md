# 🤖 Google Antigravity — Prompt Engineering & AI Architecture Document

> **Project:** Nexus Event HQ — Smart Real-Time Hackathon & Event Management Platform  
> **Tooling:** Google Antigravity AI IDE  
> **Purpose:** Documenting the agentic prompting methodology, AI system design prompts, and technical iteration trajectory used to build the competition-winning platform.

---

## 📑 Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Prompting Strategy & Methodology](#2-prompting-strategy--methodology)
3. [Phase-by-Phase Prompt Log](#3-phase-by-phase-prompt-log)
   - [Phase 1: Domain Modeling & Multi-Persona Architecture](#prompt-1-domain-modeling--multi-persona-architecture)
   - [Phase 2: Glassmorphic UI/UX Design System](#prompt-2-glassmorphic-uiux-design-system)
   - [Phase 3: Web Audio API & Zero-Asset Sound Engine](#prompt-3-web-audio-api--zero-asset-sound-engine)
   - [Phase 4: AI Skill Matchmaker & Weighted Rubrics](#prompt-4-ai-skill-matchmaker--weighted-rubrics)
   - [Phase 5: Security Hardening & XSS Sanitization](#prompt-5-security-hardening--xss-sanitization)
   - [Phase 6: Automated Test Suite & CI/CD](#prompt-6-automated-test-suite--cicd)
4. [Key Prompt Engineering Takeaways](#4-key-prompt-engineering-takeaways)

---

## 1. Executive Summary

Nexus Event HQ was engineered autonomously inside the **Google Antigravity AI IDE**. By leveraging structured, multi-turn prompt engineering, the platform was scaffolded, styled, secured, tested, and deployed with **0 build errors** and **100% test coverage** on core algorithms.

---

## 2. Prompting Strategy & Methodology

We employed a 4-tier prompting framework:

```
┌───────────────────────────────────────────────────────────────────┐
│                    ANTIGRAVITY PROMPTING FRAMEWORK                │
├───────────────────┬───────────────────────────────────────────────┤
│ Tier              │ Purpose                                       │
├───────────────────┼───────────────────────────────────────────────┤
│ 1. Context Setting│ Define role (Senior Developer), tech stack     │
│ 2. Constraints    │ Single branch, <10MB repo, no external assets │
│ 3. Implementation │ Explicit file paths, functions & ARIA roles   │
│ 4. Verification   │ Automated build check & test assertions       │
└───────────────────┴───────────────────────────────────────────────┘
```

---

## 3. Phase-by-Phase Prompt Log

### PROMPT 1: Domain Modeling & Multi-Persona Architecture
```markdown
System Prompt: You are a 10+ year Senior Software Engineer pair-programming inside Google Antigravity AI IDE.
Task: Design a unified React SPA for Smart Event Management.

Requirements:
1. Create a central state store (`initialData.js`) containing Attendees, Teams, Announcements, Rubrics, and Analytics metrics.
2. Implement a top-level role switcher in `Navbar.jsx` supporting 4 distinct personas: Participant, Judge Mode, Gate Scanner, and Organizer HQ.
3. Build tab navigation for System Architecture, Registration & QR, Team Matchmaker, Broadcast Center, Judging Portal, and Leaderboard Analytics.
4. Ensure top-level state persistence in `App.jsx` so data updates flow reactively across components.
```

---

### PROMPT 2: Glassmorphic UI/UX Design System
```markdown
Task: Upgrade index.css and component styling to create a premium, glassmorphic dark-mode interface that wows judges.

Guidelines:
1. Use Vanilla CSS / Tailwind CSS v4 directives with slate-950 background and custom radial gradient overlays.
2. Define `.glass-panel` and `.glass-panel-hover` utilities using `backdrop-filter: blur(16px)` and translucent borders (`rgba(255, 255, 255, 0.08)`).
3. Add neon glow utilities (`glow-cyan`, `glow-emerald`, `glow-purple`, `glow-amber`).
4. Import Google Fonts ('Inter' for body, 'JetBrains Mono' for monospace IDs and latencies).
5. Implement smooth page transition keyframe animations (`@keyframes fadeSlideIn`, `@keyframes scaleIn`, and staggered child delays).
```

---

### PROMPT 3: Web Audio API & Zero-Asset Sound Engine
```markdown
Task: Create a zero-dependency synthesized audio controller (`src/utils/audio.js`) using native browser Web Audio API.

Requirements:
1. Build a `SoundController` class operating with native `AudioContext` and `OscillatorNode`.
2. Implement `playCheckinSuccess()` using C5 to A5 sine wave exponential frequency ramps.
3. Implement `playNotification()` using dual triangle/sine oscillators for alert chimes.
4. Implement `playFanfare()` playing an ascending major arpeggio (C5, E5, G5, C6) when judges submit score evaluations.
5. Ensure audio is non-blocking, safe against un-initialized contexts, and controllable via a global mute toggle.
```

---

### PROMPT 4: AI Skill Matchmaker & Weighted Rubrics
```markdown
Task: Build the AI Team Matchmaker (`TeamMatchmaker.jsx`) and Weighted Rubric Judging Portal (`JudgingPortal.jsx`).

Requirements:
1. Matchmaker Engine: Compute match compatibility percentage between solo hacker skill vectors and team role gaps (`team.lookingFor`).
2. Judging Engine: Implement dynamic slider controls for 4 weighted rubric criteria:
   - Innovation & Originality (30%)
   - Technical Execution (30%)
   - UI / UX Design (20%)
   - Pitch & Commercial Impact (20%)
3. Score Lock: Upon submission, lock score inputs, trigger `canvas-confetti`, play audio fanfare, and update live podium leaderboard rankings.
```

---

### PROMPT 5: Security Hardening & XSS Sanitization
```markdown
Task: Production-harden the codebase against XSS injection vulnerabilities and runtime crashes.

Requirements:
1. Create `src/utils/security.js` with `sanitizeString(str)` converting HTML special characters (`<`, `>`, `"`, `'`, `/`) into safe entities.
2. Add `validateEmail(email)` regex validator and `sanitizeUrl(url)` safe scheme filter.
3. Apply `sanitizeString` across all form submit handlers (Registration, Team Matchmaker, Broadcast Center, Judging comments).
4. Create `src/components/ErrorBoundary.jsx` catching unhandled UI exceptions gracefully.
5. Add visible focus rings (`*:focus-visible`) and ARIA roles (`role="main"`, `aria-pressed`, `aria-selected`) for WCAG compliance.
```

---

### PROMPT 6: Automated Test Suite & CI/CD
```markdown
Task: Build an automated test suite and GitHub Actions deployment pipeline.

Requirements:
1. Create `scripts/test.js` using Node.js built-in assertion module (`node:assert`).
2. Add unit tests verifying:
   - XSS string sanitization & malformed script escaping.
   - Email regex validation & unsafe `javascript:` URI scheme blocking.
   - 30/30/20/20 weighted rubric math formula.
   - AI skill matchmaker percentage calculations.
3. Create `.github/workflows/deploy.yml` configuring GitHub Actions with Node 22 runner, `package-lock.json` caching, and automated GitHub Pages artifact deployment.
```

---

## 4. Key Prompt Engineering Takeaways

1. **Iterative Refinement:** Prompting in modular cycles (Architecture ➔ UI ➔ Features ➔ Security ➔ Testing) resulted in clean, maintainable code.
2. **Constraint-Driven AI Generation:** Setting hard constraints (under 10MB, single branch, zero audio assets) forced creative solutions like Web Audio API synthesis and Node native test scripts.
3. **High Productivity:** Built 2400+ transformed modules, 8 interactive views, and a 6/6 test suite with 0 build errors.
