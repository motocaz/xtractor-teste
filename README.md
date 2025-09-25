# Xtractor - Document Extraction Platform

A Next.js application for document management and data extraction.

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Add these to your `.env.local` file
4. Follow the [Supabase Next.js guide](https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app) for server-side auth setup

## Features

- **Main Page**: Document search and extraction interface
- **Files Page**: Document management and upload interface
- **Authentication**: Sign in, sign up, and password reset
- **Responsive Design**: Mobile-friendly interface

## Pages

- `/` - Main extraction interface
- `/files` - Document management
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- `/auth/reset-password` - Password reset page

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Supabase for authentication
- Lucide React for icons
