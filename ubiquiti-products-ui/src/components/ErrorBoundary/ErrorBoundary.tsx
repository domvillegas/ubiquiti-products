import React from 'react';

class ErrorBoundary extends React.Component {
  // IMPROVE THIS TYPE
  // IMPROVE THIS TYPE
  // IMPROVE THIS TYPE
  // IMPROVE THIS TYPE
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>An Error Occured</h1>
          <p>
            Try again by clicking the button below or contact our web developer
            team at ubiquitiwebdevsupport@ui.com.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
