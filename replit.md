# Overview

This is a full-stack web application for a psychologist's portfolio website, specifically for Ekaterina Chubiryaeva, a Gestalt therapist. The application features a modern, glass-morphism design with sections for services, about information, therapeutic approach, and contact forms. Built with React frontend and Express backend, it's designed to showcase psychological services with both online and offline consultation options.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming and glass-morphism effects
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation through @hookform/resolvers

## Backend Architecture  
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) ready for database integration

## Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL via @neondatabase/serverless
- **Schema**: Shared schema definitions between client and server in `/shared` directory
- **Migrations**: Drizzle Kit for database migrations
- **Validation**: Zod schemas integrated with Drizzle for type-safe data validation

## Development Setup
- **Monorepo Structure**: Client and server code in separate directories with shared types
- **Hot Reload**: Vite dev server with HMR for frontend, tsx watch mode for backend
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Development Tools**: Replit-specific plugins for error handling and development banner

## External Dependencies

- **Database**: Neon PostgreSQL serverless database
- **UI Components**: Radix UI primitives for accessible component foundation
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icons**: Font Awesome 6.4.0 and Lucide React icons
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Replit platform integration with cartographer and dev banner plugins