import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log for debugging
    console.error('🔥 [ErrorBoundary] Captured error:', error);
    console.error('🔥 [ErrorBoundary] Error info:', errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      const { error, errorInfo } = this.state;
      return (
        <div style={{ padding: 16 }}>
          <div style={{
            background: '#ffecec',
            border: '1px solid #ffb3b3',
            borderRadius: 8,
            padding: 16,
          }}>
            <h2 style={{ color: '#b00020', marginBottom: 8 }}>
              Ocorreu um erro ao renderizar este conteúdo.
            </h2>
            {error && (
              <p style={{ color: '#b00020', whiteSpace: 'pre-wrap' }}>
                {error.name}: {error.message}
              </p>
            )}
            {errorInfo && (
              <details style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>
                {errorInfo.componentStack}
              </details>
            )}
            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
                style={{
                  background: '#b00020',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 12px',
                  cursor: 'pointer',
                }}
              >
                Tentar novamente
              </button>
            </div>
            <p style={{ marginTop: 12, fontSize: 12 }}>
              Se o erro persistir, copie a mensagem e o stack acima e compartilhe.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}