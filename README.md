# Reddit Clone

A full-stack Reddit clone built with Next.js, React, Redux Toolkit, and Tailwind CSS. This project demonstrates a modern, responsive, and interactive Reddit-like experience, including subreddit browsing, post voting, comments, and search functionality.

## Features

- **Browse Subreddits:** View posts from popular subreddits with subreddit icons.
- **Search Posts:** Search Reddit posts by keyword and view results instantly.
- **Post Voting:** Upvote and downvote posts, with real-time UI updates.
- **Comments:** Expand/collapse comments for each post, with loading states and error handling.
- **Responsive UI:** Mobile-friendly, dark-themed interface using Tailwind CSS and shadcn/ui components.
- **Redux State Management:** Uses Redux Toolkit for posts, search, and comments state.
- **Skeleton Loading:** Animated skeletons for loading states.
- **Error Handling:** Toast notifications for errors and user feedback.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, SSR, API routes)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` — Next.js app directory (pages, layout, providers)
- `components/` — UI and container components (Navbar, PostContainer, Comments, etc.)
- `lib/` — Redux slices, hooks, and utilities
- `public/` — Static assets (icons, subreddit images)

## Key Files

- `app/page.jsx` — Home page, displays posts and subreddits
- `app/search/[query]/page.jsx` — Search results page
- `app/subreddit/[subreddit]/page.jsx` — Subreddit-specific posts
- `components/container/PostContainer.jsx` — Post display, voting, and comments
- `components/container/Comments.jsx` — Comments section for posts
- `lib/features/` — Redux slices for posts, search, and comments

## Customization

- **Add Subreddits:** Edit `components/container/SubredditsContainer.jsx` to add or remove subreddits and icons.
- **Styling:** Modify `app/globals.css` and Tailwind config for custom themes.

## Scripts

- `dev` — Start development server
- `build` — Build for production
- `start` — Start production server
- `lint` — Run ESLint

## Dependencies

See `package.json` for a full list. Key dependencies include:

- `next`, `react`, `redux`, `@reduxjs/toolkit`, `tailwindcss`, `shadcn/ui`, `lucide-react`, `sonner`

## License

This project is for educational and portfolio purposes only.

---

Inspired by Reddit. Built as a Codecademy portfolio project.
