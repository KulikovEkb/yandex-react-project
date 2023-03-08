import React, {Component, ErrorInfo, ReactNode} from "react";

type TErrorBoundaryProps = {
  children?: ReactNode;
};

type TErrorBoundaryState = {
  hasError: boolean;
}

class ErrorBoundary extends Component<TErrorBoundaryProps, TErrorBoundaryState> {
  state: TErrorBoundaryState = {hasError: false};

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Возникла ошибка!", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Что-то пошло не так :(</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
