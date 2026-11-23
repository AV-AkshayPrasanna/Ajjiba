<!--
  AJJIBA — README
  Brand palette:
  Rich Cream       #FAF6EE
  Deep Ink Navy    #162032
  Electric Cobalt  #2563EB
  Coral Flame      #FF5A5F
-->

<div align="center">

  <img src="https://img.shields.io/badge/AJJIBA-AI-162032?style=for-the-badge&labelColor=2563EB" alt="Ajjiba AI" />

  <h1>Ajjiba</h1>
  <h3>Wisdom in every conversation.</h3>

  <p>
    A thoughtful AI companion designed to make learning, problem-solving,<br />
    and everyday conversations feel a little more human.
  </p>

  <p>
    <a href="https://github.com/AV-AkshayPrasanna/Ajjiba">
      <img src="https://img.shields.io/badge/Project-Ajjiba-162032?style=flat-square" alt="Project Ajjiba" />
    </a>
    <img src="https://img.shields.io/badge/AI-Google%20Gemini-2563EB?style=flat-square" alt="Google Gemini" />
    <img src="https://img.shields.io/badge/Framework-Next.js-162032?style=flat-square" alt="Next.js" />
    <img src="https://img.shields.io/badge/Status-In%20Development-FF5A5F?style=flat-square" alt="In Development" />
  </p>

  <br />

  <table>
    <tr>
      <td align="center" bgcolor="#FAF6EE"><strong><code>#FAF6EE</code></strong><br />Rich Cream</td>
      <td align="center" bgcolor="#162032"><strong><code><font color="#FAF6EE">#162032</font></code></strong><br /><font color="#FAF6EE">Deep Ink Navy</font></td>
      <td align="center" bgcolor="#2563EB"><strong><code><font color="#FFFFFF">#2563EB</font></code></strong><br /><font color="#FFFFFF">Electric Cobalt</font></td>
      <td align="center" bgcolor="#FF5A5F"><strong><code><font color="#FFFFFF">#FF5A5F</font></code></strong><br /><font color="#FFFFFF">Coral Flame</font></td>
    </tr>
  </table>

</div>

---

## About Ajjiba

Ajjiba is a personal AI project built around a simple idea: useful technology should feel approachable, thoughtful, and clear.

The name **Ajjiba** carries a personal meaning. This project is dedicated to the memory of my grandfather, whose wisdom and presence continue to inspire it.

Powered by **Google Gemini**, Ajjiba is being developed as a conversational assistant that can understand context, follow a conversation, and respond with clarity and warmth.

## Design direction

Ajjiba uses a distinct visual identity built around four colours:

| Colour | Hex | Role |
|---|---|---|
| Rich Cream | `#FAF6EE` | Primary surfaces and backgrounds |
| Deep Ink Navy | `#162032` | User message bubbles and strong contrast |
| Electric Cobalt | `#2563EB` | Primary actions, active states, and send button |
| Coral Flame | `#FF5A5F` | Highlights, alerts, and quick-action accents |

The goal is a modern, energetic interface that remains warm, calm, and highly readable.

## Planned experience

- **Conversational AI** — natural chat powered by Google Gemini.
- **Context-aware replies** — use recent messages to maintain conversational continuity.
- **Conversation handling** — organise messages by conversation.
- **Helpful personality** — patient, respectful, encouraging, and clear.
- **Responsive interface** — an experience designed for desktop and mobile.
- **Reliable feedback** — clear loading, empty, and error states.

> Ajjiba is actively in development. Features above describe the intended experience; implementation and availability will evolve as the project progresses.

## Technology

| Layer | Technology |
|---|---|
| Frontend | Next.js, React |
| Styling | CSS / Tailwind CSS |
| Backend | Next.js Route Handlers |
| AI | Google Gemini API |
| SDK | `@google/genai` |
| Version control | Git and GitHub |
| Planned deployment | Vercel |

## Run locally

### 1. Clone the repository

```bash
git clone https://github.com/AV-AkshayPrasanna/Ajjiba.git
cd Ajjiba
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

**Keep your API key private.** Never commit `.env.local`, expose the key through a `NEXT_PUBLIC_` variable, or paste it into public issues or screenshots.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

The application is being built with the Next.js App Router:

```text
src/
└── app/
    ├── api/
    │   └── chat/
    │       └── route.js
    ├── globals.css
    ├── layout.js
    └── page.js
```

## Security

- API credentials are read on the server through environment variables.
- Keep `.env.local` out of version control.
- Configure production secrets through your hosting provider's environment-variable settings.
- Do not expose Gemini credentials in browser-side code.

## Roadmap

- [x] Create the Next.js project.
- [x] Set up the Gemini JavaScript SDK.
- [x] Configure local environment variables.
- [x] Initialise Git and protect `.env.local`.
- [ ] Implement and test the Gemini chat API.
- [ ] Build the Ajjiba chat interface and responsive layout.
- [ ] Add multi-conversation experience and context handling.
- [ ] Test multi-turn conversations and error states.
- [ ] Deploy the application.

## Contributing

Ajjiba is currently a personal project under active development. Suggestions and thoughtful feedback are welcome through GitHub Issues.

## A personal note

Ajjiba is more than a technical experiment. It is a small tribute to someone whose wisdom stays with me. I hope to build something that reflects that spirit: patient, helpful, and meaningful, one conversation at a time.

---

<div align="center">

  <h3>Ajjiba</h3>
  <p><em>Wisdom in every conversation.</em></p>
  <p>Built with purpose. Powered by curiosity. Inspired by family.</p>

  <a href="https://github.com/AV-AkshayPrasanna">GitHub</a>
  ·
  <a href="https://github.com/AV-AkshayPrasanna/Ajjiba">View repository</a>

</div>
