'use client';

import { ReactNode } from 'react';
import AuthProvider from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="top-center" />
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;