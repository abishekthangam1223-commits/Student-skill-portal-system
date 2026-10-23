# SkillSync — Student Skill Portal System

A modern, full-featured web application designed for students and academic institutions to track, verify, and showcase technical proficiencies, capstone projects, digital credentials, and peer collaborations with a sleek, responsive glassmorphism UI.

---

## 🌟 Key Features

### 1. Modern Glassmorphism Navbar
- **Brand Identity**: SkillSync logo with glowing gradient badge and responsive design.
- **Navigation Tabs**: Instant single-page routing between **Dashboard**, **Skill Matrix**, **Projects**, **Certifications**, **Leaderboard**, and **Roadmap**.
- **Global Search**: Real-time cross-filtering across skills, projects, and peer profiles with `/` hotkey focus.
- **Theme Switcher**: Smooth toggle between curated **Dark Mode** and crisp **Light Mode** (with persistent `localStorage` preference).
- **Interactive Notifications**: Live notification popover showing recent academic verifications and peer endorsements.
- **Profile Quick Menu**: User credentials menu with direct links to **LinkedIn**, **GitHub profile**, and **Portal Repository**.

### 2. Hero / Overview Dashboard
- **Greeting Banner**: Personalized welcome (`"Welcome back, Alex!"`) with student cohort, institution, and 32-day streak counter.
- **Readiness Score Widget**: Dynamic radial SVG progress gauge with overall employability score (`84% Job Ready`) and category breakdown bars (Technical Mastery: 88%, Practical Portfolio: 85%, Soft Skills & Teamwork: 78%).
- **Interactive Competency Radar**: Custom HTML5 Canvas radar chart tracking 6 calibrated pillars (Full-Stack Dev, AI & GenAI, Cloud & DevOps, DSA & Theory, Team Leadership, Databases & SQL) with vertex hover tooltips and entrance bloom animations.
- **Quick Stat Widgets**:
  - **Skills Verified**: 18 (+3 this month)
  - **Active Courses**: 4 (2 Final Capstones)
  - **Capstone Projects**: 3 (344 GitHub Stars)
  - **Global Rank**: #12 (Top 1% Tier)
- **Activity & Verification Feed**: Real-time feed of professor approvals, peer endorsements, and credential synchronizations.
- **Quick Action Panel**: One-click shortcuts for adding skills, taking diagnostic assessments, requesting faculty verification, publishing projects, and generating export summaries.

### 3. Interactive Skill Matrix & Roadmap
- **Categorized Taxonomy**:
  - **Technical**: Python, React, Data Structures & Algorithms, SQL & PostgreSQL, TypeScript, Docker, Node.js.
  - **Soft Skills**: Technical Team Leadership, Public Speaking & Demos, Agile & Scrum Sprint Workflow, Complex Problem Decomposition.
  - **Emerging Tech**: GenAI & LLM Fine-Tuning, Cloud Architecture (AWS/GCP), MLOps & Vector Pipelines, Cybersecurity & OAuth2.
- **Diagnostic Skill Assessment Engine**: Interactive in-browser testing module with instant evaluation; passing elevates skill status to verified and updates readiness metrics dynamically.
- **Card Metadata**: Proficiency pills (`Beginner`, `Intermediate`, `Advanced`), animated progress bars (%), verification badges (`Faculty Assessment`, `Assessment Score`, `Pending Review`), and peer endorsements counter with `+ Endorse` interaction.
- **Multi-Filter Engine**: Filter dynamically by Category (`All`, `Technical`, `Soft`, `Emerging`), Proficiency (`Beginner`, `Intermediate`, `Advanced`), and Status (`Verified`, `In Progress`, `Pending`).
- **Interactive Roadmap**: Visual career milestone tracker (Full-Stack AI Engineer & Cloud DevOps tracks) showing completed, in-progress, and upcoming milestones.

### 4. Project & Portfolio Showcase
- **Capstone Cards**: Featuring gradient hero thumbnails, category badges, project taglines, full architectural summaries, tech stack badges, verified skills utilized, and interactive **Star / Upvote** counters.
- **Direct Repository & Deployment Links**: Clickable GitHub repository links and live demo sandboxes.
- **Publish Project Modal**: Full-featured modal to upload new projects with custom tags, GitHub URL, demo URL, and category selection.

### 5. Certifications & Badges
- **Verified Industry Credentials**: Digital cards for AWS Solutions Architect, Meta Front-End Developer, DeepLearning.AI GenAI with LLMs, Google Cloud Data Engineer, and Harvard CS50.
- **Credential ID Copy**: One-click ID copy to clipboard and direct link to official issuer verification portals.
- **Digital Credential Preview Modal**: Official diploma/certificate modal featuring cryptographic SHA-256 validation seal, signature stamp, and verified status.
- **Achievement Badges Gallery**: Diamond, Platinum, Gold, and Silver tiers (Algorithm Grandmaster, Open Source Architect, Hackathon Champion, 32-Day Code Sprint).
- **Claim Certificate Modal**: Submit new industry credentials for instantaneous registry verification.

### 6. Leaderboard & Peer Discovery
- **Top 3 Podium**: 1st (Gold trophy), 2nd (Silver), and 3rd (Bronze) podium display with animated avatar rings and point counters.
- **Ranking Table**: Department/major, verified skills count, badges, peer score, and Alex Morgan (#12) highlighting.
- **Peer Profile Modal**: Click any peer to inspect their focus area, verified skill count, LinkedIn/GitHub links, and submit an interactive peer skill endorsement (+25 score boost).

### 7. Social & Repository Integration
- **LinkedIn Profile**: [https://linkedin.com/in/alex-morgan-skillsync](https://linkedin.com/in/alex-morgan-skillsync)
- **GitHub Profile**: [https://github.com/alexmorgan-dev](https://github.com/alexmorgan-dev)
- **Portal Source Repository**: [https://github.com/alexmorgan-dev/student-skill-portal](https://github.com/alexmorgan-dev/student-skill-portal)
- **Export & Share Modal**: Generates ready-to-publish LinkedIn post copy, embeddable GitHub README badge markdown, and print/PDF support.

---

## 🚀 How to Run Locally

### Option A: Via Local Server (Already Running)
The static server is running at:
```
http://127.0.0.1:5000/
```
Simply open your preferred browser (Google Chrome, Microsoft Edge, Firefox, Brave) and navigate to `http://127.0.0.1:5000/`.

### Option B: Run Standalone PowerShell Server
To restart or run the server with automatic browser launch:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Open
```

### Option C: Direct File Opening
You can also directly double-click or open [index.html](file:///c:/student%20skill%20portal%20system/index.html) in any web browser.

---

## 📁 File Structure

```
c:/student skill portal system/
├── index.html          # Semantic HTML5 layout with all 6 views and modals
├── styles/
│   └── main.css        # Glassmorphism design system, dark/light themes, animations & print
├── js/
│   ├── icons.js        # Lucide vector SVG icons engine
│   ├── data.js         # Realistic mock data store with LocalStorage persistence
│   ├── radar.js        # HTML5 Canvas 6-pillar competency radar chart
│   ├── assessment.js   # Interactive diagnostic quiz engine & credentialing
│   └── app.js          # Tab routing, filters, state mutations, and modal controllers
├── assets/             # Media and static resources
├── server.ps1          # Zero-dependency PowerShell static HTTP server with -Open flag
└── README.md           # Documentation and guide
```
