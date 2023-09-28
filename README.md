# Vehicle list MobX example

A simple Next.js example of displaying data fetched from an API, in this case from Supabase, using MobX for state management.
It also features some neat components that are all custom and written in plain CSS (CSS Modules).

## Running the project

1. Install dependencies:
```bash
pnpm i
```
2. Create a file named `.env.local` and paste in the following:
```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```
3. Start the dev server:
```bash
pnpm dev
```
4. The project is available at http://localhost:3000

Vercel deployment link:

https://vehicle-list-mobx-example.vercel.app/
