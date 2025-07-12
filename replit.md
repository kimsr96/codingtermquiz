# Basic Coding Quiz Application

## Overview

This is a Korean-language coding quiz application built with React (frontend) and Express (backend). It tests users' knowledge of basic HTML, CSS, and JavaScript concepts through a 10-question multiple-choice quiz format. The app features an interactive UI with immediate feedback, progress tracking, and detailed answer reviews.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks (useState) for local state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage class) for questions and quiz sessions
- **Database ORM**: Drizzle ORM configured for PostgreSQL (currently using in-memory fallback)
- **API Structure**: RESTful endpoints for quiz operations
- **Session Management**: Basic quiz session tracking

## Key Components

### Frontend Components
- **WelcomeScreen**: Landing page with quiz introduction
- **QuizScreen**: Main quiz interface with question display and answer selection
- **ResultsScreen**: Score display and completion summary
- **ReviewScreen**: Detailed answer review with explanations
- **UI Components**: Comprehensive shadcn/ui component library

### Backend Components
- **Storage Layer**: Abstract IStorage interface with MemStorage implementation
- **API Routes**: Quiz session management and question retrieval endpoints
- **Question Data**: Hardcoded quiz questions about HTML, CSS, and JavaScript basics

### Database Schema
- **questions**: Stores quiz questions with options, correct answers, and explanations
- **quiz_sessions**: Tracks user quiz attempts with scores and answers

## Data Flow

1. **Quiz Initialization**: User starts quiz → creates session → fetches questions
2. **Question Flow**: Display question → user selects answer → show feedback → next question
3. **Completion**: All questions answered → calculate score → display results
4. **Review**: User can review all questions with correct answers and explanations

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Styling**: Tailwind CSS, shadcn/ui component library
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form with Zod validation

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL support
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution, Vite for frontend bundling

## Deployment Strategy

### Development Setup
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: Express server with TypeScript compilation via tsx
- **Database**: Currently using in-memory storage, configured for PostgreSQL migration

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations ready for PostgreSQL deployment

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required for production)
- **NODE_ENV**: Environment mode (development/production)
- **Replit Integration**: Specialized configuration for Replit hosting

### Key Architectural Decisions

1. **In-Memory Storage**: Chosen for simplicity in development, with clear migration path to PostgreSQL
2. **TypeScript Throughout**: Ensures type safety across the full stack
3. **Component-Based UI**: Modular React components for maintainability
4. **RESTful API Design**: Simple, predictable endpoints for quiz operations
5. **Responsive Design**: Mobile-first approach with Tailwind CSS
6. **Immediate Feedback**: Real-time answer validation for better user experience
7. **Randomized Options**: Quiz options are shuffled for each question to prevent pattern memorization

### Recent Changes (2025-01-12)

1. **Enhanced UI/UX for Results Screen**: 
   - Increased font sizes for better readability
   - Improved color contrast and visibility
   - Enhanced score display and achievement messages
   - Added better visual hierarchy with larger icons and spacing

2. **Improved Review Screen**:
   - Redesigned question cards with better spacing
   - Enhanced answer option display with clear color coding
   - Improved typography and visual feedback for correct/incorrect answers

3. **Randomized Answer Options**:
   - Implemented Fisher-Yates shuffle algorithm for answer randomization
   - Maintains correct answer mapping while shuffling display order
   - Enhances quiz authenticity by preventing memorization patterns

4. **Color System Improvements**:
   - Fixed color visibility issues in results screen
   - Enhanced brand colors for better contrast
   - Improved text readability across all components

The application is designed to be easily deployable on Replit with minimal configuration, while maintaining the flexibility to scale to a full PostgreSQL database when needed.