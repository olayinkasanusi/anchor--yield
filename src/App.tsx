import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Investment from './pages/Investment.tsx';
import Profile from './pages/Profile.tsx';
import Support from './pages/Support.tsx';
import Landing from './pages/Landing.tsx';
import Auth from './pages/Auth.tsx';
import AuthGuard from './components/auth/AuthGuard.tsx';

import { ToastProvider } from './context/ToastContext.tsx';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          
          <Route element={<AuthGuard><Layout /></AuthGuard>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
