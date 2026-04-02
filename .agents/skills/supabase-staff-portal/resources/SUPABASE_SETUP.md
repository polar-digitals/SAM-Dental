# Supabase Setup Guide for SAM Dental

## Step 1 — Create a Supabase Project
1. Go to https://supabase.com and sign up / log in
2. Click **New Project** → fill in name "SAM-Dental" → set a database password → Create

## Step 2 — Create the Appointments Table
Go to **Table Editor** → **New Table** and create:

```sql
-- Run this in Supabase SQL Editor (Database > SQL Editor > New Query)

CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  service TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Allow anyone to INSERT (patients booking)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert appointments"
  ON appointments FOR INSERT
  WITH CHECK (true);

-- Only authenticated staff can read/update/delete
CREATE POLICY "Staff can read appointments"
  ON appointments FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Staff can update appointments"
  ON appointments FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Staff can delete appointments"
  ON appointments FOR DELETE
  USING (auth.role() = 'authenticated');
```

## Step 3 — Get Your API Keys
Go to **Settings** → **API**:
- Copy **Project URL** (e.g. https://abcxyz.supabase.co)
- Copy **anon public** key

## Step 4 — Update App.tsx
Open `src/App.tsx` and replace lines 8–9:

```typescript
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";   // ← your Project URL
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";                  // ← your anon key
```

## Step 5 — Create Staff Accounts
Go to **Authentication** → **Users** → **Add User**:
- Email: `admin@samdental.com` (or any staff email)
- Password: set a strong password
- Click **Create User**

Staff log in at the Staff Portal (click "Staff Portal" link in the footer).

## Done!
- Patients book appointments → saved to Supabase automatically
- Staff log into the portal with Supabase credentials
- Staff can confirm, cancel, or delete appointments from the dashboard
