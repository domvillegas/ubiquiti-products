import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';
import Button from '@/components/Button/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h1>An Error Occured</h1>
          <p>
            Try again by clicking the button below or contact our web developer
            team at ubiquitiwebdevsupport@ui.com.
          </p>
          <Button
            buttonEffect={() => this.setState({ hasError: false })}
            buttonText="Try Again"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
