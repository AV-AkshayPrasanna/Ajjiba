# Contributing to Ajjiba AI

Thank you for your interest in improving Ajjiba.

Ajjiba is an actively developed, student-focused AI assistant. Contributions and feedback should support its goals of clarity, usefulness, reliability, and a welcoming experience.

## Before making changes

1. Check the current [README](README.md) and [roadmap](docs/ROADMAP.md).
2. Open an issue or discussion for substantial feature proposals.
3. Keep changes focused and avoid mixing unrelated refactors with feature work.

## Local setup

```bash
git clone https://github.com/AV-AkshayPrasanna/Ajjiba-AI.git
cd Ajjiba-AI
npm install
```

Create `.env.local` in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model
```

Never commit this file or share real credentials.

Start the development server:

```bash
npm run dev
```

## Development checklist

Before submitting a change:

- [ ] Keep the Ajjiba brand and student-first experience consistent.
- [ ] Validate user input at API boundaries.
- [ ] Keep API credentials on the server; never expose secrets in browser code.
- [ ] Handle loading, empty, and error states thoughtfully.
- [ ] Test the affected user flow locally.
- [ ] Run `npm run build` when practical.
- [ ] Update documentation when behavior or setup changes.
- [ ] Do not claim planned functionality as implemented.

## Git workflow

Use a focused branch for proposed changes:

```bash
git checkout -b feature/short-description
```

Review your changes:

```bash
git status
git diff
npm run build
```

Commit with a descriptive message:

```bash
git add .
git commit -m "Describe the change"
git push -u origin feature/short-description
```

Then open a pull request describing the motivation, implementation, and tests.

## Reporting bugs

When opening an issue, include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Relevant browser or terminal error messages
- Screenshots when useful (with all secrets and personal information removed)

Never include API keys, passwords, access tokens, or private user data.

## Design principles

Ajjiba's current brand palette:

- Rich Cream — `#FAF6EE`
- Deep Ink Navy — `#162032`
- Electric Cobalt — `#2563EB`
- Coral Flame — `#FF5A5F`

Keep the interface warm, readable, accessible, and focused. Avoid unnecessary visual complexity.
