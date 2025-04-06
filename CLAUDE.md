# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Backend: `cd backend && npm run build` (TypeScript compilation)
- Frontend: `cd client && npm run build` (Angular build)
- Backend dev: `cd backend && npm run dev` (nodemon with ts-node)
- Frontend dev: `cd client && npm run start` (Angular dev server)

## Test Commands
- Backend: `cd backend && npm test` (Jest)
- Frontend: `cd client && npm test` (Karma/Jasmine)
- Single test: `cd client && ng test --include=**/my-component.spec.ts` (for Angular)
- Single test: `cd backend && npx jest path/to/test.spec.ts` (for backend)

## Lint/Format Commands
- Backend linting: `cd backend && npm run lint` (assuming ESLint, add if needed)
- Frontend linting: `cd client && ng lint` (assuming Angular ESLint, add if needed)

## Code Style Guidelines
- TypeScript with strict type checking enabled
- Use interfaces for models with consistent naming (e.g., IAccountOperation in backend)
- kebab-case for files in Angular, camelCase for backend files
- Use Observables with RxJS for async operations in Angular
- Error handling: try/catch blocks with specific error messages in backend
- Use meaningful comments for complex logic
- Consistent schema validation in MongoDB models 
- Follow Angular best practices for component organization