# SkillConnect Jobs

SkillConnect Jobs is a modern web application that connects skilled workers with customers seeking services. The platform provides a seamless experience for job seekers and service providers to interact, manage profiles, and handle job requests efficiently.

## Features

- User authentication and profile management
- Role-based access for workers and customers
- Job/service listings and applications
- Notification center for updates and alerts
- Responsive design with light/dark mode support
- Integration with Supabase for backend services

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI Components:** Shadcn/UI, Lucide Icons
- **Backend:** Supabase (PostgreSQL, Auth)
- **Routing:** React Router
- **State Management:** React Hooks, Context
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Supabase account (for backend)

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
   - Copy `.env.example` to `.env` and fill in your Supabase credentials.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
public/
  images/
  index.html
src/
  components/
  hooks/
  lib/
  pages/
  utils/
  main.tsx
index.html
```

- **components/**: Reusable UI components (Navbar, NotificationCenter, etc.)
- **hooks/**: Custom React hooks
- **lib/**: Supabase client and other libraries
- **pages/**: Route-based page components
- **utils/**: Utility functions (auth, helpers, etc.)

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and submit a pull request

## License

This project is licensed under the MIT License.

---

**SkillConnect Jobs** – Empowering connections, enabling opportunities.

