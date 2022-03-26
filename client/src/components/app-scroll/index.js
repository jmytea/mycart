import React, { PureComponent } from "react";
// import IScroll from "iscroll";
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import "./style.scss";

BScroll.use(PullDown)

class AppScroll extends PureComponent {
  scrollViewDOM = React.createRef();

  render() {
    const {pulldown} = this.props;
    return (
      <div
        ref={this.scrollViewDOM}
        className={`scroll-view ${this.props.className}`}
      >
        <div className="scroll-wrap">
          {/* 下拉刷新的结构 */}
          {pulldown && <div className="pull-down">loading...</div>}
          {/* 滚动的内容 */}
          {this.props.children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.scroll = new BScroll(this.scrollViewDOM.current, {
      // 配置下拉刷新
      pullDownRefresh: this.props.pulldown && {
        threshold: 90*window.dpr,
        stop: 40*window.dpr//下拉刷新的可以占据的位置
      }
    });
    this.scroll.on("beforeScrollStart", () => {
      this.scroll.refresh();
    });

    // 监听下拉刷新的事件
    this.props.pulldown && this.scroll.on('pullingDown', ()=>{
      this.props.onPullDown && this.props.onPullDown();
    })

  }

  closePullDown(){
    this.scroll.finishPullDown();
  }


}

export default AppScroll;
