# Development Guide

## Setup

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later
- Git

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/mygithubkas/verison-web.git
   cd verison-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The site will be available at http://localhost:3000

## Project Structure
```
verison-web/
├── app/              # Next.js app directory
├── features/         # Feature components
├── lib/             # Utility functions
├── ui/              # Reusable UI components
└── animations/      # Animation components
```

## Development Workflow
1. Create a new branch for your feature
2. Make your changes
3. Test locally
4. Create a pull request

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack
- Next.js 14
- React 18
- Three.js
- Tailwind CSS
- TypeScript
- Framer Motion 