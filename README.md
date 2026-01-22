# AdminPro - React Industry App

A production-ready, feature-rich admin dashboard built with modern web technologies and industry best practices. This application demonstrates scalable architecture, secure authentication, real-time file uploads, theme switching, and advanced UI components.
## PREVIEW
---
<p align="center">
  <img src="https://github.com/user-attachments/assets/92f27e82-d983-4bcd-aac8-1d823a7aa152" alt="Preview" />
</p>


<img width="1920" height="880" alt="Image" src="https://github.com/user-attachments/assets/721a6c7b-a1dc-4748-8196-5869fe48b28d" />

<img width="1915" height="876" alt="Image" src="https://github.com/user-attachments/assets/62c1269f-3857-42f1-a550-7c128a3dd93e" />

---

## 🚀 Tech Stack

### Core
- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)

### UI & Styling
- **UI Library**: [Material UI (MUI v7)](https://mui.com/)
- **Icons**: [MUI Icons](https://mui.com/material-ui/material-icons/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Notifications**: [Notistack](https://notistack.com/)

### Form & Data Handling
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Advanced Selects**: [React Select](https://react-select.com/)
- **File Upload**: [React Dropzone](https://react-dropzone.js.org/)
- **Color Utilities**: [Chroma.js](https://gka.github.io/chroma.js/)

### Real-time & Communication
- **WebSocket**: [Socket.io Client](https://socket.io/) (simulated)

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login/Register**: Fully functional forms with validation
- **Session Persistence**: User session persists on page refresh using `localStorage`
- **Mock Backend**: Simulates API calls with network delay
- **Auto-Login**: Automatically signs in after successful registration
- **Protected Routes**: Dashboard and internal pages are inaccessible without login
- **Route Guards**: `PrivateRoute` component handles route security

### 🎨 Theme System
- **Dark/Light Mode**: Toggle between themes with a single click
- **Persistent Preference**: Theme choice saved in `localStorage`
- **Dynamic Theming**: All components adapt to the selected theme
- **Custom Palettes**: Professionally designed color schemes for both modes

### 📁 File Manager
- **Drag & Drop Upload**: Intuitive file upload with visual feedback
- **Global Upload Widget**: Persistent upload status widget across all pages
- **Real-time Progress**: Live upload progress tracking (simulated)
- **Upload Persistence**: Upload history saved in `localStorage`
- **Recent Files**: View recently uploaded files with metadata
- **Responsive Layout**: Adapts to mobile and desktop screens

### 🎯 Advanced Selectors
Dedicated page showcasing various `react-select` implementations:
- **Single Select**: Standard dropdown selection
- **Multi Select**: Select multiple options
- **Creatable Select**: Create new options on the fly
- **Animated Select**: Smooth animations for better UX
- **Color Select**: Visual color picker with chroma.js integration

### 🎨 UI/UX Excellence
- **Responsive Design**:
  - Mobile: Collapsible sidebar drawer
  - Desktop: Permanent sidebar with collapse option
- **Professional Theming**: Custom MUI theme with modern typography
- **Loading States**: Spinners and skeleton loaders
- **Error Handling**: User-friendly error messages and alerts
- **Micro-animations**: Smooth transitions and hover effects

### 📄 Pages
- **Dashboard**: Key metrics and statistics with grid layout
- **Users**: Data table with sorting and filtering
- **Files**: File manager with upload capabilities
- **Selectors**: Showcase of advanced select components
- **Settings**: User preferences and configuration

## 📁 Project Structure

```
src/
├── app/              # Redux store configuration and hooks
│   ├── store.ts      # Redux store setup
│   └── hooks.ts      # Typed Redux hooks
├── components/       # Reusable UI components
│   ├── Navbar.tsx    # Top navigation with theme toggle
│   ├── Sidebar.tsx   # Collapsible sidebar navigation
│   ├── Loader.tsx    # Loading spinner
│   ├── DataTable.tsx # Reusable data table
│   └── UploadWidget.tsx # Global upload status widget
├── context/          # React Context providers
│   ├── AuthContext.tsx   # Authentication context
│   ├── ThemeContext.tsx  # Theme management context
│   └── SocketContext.tsx # Socket.io context (simulated)
├── layouts/          # Page layouts
│   ├── PublicLayout.tsx  # Layout for login/register
│   └── PrivateLayout.tsx # Layout for authenticated pages
├── pages/            # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── FilesPage.tsx     # File manager page
│   ├── SelectorsPage.tsx # Advanced selectors showcase
│   ├── Settings.tsx
│   └── NotFound.tsx
├── routes/           # Route definitions and guards
│   ├── router.tsx    # Route configuration
│   └── PrivateRoute.tsx # Protected route wrapper
├── services/         # API services and mock data
│   └── auth.service.ts # Authentication service
├── store/            # Redux slices
│   ├── authSlice.ts    # Authentication state
│   └── uploadSlice.ts  # Upload state with persistence
├── theme/            # MUI theme configuration
│   └── muiTheme.ts   # Theme definitions (light/dark)
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Entry point with providers
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ssarthak75way/AdminPro.git
   cd react-industry-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔑 Demo Credentials

You can use the following credentials to log in immediately:

- **Email**: `admin@example.com`
- **Password**: `password`

*Or register a new account to test the full authentication flow.*

## 🎯 Key Features Walkthrough

### Theme Switching
1. Click the sun/moon icon in the navbar
2. Theme switches instantly between light and dark mode
3. Preference is saved and persists across sessions

### File Upload
1. Navigate to the **Files** page
2. Drag and drop files or click to browse
3. Watch real-time upload progress in the bottom-right widget
4. Uploaded files appear in the "Recent Files" section
5. Upload history persists even after page refresh

### Advanced Selectors
1. Visit the **Selectors** page
2. Explore 5 different types of select components
3. Try the color selector with visual color dots
4. All selectors adapt to the current theme

## 🏗️ Architecture Highlights

### State Management
- **Redux Toolkit** for global state (auth, uploads)
- **React Context** for theme and socket management
- **localStorage** for persistence (auth, theme, uploads)

### Code Quality
- **TypeScript**: Full type safety across the application
- **ESLint**: Code linting and formatting
- **Modular Structure**: Clean separation of concerns
- **Reusable Components**: DRY principle throughout

### Performance
- **Vite**: Lightning-fast HMR and optimized builds
- **Code Splitting**: Lazy loading for better performance
- **Optimized Bundle**: Tree-shaking and minification

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package

## 📝 Environment Variables

No environment variables required for the current setup. The app uses mock services for demonstration purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - feel free to use this project for learning or as a starter template.

## 🙏 Acknowledgments

Built with modern React best practices and industry-standard tools to demonstrate a production-ready admin dashboard architecture.

---

**Version**: 1.2.2  
**Last Updated**: January 2026
