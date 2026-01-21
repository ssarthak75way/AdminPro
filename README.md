# AdminPro - React App

A production-ready, frontend-only web application built with modern web technologies and best practices. This project demonstrates a scalable architecture, secure authentication flow, and a professional UI using Material UI.

##  Tech Stack

-   **Framework**: [React 18](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Routing**: [React Router v6](https://reactrouter.com/)
-   **UI Library**: [Material UI (MUI v5)](https://mui.com/)
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/)
-   **Icons**: [MUI Icons](https://doi.org/10.5281/zenodo.1234)

##  Features

### Authentication
-   **Secure Login/Register**: Fully functional forms with validation.
-   **Persistence**: User session persists on page refresh using `localStorage`.
-   **Mock Backend**: Simulates API calls with network delay.
-   **Auto-Login**: Automatically signs in after successful registration.

### Access Control
-   **Protected Routes**: Dashboard and internal pages are inaccessible without login.
-   **Public Routes**: Authenticated users are redirected from Login/Register to Dashboard.
-   **Guards**: `PrivateRoute` component handles route security.

### UI/UX
-   **Responsive Layout**:
    -   **Mobile**: Collapsible Sidebar drawer.
    -   **Desktop**: Permanent Sidebar.
-   **Theming**: Custom MUI theme with professional typography and color palette.
-   **Feedback**: Loading spinners and error alerts for better user experience.

### Pages
-   **Dashboard**: Displays key metrics and statistics using a Grid layout.
-   **Users**: Data table demonstrating list rendering and component reusability.
-   **Settings**: Configuration page with toggle switches for user preferences.

## Project Structure

```bash
src/
├── app/            # Redux store configuration and hooks
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI components (Navbar, Sidebar, Loader, DataTable)
├── context/        # React Context providers (AuthContext)
├── layouts/        # Page layouts (PublicLayout, PrivateLayout)
├── pages/          # Page components (Login, Register, Dashboard, Users, Settings)
├── routes/         # Route definitions and guards
├── services/       # API services and mock data (auth.service)
├── store/          # Redux slices (authSlice)
├── theme/          # MUI theme configuration
├── App.tsx         # Main application component
└── main.tsx        # Entry point with Providers
```

##  Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ssarthak75way/AdminPro.git
    cd AdminPro
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

##  Demo Credentials

You can use the following credentials to log in immediately:

-   **Email**: `admin@example.com`
-   **Password**: `password`

*Or register a new account to test the full flow.*

## Best Practices Implemented

-   **TypeScript**: Full type safety across components, store, and services.
-   **Clean Code**: Modular folder structure and separation of concerns.
-   **Performance**: Vite for fast builds and optimized assets.
-   **Scalability**: Ready to integrate with a real backend API.
