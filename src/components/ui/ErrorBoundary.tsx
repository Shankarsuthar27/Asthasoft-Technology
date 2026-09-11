import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Asthasoft application:', error, errorInfo);
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0c1222] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-[#0066ff] flex items-center justify-center mx-auto text-xl font-bold">
              ✦
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Application Refresh
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We encountered a routing transition sync state. Click below to return cleanly to the home portal.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="w-full py-3 px-5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/25"
            >
              Return to Home Portal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
