import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../common/Button';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>App</h1>
          <nav className={styles.nav}>
            {isAuthenticated ? (
              <div className={styles.userInfo}>
                <span>Welcome, {user?.firstname}</span>
                <Button onClick={logout} variant="secondary">
                  Logout
                </Button>
              </div>
            ) : (
              <div className={styles.authLinks}>
                <a href="/signin">Sign In </a>
                <a href="/signup"> Sign Up</a>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
    </div>
  );
};
