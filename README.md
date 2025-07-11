# Weeb - Anastasiia Shlapak

## Table of Contents

- [Architecture & Folder Structure](#architecture--folder-structure)
- [Libraries & Dependencies](#libraries--dependencies)
- [Application Functionality](#application-functionality)
- [Code Onboarding & Maintainability](#code-onboarding--maintainability)
- [Design Decisions](#design-decisions)
  - [Login & Contact Forms](#login--contact-forms)
  - [Page Naming](#page-naming)
  - [SCSS Usage](#scss-usage)
  - [Framer Motion Usage](#framer-motion-usage)
  - [New Dependencies](#new-dependencies)
- [How to Run the Project](#how-to-run-the-project)
- [Summary](#summary)

---

## Architecture & Folder Structure

The project uses a **modular, feature-based folder structure** for clarity and scalability:

```
src/
  api/           # API utilities and hooks
  assets/        # Images, icons, and static assets
  components/    # Reusable UI components (Button, Header, Footer, etc.)
  hooks/         # Custom React hooks
  layouts/       # Layout components (e.g., MainLayout)
  pages/         # Page-level components, grouped by feature (Home, Auth, Contact)
  router/        # App routing logic
  styles/        # Global SCSS, variables, mixins, resets
  utils/         # Utility functions
```

- **Layouts**: The `MainLayout` wraps all pages, providing a consistent header, main, and footer.
- **Pages**: Each page (Home, Contact, Auth) is isolated for maintainability.
- **Components**: UI elements are reusable and styled with SCSS modules for encapsulation.

---

## Libraries & Dependencies

**Main dependencies:**

- **React**
- **React Router DOM**
- **Framer Motion**
- **Sass (SCSS)**
- **classnames**

**Why these?**

- Chosen for modern, fast, and scalable React development.
- SCSS and classnames improve styling flexibility and maintainability.
- Framer Motion enables professional, accessible animations.
- Vite and TypeScript provide a fast, type-safe workflow.

---

## Application Functionality

- **Home Page**: Features hero, companies, learn, and trends sections.
- **Contact Page**: Custom form for user feedback.
- **Auth Pages**: Separate login and signup forms with validation.
- **Header/Footer**: Consistent navigation and branding.
- **Routing**: Managed with `react-router-dom` and Framer Motion for animations.

---

## Code Onboarding & Maintainability

- **SCSS modules**: Each component/page has its own scoped styles.
- **Global styles**: Centralized variables, mixins, and resets.
- **Hooks**: Encapsulated reusable logic.
- **Naming**: Clear, feature-based naming for files and folders.

---

## Design Decisions

### Login & Contact Forms

- Customized for clarity and coherence.
- Improved readability, consistent layout, and mobile responsiveness.

### Page Naming

- "About" renamed to "Home" for better clarity.

### SCSS Usage

- SCSS allows for variables, mixins, and nesting.
- `.module.scss` ensures component style isolation.
- Centralized global styles in `src/styles/`.

### Framer Motion Usage

- Used in `AppRouter.tsx` with `AnimatePresence` and `motion.div`.
- Smooth route transitions enhance UX.

### New Dependencies

- **classnames**
- **framer-motion**
- **sass**
- **@vitejs/plugin-react**

---

## How to Run the Project

1. Install dependencies:
   ```bash
   npm install
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## Summary

This project is structured for clarity, scalability, and maintainability.  
Custom forms and naming improve user experience and code readability.  
Modern libraries and SCSS modules ensure a robust, professional, and enjoyable development workflow.

---
