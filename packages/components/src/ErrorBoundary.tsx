import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
    error: any,
    errorInfo: any,
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null,
    hasError: false
  };

//   public static getDerivedStateFromError(_: Error): State {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
        error: error,
        errorInfo: errorInfo
    })
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
