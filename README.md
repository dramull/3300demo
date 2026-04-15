# Prism — See Any Decision From Every Angle

AI-powered decision clarity engine that helps you make hard decisions using research-backed thinking frameworks.

## What It Does

When facing a major life decision, Prism guides you through **5 structured AI conversations** — each based on real decision science research:

| Lens | Framework | What It Reveals |
|------|-----------|-----------------|
| **Values Alignment** | ACT Values Clarification | How options map to core values |
| **Future Self** | Hershfield's future self-continuity | What your future self would say |
| **Fear Inventory** | Ferriss' Fear Setting + CBT | Protection vs. paralysis |
| **Ripple Effects** | Stakeholder analysis | Impact on others |
| **Regret Minimization** | Bezos + Welch 10-10-10 | The path of least regret |

After exploring lenses, Prism synthesizes insights across all conversations into a **Clarity Report** with patterns, blindspots, and a clarity statement.

## Demo Mode

The full app works **without any API keys or accounts**. Click "Try Demo" to experience a pre-built career decision with realistic AI responses across all 5 lenses.

## Tech Stack

- **Frontend**: React 19 + Vite 8 + Tailwind CSS v4
- **Auth & Database**: Supabase (with Row Level Security)
- **AI**: OpenRouter (any model — default: Gemini 2.0 Flash)
- **Deployment**: Netlify
- **Animations**: Framer Motion

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` and click "Try Demo" — no setup needed.

## With Your Own API Keys

1. Copy `.env.example` to `.env.local`
2. Add your Supabase URL and anon key
3. Add your OpenRouter API key
4. Run the SQL from `supabase/schema.sql` in your Supabase dashboard
5. `npm run dev`

## Deploy to Netlify

The `netlify.toml` is pre-configured. Just connect the repo and deploy.

## Project Structure

```
src/
├── config/          # Supabase + OpenRouter clients
├── contexts/        # Auth provider with demo mode
├── hooks/           # useAuth, useDecisions, useLens
├── components/      # Layout, LensCard, MessageBubble, DecisionCard
├── pages/           # Landing, Auth, Dashboard, NewDecision, LensExplorer, Report, Settings
└── lib/             # Decision science lenses, AI orchestration, demo data
```

## CS 3300 Demo

This project demonstrates human+AI collaboration to produce real societal value — helping people break through decision paralysis using structured frameworks from psychology and decision science.
