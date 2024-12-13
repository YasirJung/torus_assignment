
# Dynamic Dashboard

This project is a dynamic dashboard built with React, Redux, and TypeScript. It includes features like user management and analytics visualization with data filtering capabilities.

## Features

1. **User Management Dashboard**:
   - View a list of users with pagination.
   - Search and filter users by name or email.
   - View detailed user information.
   - Delete users dynamically.

2. **Analytics Dashboard**:
   - Overview of total users, active users, and deleted users.
   - User registration trend visualized using line charts.
   - Active vs. Inactive user distribution using pie charts.
   - User distribution by region using bar charts.
   - Filter data by region and date range.

## Project Structure

- **`/components`**: Contains React components like `AnalyticsDashboard.tsx`, `LoginPage.tsx`, and `UserManagement.tsx`.
- **`/store`**: Redux store and slices for state management (`analyticsSlice.ts` and `userSlice.ts`).
- **`/services`**: API simulation with mock data.
- **`/types`**: TypeScript interfaces and types used throughout the project.
- **Public Assets**: Contains static assets like `index.html`, logos, and other files for the app.
- **`index.tsx`**: Entry point for the React application.

## Requirements

- Node.js v14+
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-link.git
   cd torus_assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the project:
   ```bash
   npm start
   ```

4. Open the application:
   - Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

5. **Login Credentials**:
   - **Email**: `admin@example.com`
   - **Password**: `password`


## Assumptions

- Mock data is used for user details and analytics data.
- The project does not include a backend server.

## Technologies Used

- React (Frontend Framework)
- Redux Toolkit (State Management)
- TypeScript (Static Typing)
- TailwindCSS (Styling)
- Recharts (Data Visualization)

## Folder Structure

```
src/
├── components/
│   ├── AnalyticsDashboard.tsx
│   ├── LoginPage.tsx
│   ├── UserManagement.tsx
├── services/
│   ├── api.ts
├── store/
│   ├── slices/
│   │   ├── analyticsSlice.ts
│   │   ├── userSlice.ts
│   ├── index.ts
├── types/
│   ├── index.ts
├── App.tsx
├── index.tsx
├── index.css
```

---

## Features Implemented

- Data filtering for analytics and user management.
- Interactive charts and user interfaces.
- Well-structured and modularized code.

