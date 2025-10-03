# Deployment Guide

This guide explains how to deploy the Psy-Kate website with liquid glass design to Vercel.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Vercel account

## Build Process

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

   This command will build the React frontend using Vite and output everything to the `dist/` directory.

## Deploying to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

### Option 2: Using Git Integration

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect the project settings
   - Click "Deploy"

### Option 3: Manual Deployment

1. Build the project locally:

   ```bash
   npm run build
   ```

2. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

3. Deploy the dist folder:
   ```bash
   vercel dist
   ```

## Vercel Configuration

The project includes a `vercel.json` file with the following configuration:

- Rewrites all routes to index.html for client-side routing
- Security headers for enhanced protection

## Environment Variables

For local development, you can create a `.env.local` file with any required environment variables.

## Liquid Glass Design Features

The liquid glass design is implemented using:

- CSS backdrop filters for frosted glass effect
- Gradient animations for fluid appearance
- Responsive design that works on all devices
- Smooth transitions and hover effects

## Troubleshooting

If you encounter issues:

1. Check that all dependencies are installed
2. Verify the build process completed successfully
3. Check Vercel logs for error messages

For any issues, please check the console logs or contact the development team.
