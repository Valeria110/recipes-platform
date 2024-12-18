import React from 'react';
import { ReactNode } from 'react';
import { Button } from '../Button/Button';

interface IErrorBoundaryState {
  hasError: boolean;
}

interface IProps {
  children?: ReactNode;
}

export class ErrorBoundary extends React.Component<IProps, IErrorBoundaryState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(): void {
    console.error('Oops... React caught an error');
  }

  closeError() {
    this.setState({ hasError: false });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center gap-4 p-3'>
          <h1 className='text-lg font-medium'>Something went wrong :(</h1>
          <Button onClick={this.closeError} width='w-28'>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
