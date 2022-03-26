import React, { PureComponent } from "react";
import "./style.scss";

export default class ErrorBoundary extends PureComponent {
  state = {
    isError: false,
  };

  // 出错后显示的dom
  getShowErrorDOM = () => (
    <div>
      <h1>出错了</h1>
    </div>
  );

  render() {
    const { isError } = this.state;
    const { children } = this.props;
    return isError ? this.getShowErrorDOM() : children;
  }

  componentDidCatch(error) {
    //。。。。。
    this.setState({ isError: true });
  }
}
