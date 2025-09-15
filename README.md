
# SkillConnect Jobs

SkillConnect Jobs is a professional web application designed to connect skilled workers with customers seeking a wide range of services. The platform offers an efficient and user-friendly experience for both job seekers and service providers, enabling seamless profile management, job requests, and service discovery.

## Features

- Secure user authentication and profile management
- Role-based access for workers and customers
- Comprehensive job and service listings
- Application management for job seekers
- Real-time notification center for updates and alerts
- Responsive design with support for light and dark modes
- Integration with Supabase for database and backend services

## Technology Stack

- **Frontend:** React, TypeScript, Vite
- **UI Components:** Shadcn/UI, Lucide Icons
- **Backend:** Supabase (PostgreSQL, Authentication)
- **Routing:** React Router
- **State Management:** React Hooks, Context API
- **Styling:** Tailwind CSS

## Live Demo

SkillConnect Jobs is hosted on Vercel. Access the live application here:

[https://skillconnect-jobs-4ut7.vercel.app/](https://skillconnect-jobs-4ut7.vercel.app/)

## Project Structure

```
public/
  images/
  index.html
src/
  components/
    ui/
  hooks/
  lib/
  pages/
  utils/
  main.tsx
index.html
```

- **components/**: Reusable UI components (e.g., Navbar, NotificationCenter)
- **components/ui/**: Shared UI primitives and controls
- **hooks/**: Custom React hooks
- **lib/**: Supabase client and supporting libraries
- **pages/**: Route-based page components
- **utils/**: Utility functions (authentication, helpers, etc.)

## Getting Started

To set up SkillConnect Jobs locally for development or contribution:

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Supabase account (for backend configuration)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/skillconnect-jobs.git
   cd skillconnect-jobs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and provide your Supabase credentials.

4. **Deploy or run locally:**
   - For local development, use `npm run dev` or `yarn dev`.
   - For production, deploy to Vercel or your preferred hosting provider.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and submit a pull request

Please open issues for feature requests or bug reports.

## License

This project is currently unlicensed. Please contact the repository owner for usage permissions.

---

**SkillConnect Jobs** – Empowering connections, enabling opportunities.

