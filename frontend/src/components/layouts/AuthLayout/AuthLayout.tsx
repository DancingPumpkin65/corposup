import React from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.card}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {children}
        </div>
      </div>
    </div>
  );
};
