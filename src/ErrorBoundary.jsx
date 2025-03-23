import { Component } from "react";
import { Link } from "@tanstack/react-router";
import { usePizzaOfTheDay } from "./usePizzaOfTheDay.jsx";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>
            There was an error with this page. <Link to="/">Click here</Link> to
            go back to the home page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function EBWithHooks() {
  const potd = usePizzaOfTheDay()
  return <ErrorBoundary potd={potd}/>
}

export default ErrorBoundary;
