# Prompts

## Prompt 1 (con harness y sin harness, mismo texto)

**Modelo:** Opus 4.6 (1M context) with medium effort
**Herramienta:** Claude Code (plan mode)

```
 read and follow the instructions on  @../ticket.txt
```

---
**Plan con Harness:**
Here is Claude's plan:

 Plan: Login Page with User Avatar

 Context

 The ticket asks for a login screen in the frontend and a user avatar after login. The frontend is a pristine Vite + React 19 scaffold — no router, no components, plain CSS with custom properties. The backend already has POST /api/v1/auth/login accepting email + password and returning { user, token }. The user object includes initials (computed from fullName) but no avatar image, so the avatar will be an initials-based colored circle.

 Approach

 Use conditional rendering in App.tsx (no router needed): show login form when unauthenticated, show a welcome dashboard with avatar when authenticated. Store the token in memory (React state) — no localStorage for tokens.

 Files to modify

 ┌───────────────────────────────────────┬─────────┬──────────────────────────────────────────────────────────────────────────────┐
 │                 File                  │ Action  │                                   Purpose                                    │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/vite.config.ts               │ Edit    │ Add proxy /api → http://localhost:3333 so the frontend can reach the backend │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/src/App.tsx                  │ Rewrite │ Conditional render: LoginForm or Dashboard based on auth state               │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/src/App.css                  │ Rewrite │ Styles for login page layout and dashboard                                   │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/src/components/LoginForm.tsx │ Create  │ Email + password form, calls login API, shows errors                         │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/src/components/LoginForm.css │ Create  │ Login form card styles                                                       │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/src/components/Dashboard.tsx │ Create  │ Post-login view showing avatar + welcome message                             │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/src/components/Dashboard.css │ Create  │ Dashboard layout styles                                                      │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/src/components/Avatar.tsx    │ Create  │ Circular avatar displaying user initials                                     │
 ├───────────────────────────────────────┼─────────┼──────────────────────────────────────────────────────────────────────────────┤
 │ frontend/src/components/Avatar.css    │ Create  │ Avatar styling (circle, colors, sizing)                                      │
 └───────────────────────────────────────┴─────────┴──────────────────────────────────────────────────────────────────────────────┘

 Implementation details

 LoginForm

 - Two fields: email (type email, required, max 254) and password (type password, required)
 - Submit calls POST /api/v1/auth/login with fetch
 - Shows inline error on 401/400 responses
 - On success, passes { user, token } up to App via callback prop

 Avatar

 - Receives initials and optionally fullName as props
 - Renders a colored circle with the initials centered inside
 - Background color derived deterministically from the user's name (simple hash → hue)

 Dashboard

 - Shows Avatar component prominently
 - Displays user's full name and email
 - Includes a logout button (calls POST /api/v1/account/logout with the token)

 App.tsx

 - Holds user and token in state (initially null)
 - Renders LoginForm when no user, Dashboard when authenticated
 - Passes login/logout handlers down

 Proxy (vite.config.ts)

 - /api → http://localhost:3333 to avoid CORS during development

 Verification

 1. cd frontend && npm run lint — no lint errors
 2. cd frontend && npm run build — typecheck + build passes
 3. Start dev server, open browser, verify:
    - Login form renders with email/password fields
    - Invalid credentials show error message
    - Valid login shows dashboard with initials avatar
    - Logout returns to login form
---


---
**Plan SIN Harness:**

Plan: Login Page with User Avatar

 Context

 The ticket (ticket.txt) asks to create a login board/page for the frontend and include a user avatar when the user logs in. The project is a fresh Vite + React 19 + TypeScript scaffold with no routing, no auth, no components beyond the default template. Styling uses plain CSS with CSS custom properties and built-in dark mode support.

 Since there's no backend, the login will be frontend-only (simulated). After login, the app shows the current scaffold content plus a user avatar.

 Approach

 1. Create src/LoginPage.tsx + src/LoginPage.css

 A centered login form with:
 - Email and password inputs
 - A "Sign in" button
 - Styled consistently with the existing CSS variable system (--accent, --bg, --border, etc.)
 - Responsive (works on mobile)

 2. Create src/Avatar.tsx + src/Avatar.css

 A circular avatar component that:
 - Displays the user's initials derived from the email (e.g., fco@example.com → F)
 - Uses a colored background based on --accent
 - Shown in the top-right corner of the app after login

 3. Modify src/App.tsx

 - Add state: user (logged-in email or null)
 - If user is null → render <LoginPage onLogin={...} />
 - If user is set → render the existing app content with <Avatar> in a header bar
 - No React Router needed — simple conditional rendering

 4. Add a header bar to the logged-in view

 - A thin bar at the top showing the avatar + a logout button
 - Keeps the existing scaffold content below it

 Files to modify/create

 - Create: src/LoginPage.tsx, src/LoginPage.css
 - Create: src/Avatar.tsx, src/Avatar.css
 - Modify: src/App.tsx — add auth state and conditional rendering
 - Modify: src/App.css — add header bar styles (or put them in a separate file)

 Reusable patterns

 - CSS variables from src/index.css (colors, fonts, shadows)
 - Existing button styles (.counter class pattern for interactive elements)

 Verification

 1. Run npm run dev and open in browser
 2. Verify the login form renders on first load
 3. Enter an email + password and click sign in
 4. Verify the app transitions to the main view with the avatar visible
 5. Verify the avatar shows the user's initial from the email
 6. Click logout and verify it returns to the login form
 7. Test dark mode (system preference) and mobile viewport
 8. Run npm run build to ensure no TypeScript errors
---