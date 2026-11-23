<!-- Ajjiba AI | Project README -->

<div align="center">
  <img src="https://raw.githubusercontent.com/AV-AkshayPrasanna/Ajjiba-AI/main/public/ajjiba-logo-dark.png" alt="Ajjiba AI logo" width="360" />

  <h1>Ajjiba AI</h1>
  <p><strong>Wisdom in every conversation.</strong></p>
  <p>A thoughtful AI companion built to help students learn, think clearly, and become more productive.</p>

  <p>
    <a href="https://ajjiba-ai.vercel.app/"><strong>🌐 Live Demo</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/AV-AkshayPrasanna/Ajjiba-AI/issues"><strong>🐛 Report an Issue</strong></a>
  </p>

  <p>
    <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-111827?logo=next.js&logoColor=white&style=flat" />
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?logo=react&style=flat" />
    <img alt="Google Gemini" src="https://img.shields.io/badge/AI-Gemini-4285F4?logo=googlegemini&logoColor=white&style=flat" />
    <img alt="Vercel" src="https://img.shields.io/badge/Hosted%20on-Vercel-111827?logo=vercel&logoColor=white&style=flat" />
    <img alt="Development status" src="https://img.shields.io/badge/Status-In%20Development-16a34a?style=flat" />
  </p>
</div>

---

## ✨ About Ajjiba

Ajjiba is a student-focused AI assistant designed around a simple idea: useful technology should feel clear, patient, and encouraging.

It helps with everyday questions and learning conversations while aiming to make complex ideas easier to understand. Ajjiba is being developed incrementally, with reliability and a thoughtful user experience as the foundation.

> **A little wisdom, a lot of care.**

## 🚀 Live application

**[https://ajjiba-ai.vercel.app/](https://ajjiba-ai.vercel.app/)**

The production application is hosted on Vercel. The live site is the best place to try the current version.

## 🎯 Current features

These are the capabilities available in the current deployed version:

- **AI conversations** — chat with Ajjiba using Google's Gemini model.
- **Multi-turn context** — send conversation history so Ajjiba can respond with awareness of earlier messages.
- **Date and time awareness** — the chat API supplies current date and time context using the request's timezone, with Asia/Kolkata as the default.
- **Conversation management** — create new conversations and delete existing ones.
- **Local conversation persistence** — conversations are saved in the browser so they remain after a refresh on that same browser.
- **Purpose-built interface** — a warm, student-friendly chat experience with Ajjiba's own visual identity.

**Persistence note:** conversation history currently uses browser local storage. It is not a cloud-synced account system, so chats do not automatically transfer between browsers or devices.

## 🧭 Product roadmap

Ajjiba is actively evolving. The following are planned development areas, not claims that every feature is already available:

| Stage | Focus | Planned capabilities |
|---|---|---|
| Phase 1 | Reliable AI foundation | Stronger conversation context, API validation and error handling, tool-calling foundation, multi-turn testing |
| Phase 2 | Web intelligence | Web search, current information, source-backed research |
| Phase 3 | Student learning suite | Learning tutor, exam preparation, quizzes, flashcards, coding companion |
| Phase 4 | Document intelligence | PDF uploads, document Q&A, summaries, notes |
| Phase 5 | Personalisation | Accounts, learning preferences, long-term memory |
| Phase 6 | Productivity | Study planning, tasks, timetables, reminders |
| Phase 7 | Advanced interaction | Voice, image understanding, agent workflows |
| Phase 8 | Production readiness | Security, privacy, monitoring, performance, scalability |

Track detailed progress in **[docs/ROADMAP.md](docs/ROADMAP.md)**.

## 🧱 Technology stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| UI | React |
| Styling | Tailwind CSS |
| AI integration | Google GenAI SDK |
| AI model | Gemini, configured through environment variables |
| Language | JavaScript |
| Hosting | Vercel |
| Source control | Git and GitHub |

## 🏗️ Project structure

```text
Ajjiba-AI/
├── public/
│   ├── ajjiba-avatar.webp
│   └── ajjiba-logo-dark.png
├── src/
│   └── app/
│       ├── api/
│       │   └── chat/
│       │       └── route.js       # Gemini chat API
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.js
│       └── page.js                # Main chat interface
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
└── README.md
```

## ⚙️ Run locally

### 1. Prerequisites

- Node.js (LTS recommended)
- npm
- A Google Gemini API key

### 2. Clone the repository

```bash
git clone https://github.com/AV-AkshayPrasanna/Ajjiba-AI.git
cd Ajjiba-AI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a file named `.env.local` in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model
```

Keep the API key private. Never commit `.env.local`, paste secrets into issues, or expose the key in client-side code.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Production build check

```bash
npm run build
```

## 🔐 Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Authenticates server-side requests to Gemini |
| `GEMINI_MODEL` | Recommended | Selects the Gemini model used by the chat API |

For Vercel, configure these values in the project's **Settings → Environment Variables**. Do not add secrets to GitHub.

## 🚢 Deployment

Ajjiba is connected to Vercel for production hosting.

- **Production URL:** [ajjiba-ai.vercel.app](https://ajjiba-ai.vercel.app/)
- **Production branch:** `main`
- **Deployment flow:** push a commit to `main` → Vercel builds the project → a successful deployment updates the production site.

Documentation-only changes update this repository but do not change Ajjiba's application behavior. Vercel may still run a deployment for a push, depending on its Git deployment settings.

## 🎨 Brand identity

Ajjiba's visual language uses a calm, welcoming palette:

| Colour | Hex | Role |
|---|---|---|
| Rich Cream | `#FAF6EE` | Main light surface |
| Deep Ink Navy | `#162032` | Primary dark surface and text |
| Electric Cobalt | `#2563EB` | Primary interactive accent |
| Coral Flame | `#FF5A5F` | Warm highlight |

The identity is intended to feel warm, thoughtful, dependable, and approachable.

## 🛣️ Development workflow

The recommended workflow keeps the local project, GitHub, and Vercel in sync:

1. Make and test changes locally in VS Code.
2. Review the changes with `git status` and `git diff`.
3. Commit the work with a clear message.
4. Push to GitHub.
5. Let Vercel deploy the `main` branch.
6. Verify the production site after deployment.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the project workflow.

## 🤝 Contributing

This project is currently under active development. Suggestions, bug reports, and thoughtful feedback are welcome through [GitHub Issues](https://github.com/AV-AkshayPrasanna/Ajjiba-AI/issues).

Please do not submit API keys, credentials, personal data, or other secrets.

## 📄 License

No open-source license has been added yet. Unless a license is added to this repository, the code is not automatically granted permission for reuse, redistribution, or modification.

---

<div align="center">
  <p><strong>Ajjiba AI</strong></p>
  <p><em>Wisdom in every conversation.</em></p>
  <p>Built with curiosity, care, and a commitment to helping students grow.</p>
</div>
