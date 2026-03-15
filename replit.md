# ADIXO FREE INCOME

## Project Overview
A React + Vite single-page application where users can register, log in, and complete Free Fire game missions to earn virtual rewards.

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Vite 6
- **UI**: lucide-react icons, motion animations
- **State**: localStorage for user accounts and session data
- **AI**: @google/genai (Gemini API key via env)

## Architecture
- Pure frontend SPA — no backend server
- User data stored in browser localStorage
- Support tickets sent via Telegram link

## Key Files
- `src/App.tsx` — main component with all views (home, login, register, profile, history, support, missions)
- `src/main.tsx` — React entry point
- `src/index.css` — global styles
- `vite.config.ts` — Vite config (port 5000, host 0.0.0.0, allowedHosts: true)
- `index.html` — HTML entry point

## Development
- Run: `npm run dev` (serves on port 5000)
- Build: `npm run build`

## Deployment
- Target: static
- Build command: `npm run build`
- Public dir: `dist`

## Environment Variables
- `GEMINI_API_KEY` — Gemini AI API key (optional, from .env.local)
