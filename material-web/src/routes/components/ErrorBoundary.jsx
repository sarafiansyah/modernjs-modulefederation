import React from "react";
import { Result, Button } from "antd";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Result
                    status="error"
                    title={
                        this.state.error?.message ||
                        "Unexpected Application Error"
                    }
                    subTitle="Please try refreshing the page or contact support if the issue persists."
                    // extra={
                    //     <Button
                    //         type="primary"
                    //         onClick={() => window.location.reload()}
                    //     >
                    //         Reload Page
                    //     </Button>
                    // }
                />
            );
        }

        return this.props.children;
    }
}
