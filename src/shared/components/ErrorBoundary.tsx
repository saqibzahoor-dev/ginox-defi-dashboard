import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.moduleName || 'Module'}]`, error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="rounded-lg border border-bearish/10 bg-surface p-5 text-center">
          <p className="mb-1 text-sm font-medium text-white">
            {this.props.moduleName || 'Module'} Error
          </p>
          <p className="mb-3 text-[12px] text-secondary">
            {this.state.error?.message || 'Something went wrong'}
          </p>
          <button
            onClick={this.handleRetry}
            className="rounded bg-accent-green/[0.08] px-4 py-1.5 text-[12px] font-medium text-accent-green transition-colors hover:bg-accent-green/[0.15]"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
