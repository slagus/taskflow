# ⚡ TaskFlow

A production-grade, multi-platform productivity suite structured as a high-performance **Turborepo monorepo** using **pnpm workspaces**. TaskFlow showcases modern full-stack engineering principles, featuring an abstracted Data Repository pattern with swappable storage drivers and a sleek, modular React single-page application.

---

## 🏗️ Architecture & Monorepo Structure

TaskFlow is organized into decoupled shared packages and applications to ensure clean separation of concerns and maximum code reusability:

```text
taskflow/
├── apps/
│   └── web/                   # Vite + React SPA (Tailwind CSS v4)
├── packages/
│   ├── database/              # Repository pattern & storage drivers (localStorage / Supabase)
│   └── types/                 # Shared data contracts and TypeScript interfaces
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

### Shared Packages
* **`@taskflow/types`**: Centralized TypeScript interfaces and data structures (`Task`, `CreateTaskInput`, `TaskStatus`, `TaskPriority`, etc.).
* **`@taskflow/database`**: Implements the abstracted `ITaskRepository` interface, currently powered by `LocalTaskRepository` for lightning-fast zero-config browser state persistence.

---

## 🖥️ Web App Architecture (`apps/web`)

Built as a lightweight Vite + React SPA with **Tailwind CSS v4** (`@tailwindcss/vite`), the web application follows a modular, single-responsibility component design pattern:

```text
apps/web/src/
├── components/                # Reusable UI building blocks
│   ├── MetricCard.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── TaskForm.tsx
│   └── TaskItem.tsx
├── hooks/                     # Custom business logic & state encapsulation
│   └── useTaskManagement.ts
├── screens/                   # Client-side screen views
│   ├── DashboardView.tsx
│   └── ProjectsView.tsx
├── App.tsx                    # Lightweight container orchestrating views & layout
├── main.tsx
└── index.css
```

---

## 📱 Application Screens & Features

### 1. Dashboard View (`DashboardView`)
* **Productivity Overview Metrics:** Real-time calculation of total tasks, items in progress, completed workflows, and urgent focus alerts via reusable `MetricCard` components.
* **Task Stream Feed:** Filterable task stream supporting `all`, `todo`, `in_progress`, and `completed` status tabs.
* **Interactive Task Actions:** Instant status toggling, deletion, and real-time search filtering across titles and descriptions.
* **Quick Task Creator:** `TaskForm` component for rapidly generating new tasks with custom priorities (*low*, *medium*, *high*, *urgent*) and categories.

### 2. Project Workspaces (`ProjectsView`)
* **Task Grouping:** Organizes high-level initiatives (e.g., *Work & Career*, *Personal & Home*, *Health & Fitness*) into dedicated project buckets.
* **Progress Tracking:** Visual completion progress bars and dynamic task counters summarizing task completion rates per project.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* `pnpm` package manager

### Installation & Development
1. Clone the repository and install workspace dependencies from the **root directory**:
   ```bash
   pnpm install
   ```

2. Start the development environment across the monorepo:
   ```bash
   pnpm dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to explore the application.

---

## 🛠️ Tech Stack
* **Monorepo:** Turborepo, pnpm Workspaces
* **Frontend:** React 18, Vite, Tailwind CSS v4, Lucide React
* **Data Layer:** TypeScript, Abstracted Repository Pattern (`localStorage` driver)