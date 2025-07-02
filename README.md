# LG Radar Dashboard

A modern, dark-themed Next.js dashboard for monitoring Western Australian government gazettes with real-time alerts and comprehensive audit logging.

## 🚀 Features

### Authentication
- **Supabase Authentication** with email/password and Google OAuth
- Secure session management with middleware protection
- Automatic redirects for authenticated/unauthenticated users

### Dashboard Components
- **Gazettes Management**: Monitor, search, and download government gazette publications
- **Alert System**: Create keyword-based alerts with email notifications
- **Audit Logs**: Comprehensive logging with export capabilities
- **Billing Integration**: Stripe-ready billing management (placeholder)
- **Account Settings**: User profile and security management
- **Contact Support**: Comprehensive contact form and support resources

### Design
- **Dark Mode**: ChatGPT-inspired dark theme by default
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components
- **Subtle Green Accents**: LG Radar brand colors throughout

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Supabase Auth with SSR support
- **Database**: Supabase (PostgreSQL)
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lgradar-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://memlxbsitkqvgitjubfo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lbWx4YnNpdGtxdmdpdGp1YmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNTQ5MDQsImV4cCI6MjA2NjgzMDkwNH0.NGDsC2airNcE4jUMj03W9psvASLwm4YbIjbUNe8C76s
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Protected dashboard routes
│   │   ├── gazettes/           # Gazette management
│   │   ├── alerts/             # Alert system
│   │   ├── audit/              # Audit logs (placeholder)
│   │   ├── billing/            # Billing management
│   │   └── account/            # Account settings
│   ├── login/                  # Authentication pages
│   ├── signup/
│   ├── contact/                # Contact support
│   ├── layout.tsx              # Root layout with dark mode
│   ├── page.tsx                # Home page (redirects)
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── dashboard-layout.tsx    # Main dashboard layout
├── lib/
│   ├── supabase.ts            # Client-side Supabase
│   ├── supabase-server.ts     # Server-side Supabase
│   └── utils.ts               # Utility functions
└── middleware.ts              # Authentication middleware
```

## 🔐 Authentication Flow

1. **Unauthenticated users** are redirected to `/login`
2. **Authenticated users** accessing auth pages are redirected to `/dashboard`
3. **Middleware** protects all `/dashboard/*` routes
4. **Session management** handled by Supabase with SSR support

## 🎨 Design System

### Colors
- **Primary**: Green (#22c55e) - LG Radar brand color
- **Background**: Dark theme with zinc color palette
- **Accents**: Subtle green highlights for interactive elements

### Components
- **Cards**: Clean, bordered containers with hover effects
- **Buttons**: Consistent styling with green primary actions
- **Forms**: Accessible inputs with proper labeling
- **Navigation**: Sidebar with active state indicators

## 📱 Pages Overview

### Authentication
- **Login** (`/login`): Email/password + Google OAuth
- **Sign Up** (`/signup`): Account creation with validation

### Dashboard
- **Overview** (`/dashboard`): Stats, recent activity, quick actions
- **Gazettes** (`/dashboard/gazettes`): List, search, download gazettes
- **Alerts** (`/dashboard/alerts`): Manage keyword alerts and email accounts
- **Billing** (`/dashboard/billing`): Subscription and invoice management
- **Account** (`/dashboard/account`): Profile, security, API keys

### Support
- **Contact** (`/contact`): Contact form, support resources, FAQ

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Enable Authentication providers (Email, Google)
3. Configure redirect URLs:
   - Development: `http://localhost:3000/dashboard`
   - Production: `https://wa.lgradar.com.au/dashboard`

### Google OAuth Setup
1. Create Google OAuth credentials
2. Add authorized redirect URIs in Google Console
3. Configure in Supabase Auth settings

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔮 Future Enhancements

### Planned Features
- **Real Gazette Integration**: Connect to WA Government Gazette API
- **Advanced Search**: Full-text search with filters
- **Email Templates**: Customizable alert email templates
- **API Endpoints**: REST API for external integrations
- **Stripe Integration**: Complete billing system
- **Audit Trail**: Detailed user activity logging
- **Export Features**: PDF/CSV exports for all data
- **Mobile App**: React Native companion app

### Technical Improvements
- **Database Schema**: Complete Supabase table structure
- **Real-time Updates**: WebSocket connections for live alerts
- **Caching**: Redis for improved performance
- **Testing**: Unit and integration tests
- **Monitoring**: Error tracking and analytics

## 📄 License

This project is proprietary software owned by LG Radar Pty Ltd.

## 🤝 Support

For technical support or questions:
- **Email**: support@lgradar.com.au
- **Phone**: +61 8 1234 5678
- **Address**: Level 1, 123 St Georges Terrace, Perth WA 6000

---

**Built with ❤️ for the Western Australian legal and business community**
