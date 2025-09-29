# Deployment Guide

This guide explains how to deploy the Psy-Kate website with liquid glass design to a production server.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A server with SSH access (or a cloud platform like Replit, Heroku, Vercel, etc.)

## Build Process

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

   This command will:

   - Build the React frontend using Vite
   - Bundle the server code using esbuild
   - Output everything to the `dist/` directory

## Deployment Options

### Option 1: Traditional Server Deployment

1. Copy the `dist/` directory to your server
2. Install production dependencies only:
   ```bash
   npm install --production
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Option 2: Using Process Manager (PM2)

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```
2. Start the application:
   ```bash
   pm2 start dist/index.js --name "psy-kate"
   ```

### Option 3: Docker Deployment

Create a Dockerfile in the project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

Then build and run:

```bash
docker build -t psy-kate .
docker run -p 3000:3000 psy-kate
```

## Environment Variables

Set the following environment variables for production:

- `NODE_ENV=production`
- `PORT=3000` (or your preferred port)

## Server Configuration

The application is configured to:

- Listen on all interfaces (`0.0.0.0`) in production
- Serve both API endpoints and static files
- Use port 3000 by default (configurable via `PORT` environment variable)

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
3. Ensure the PORT is not blocked by firewall
4. Check server logs for error messages

For any issues, please check the console logs or contact the development team.
