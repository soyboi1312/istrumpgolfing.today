// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from '../styles/Home.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component to catch and handle React errors gracefully.
 * Prevents the entire app from crashing when a component throws an error.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI or default error message
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.sectionCard} style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2 className={styles.sectionTitle}>Something went wrong</h2>
          <p className={styles.textBlock}>
            An error occurred while loading this section. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className={styles.copyButton}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
