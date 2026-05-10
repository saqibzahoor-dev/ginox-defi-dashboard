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
        <div className="rounded-2xl border border-bearish/10 bg-[rgba(12,16,36,0.65)] p-6 text-center">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bearish/[0.08]">
            <svg className="h-5 w-5 text-bearish" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-semibold text-white">
            {this.props.moduleName || 'Module'} Error
          </p>
          <p className="mb-4 text-[12px] text-secondary">
            {this.state.error?.message || 'Something went wrong'}
          </p>
          <button
            onClick={this.handleRetry}
            className="rounded-lg bg-accent-green/[0.08] px-5 py-2 text-[12px] font-medium text-accent-green transition-all hover:bg-accent-green/[0.15]"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
