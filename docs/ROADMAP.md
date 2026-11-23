# Ajjiba AI — Product Roadmap

> **Wisdom in every conversation.**

This roadmap separates capabilities already present in the deployed application from planned work. A roadmap item is not considered shipped until it is implemented, tested, and documented.

## Current release — Foundation

### Available in the deployed version
- [x] Next.js application deployed to Vercel
- [x] Gemini-powered chat API
- [x] Student-focused assistant instructions and tone
- [x] Current date/time context passed to the model
- [x] Request timezone support with Asia/Kolkata fallback
- [x] Basic multi-turn conversation history
- [x] Browser-local conversation persistence
- [x] Create and delete conversations
- [x] Production smoke test completed for page loading, Gemini response, context, refresh persistence, and conversation management

### Phase 1 — Reliability and AI foundation
- [ ] Improve conversation-history validation and turn sequencing
- [ ] Improve long-conversation context handling and history selection
- [ ] Strengthen API input validation and error responses
- [ ] Add safe timeout/retry behavior where appropriate
- [ ] Establish a modular tool-calling foundation
- [ ] Add repeatable tests for multi-turn conversations and malformed requests
- [ ] Verify production behavior after each release

## Planned product phases

### Phase 2 — Web intelligence
- [ ] Search the web for current information
- [ ] Present source links and citations
- [ ] Support research workflows and source-aware summaries

### Phase 3 — Student learning suite
- [ ] Guided AI tutor
- [ ] Subject and topic explanations
- [ ] Exam preparation workflows
- [ ] Quiz and flashcard generation
- [ ] Coding companion

### Phase 4 — Document intelligence
- [ ] Upload and process supported documents
- [ ] Ask questions grounded in uploaded files
- [ ] Generate summaries, revision notes, and study material

### Phase 5 — Personalisation
- [ ] User accounts and authentication
- [ ] User-controlled learning preferences
- [ ] Persistent memory with clear user controls

### Phase 6 — Productivity
- [ ] Study planner
- [ ] Tasks and deadlines
- [ ] Timetables and reminders

### Phase 7 — Advanced interaction
- [ ] Voice interaction
- [ ] Image understanding
- [ ] More capable agent workflows

### Phase 8 — Production readiness
- [ ] Security and privacy review
- [ ] Usage and error monitoring
- [ ] Performance and accessibility improvements
- [ ] Database-backed persistence and scalable infrastructure

## Product principles

1. **Student-first:** features should solve real learning or productivity problems.
2. **Honest AI:** communicate uncertainty and avoid presenting generated content as verified fact.
3. **Privacy-conscious:** protect credentials and give users clarity and control over their data.
4. **Reliable before expansive:** test foundations before adding complexity.
5. **Incremental delivery:** ship small, verified improvements rather than claiming unfinished features.
