---
name: Dental Booking & Staff Portal System
description: A complete end-to-end booking flow and staff portal dashboard for dental clinics, integrated with Supabase.
---

# Supabase Dental Booking & Staff Portal System

This skill provides a complete, reusable end-to-end flow for a dental clinic:
- **Frontend Booking System:** A beautiful 3-step animated booking form.
- **Backend Staff Portal:** A secure dashboard using Supabase for authentication and appointment management.

Both components write to and read from the same Supabase `appointments` table.

## Setup Instructions

1.  **Configure Supabase:** Follow the instructions in `resources/SUPABASE_SETUP.md` to create your Supabase project, set up the database table with policies, and get your API keys.
2.  **Add Dependencies:** Ensure your project has the necessary dependencies. The components use `lucide-react` for icons and `motion/react` (or `framer-motion`) for animations. If you haven't already, install them:
    ```bash
    npm install lucide-react framer-motion @supabase/supabase-js
    ```
    *(Note: Adjust the motion/react imports if you use an older framer-motion version.)*
3.  **Integrate Components:** Copy both files from the `resources` directory into your project:
    - `StaffPortal.tsx` -> `src/components/StaffPortal.tsx`
    - `Booking.tsx` -> `src/components/Booking.tsx`
4.  **Update Config:** Update the `SUPABASE_URL` and `SUPABASE_ANON_KEY` variables at the top of `StaffPortal.tsx` with your actual project values. The `Booking.tsx` component automatically imports the Supabase client from `StaffPortal.tsx`.
5.  **Use the Booking Component:** Import and render `<BookingPage onBack={() => handleGoBack()} />` in your app where you want the clinic's booking flow to appear.
6.  **Use the Staff Portal Component:** Import and render `<StaffPage onClose={() => handleClose()} />` for your admin route. It will automatically handle session checking, show the `<StaffLogin />`, and transition to the `<StaffDashboard />` once authenticated.
